![rule34-scraper-bot](https://github.com/Shivam171/rule34-scraper-bot/assets/66107248/5edb6829-804d-45f3-8887-2d1bec080682)

# 🔞 Rule34 Scraper Bot 🤖

![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github) ![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat) [![GitHub license](https://badgen.net/github/license/Naereen/Strapdown.js)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)


## 📃 Description

A Node.js console-based scraper using Puppeteer to extract images, videos and metadata into a json file, you can also download images and videos along with json data, from rule34.xxx based on search tags.

## ✅ Features

<img src="https://media.tenor.com/Tvghxa_OarkAAAAi/meme-meme-indonesia.gif" height="150px" align="right"/>

- Added plugins that help prevent detection.
- Scrapes images & videos URLs, post details, and other metadata.
- Download images and videos along with json file.
- Handles pagination and avoids duplicate data.
- Saves data in a dynamic JSON file named after the search tags.


## 📦 Packages Used

- [Puppeteer](https://pptr.dev/) : Puppeteer is a Node.js library which provides a high-level API to control Chrome/Chromium over the DevTools Protocol. Puppeteer runs in headless mode by default, but can be configured to run in full ("headful") Chrome/Chromium.
- [Puppeteer Extra](https://www.npmjs.com/package/puppeteer-extra) : A light-weight wrapper around puppeteer and friends to enable cool plugins through a clean interface.
- [Puppeteer Extra Plugin Stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth) : A plugin for puppeteer-extra and playwright-extra to prevent detection.
- [Node : Path](https://nodejs.org/api/path.html) : module provides utilities for working with file and directory path.
- [Axios](https://www.npmjs.com/package/axios) : is a promise based HTTP client for the browser and node.js.

## 🤔 How to Use

1. Clone the repository.
2. Move inside the folder and install dependencies with `npm install`.
3. Run the app with `node scraper_bot.js`.
4. Enter your search term when prompted.

## 🫡 Example Usage

```bash
$ node scraper_bot.js
-------------------------------------------
       Welcome to Rule34 Scraper Bot
-------------------------------------------
Just enter the appropriate tags, follow the same convention used in Rule34.
Json file, Images and Videos folder will be generated in your current path.
Generated json file will include images, videos and other meta data.
If you encounter an bug, please open a issue: https://github.com/Shivam171/rule34-scraper-bot

NOTE: To close the program enter {ctrl + c}
-------------------------------------------
Enter your search tags: cartoon
-------------------------------------------
            Choose your option
1. JSON data Only
2. Images Only
3. Videos Only
4. All above
-------------------------------------------
Enter your choice: 4
-------------------------------------------
Searching...
Retriving data from rule34...
Note: This may take a while, Please be patient...
-------------------------------------------
Navigating to 1 of 42
Navigating to 2 of 42
Navigating to 3 of 42
.
.
```

## ⚠️ Disclaimer

Web scraping can violate website terms of service. Contents of this website can be "NSFW" (not safe for work), Use responsibly and ensure legality and ethical compliance before scraping any website. `This project is for educational purposes only.`

## 🫂 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
