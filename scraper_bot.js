const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const readline = require("readline");
const axios = require("axios");
const path = require("path");

puppeteer.use(stealthPlugin());
const { executablePath } = require("puppeteer");

const url = "https://rule34.xxx/";

const downloadFile = async (url, directory, filename) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const outputPath = path.join(directory, filename);
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`Failed to download ${url}:`, error);
  }
};

const getFileExtension = (url) => {
  const match = url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/);
  return match ? match[1] : "";
};

const main = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load" });

  // Wait for the search form to load
  await page.waitForSelector("form > input[type=submit]");

  // Read the search tag from the console
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("-------------------------------------------");
  console.log("       Welcome to Rule34 Scraper Bot       ");
  console.log("-------------------------------------------");
  console.log(
    "Just enter the appropriate tags, follow the same convention used in Rule34.\nJson file, Images and Videos folder will be generated in your current path.\nGenerated json file will include images, videos and other meta data.\nIf you encounter an bug, please open a issue: https://github.com/Shivam171/rule34-scraper-bot\n\nNOTE: To close the program enter {ctrl + c}"
  );
  console.log("-------------------------------------------");
  rl.question("Enter your search tags: ", async (searchTag) => {
    // Type the search tag into the search box
    await page.type("#tags", searchTag);

    // Click the search button
    const searchBtn = await page.$("form > input[type=submit]");
    if (searchBtn) {
      await Promise.all([
        searchBtn.click(),
        console.log("Searching..."),
        page.waitForNavigation({ waitUntil: "load" }),
        console.log("Retriving data from rule34..."),
        console.log("-------------------------------------------"),
      ]);
    }
    // Close the readline interface after the search is performed
    rl.close();

    let pageCount = 0;
    // Load existing data from the JSON file
    let existingData = [];
    const outputFileName = `${searchTag.replace(
      /\s+/g,
      "_"
    )}_scrapped_data.json`;
    if (fs.existsSync(outputFileName)) {
      const rawData = fs.readFileSync(outputFileName);
      existingData = JSON.parse(rawData);
    }

    while (true) {
      try {
        // Collect image data
        const dataList = [];

        // Extract href attributes from all a tags inside.thumb spans
        const hrefs = await page.evaluate(() => {
          const links = [];
          document.querySelectorAll(".thumb a").forEach((a) => {
            links.push(a.href);
          });
          return links;
        });

        // Iterate over each href and navigate to it
        for (let i = 0; i < hrefs.length; i++) {
          const href = hrefs[i];
          console.log(`Navigating to ${i + 1} of ${hrefs.length}`);

          // Navigate to the first href and perform click
          await page.goto(href, { waitUntil: "networkidle2" });

          // Check if it's the first href
          if (pageCount === 0 && i === 0) {
            // Click on the "Always view original" link
            const alwaysViewOriginalLink = await page.$(
              "#resized_notice > a:nth-child(2)"
            );
            if (alwaysViewOriginalLink) {
              await alwaysViewOriginalLink.click({ delay: 100 });
            }
          }

          // Extract image src and name
          const data = await page.evaluate(() => {
            const imgSrc = document.querySelector("#image")?.src || "";
            const type = imgSrc ? "image" : "video";
            const src =
              imgSrc || document.querySelector("video source")?.src || "";

            // Check if the stats section exists
            const statsElement = document.querySelector("#stats");
            if (!statsElement) {
              return {
                type,
                src,
                id: "",
                posted_date: "",
                posted_on: "",
                posted_by: "",
                size: "",
                external_source: "",
              };
            }

            // Extracting id
            const id =
              statsElement
                .querySelector("li:nth-child(1)")
                ?.textContent?.trim()
                .split(": ")[1] || "";

            // Extracting posted by, date and time
            const postedText =
              statsElement
                .querySelector("li:nth-child(2)")
                ?.textContent?.trim() || "";
            const postedParts = postedText.split("\nby\n\n");
            const posted_date = postedParts[0].split(" ")[1] || "";
            const posted_on = postedParts[0].split(" ")[2] || "";
            const posted_by = postedParts[1] || "";

            // Extracting size
            const size =
              statsElement
                .querySelector("li:nth-child(3)")
                ?.textContent?.trim()
                .split(": ")[1] || "";

            // Extracting external source
            const external_source =
              statsElement.querySelector("li:nth-child(4) a")?.href || "";

            return {
              type,
              src,
              id,
              posted_date,
              posted_on,
              posted_by,
              size,
              external_source,
            };
          });

          // Check for duplicates before adding
          const isDuplicate = existingData.some(
            (item) => item.src === data.src && item.id === data.id
          );
          if (!isDuplicate) {
            dataList.push(data);
            existingData.push(data);

            // Download the media file
            const directory = data.type === "image" ? "images" : "videos";
            const extension = getFileExtension(data.src);
            const filename = `${data.id}.${extension}`;
            if (!fs.existsSync(directory)) {
              fs.mkdirSync(directory);
            }
            await downloadFile(data.src, directory, filename);
          }

          // Save the collected data to a JSON file
          fs.writeFileSync(
            outputFileName,
            JSON.stringify(existingData, null, 2),
            (err) => {
              if (err) {
                console.error("Error writing JSON to file:", err);
              } else {
                console.log("Data written to file successfully.");
              }
            }
          );

          // Navigate back after visiting each href
          await page.goBack();
        }

        // Select the next button and navigate to the next page
        let nextButtonElement = await page.$('a[alt="next"]');
        if (nextButtonElement) {
          await Promise.all([
            nextButtonElement.click(),
            page.waitForNavigation({ waitUntil: "load" }),
          ]);
          pageCount++;
          console.log(`Visited page count: ${pageCount}`);
        } else {
          console.log("No more pages to visit!");
          break;
        }
      } catch (err) {
        console.log("Some error occured: ", err);
        break;
      }
    }
    await browser.close();
  });
};

main().catch((err) => {
  console.log(err);
});
