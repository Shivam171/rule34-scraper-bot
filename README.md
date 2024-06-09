![rule34-scraper-bot](https://github.com/Shivam171/rule34-scraper-bot/assets/66107248/5edb6829-804d-45f3-8887-2d1bec080682)

# 🔞 Rule34 Scraper Bot 🤖

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)]()

## 📃 Description

A Node.js console-based scraper using Puppeteer to extract images, videos and metadata into a json file, from rule34.xxx based on search tags.

## ✅ Features

- Added plugins that help prevent detection.
- Scrapes images & videos URLs, post details, and other metadata.
- Handles pagination and avoids duplicate data.
- Saves data in a dynamic JSON file named after the search tags.

## 📦 Packages Used

- [Puppeteer](https://pptr.dev/) : Puppeteer is a Node.js library which provides a high-level API to control Chrome/Chromium over the DevTools Protocol. Puppeteer runs in headless mode by default, but can be configured to run in full ("headful") Chrome/Chromium.
- [Puppeteer Extra](https://www.npmjs.com/package/puppeteer-extra) : A light-weight wrapper around puppeteer and friends to enable cool plugins through a clean interface.
- [Puppeteer Extra Plugin Stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth) : A plugin for puppeteer-extra and playwright-extra to prevent detection.

## 🤔 How to Use

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the app with `node index.js`.
4. Enter your search term when prompted.

## 🫡 Example Usage

```bash
node index.js
# Enter search term: cat
# Scraping data for cat...
# Data saved in cat_scrapped_data.json
```

## ⚠️ Disclaimer

Web scraping can violate website terms of service. Use responsibly and ensure legality and ethical compliance before scraping any website. Contents of this website can be "NSFW" (not safe for work), use responsibly. This project is for educational purposes only.

## 🫂 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
