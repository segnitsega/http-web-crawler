const { JSDOM } = require("jsdom");

function getUrlFromHtml(htmlBody, baseUrl) {
  // const {JSDOM} = await import("jsdom");
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  const urls = [];
  links.forEach((link) => {
    if (link.href.startsWith("/")) {
      urls.push(baseUrl + link.href);
    }
    else {
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("Error ", err.message);
      }
    }
  });
  console.log(urls);
  return urls;
}

const inputHtmlBody = `<html><body><a href="/path">Link</a><a href="invalid">Link</a><<a href="https://google.com">Link</a>/body></html>`;
getUrlFromHtml(inputHtmlBody, "http://google.com");

function normalizeUrl(url) {
  const urlObj = new URL(url);
  url = `${urlObj.hostname}${urlObj.pathname}`;
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
}

module.exports = {
  normalizeUrl,
  getUrlFromHtml,
};
