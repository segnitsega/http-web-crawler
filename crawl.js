const { JSDOM } = require("jsdom");

async function crawlPage(url) {
  console.log(`Crawling activated: ${url}`);

  try {
    const resp = await fetch(url);

    if (resp.status >= 400) {
      console.log(`Error fetching page: ${url} Status Code: ${resp.status}`);
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Non html response, content type: ${contentType} for url: ${url}`
      );
      return;
    }
    console.log(await resp.text());
    
    // const urls = getUrlFromHtml(await resp.text())
    // console.log(`The urls from the ${url} page are: ${urls}`)
  } catch (error) {
    console.log(`Error fetching ${error.message} page: ${url}`);
  }
}

function getUrlFromHtml(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  const urls = [];
  links.forEach((link) => {
    if (link.href.startsWith("/")) {
      urls.push(baseUrl + link.href);
    } else {
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("Error ", err.message);
      }
    }
  });
  return urls;
}

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
  crawlPage,
};
