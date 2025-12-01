const { JSDOM } = require("jsdom");

async function crawlPage(baseUrl, currentUrl, pages, brokenPages = []) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return { pages, brokenPages };
  }

  const normalizedUrl = normalizeUrl(currentUrl);

  if (pages[normalizedUrl] > 0) {
    pages[normalizedUrl]++;
    return { pages, brokenPages };
  }

  pages[normalizedUrl] = 1;
  console.log(`Crawling: ${currentUrl}`);

  try {
    const resp = await fetch(currentUrl);

    if (resp.status >= 400) {
      console.log(
        `Broken link found: ${currentUrl} Status Code: ${resp.status}`
      );

      brokenPages.push({
        url: currentUrl,
        status: resp.status,
        referrer: baseUrl,
        discoveredAt: new Date().toISOString(),
      });

      return { pages, brokenPages };
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Non html response, content type: ${contentType} for url: ${currentUrl}`
      );
      return { pages, brokenPages };
    }

    const htmlBody = await resp.text();
    const urls = getUrlFromHtml(htmlBody, baseUrl);

    for (const url of urls) {
      const result = await crawlPage(baseUrl, url, pages);
      pages = result.pages;
      brokenPages = result.brokenPages;
    }
  } catch (error) {
    console.log(`Error fetching ${error.message} page: ${currentUrl}`);

    brokenPages.push({
      url: currentUrl,
      status: "NETWORK_ERROR",
      error: error.message,
      referrer: baseUrl,
      discoveredAt: new Date().toISOString(),
    });
  }
  
  return { pages, brokenPages };
}

function getUrlFromHtml(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  const urls = [];
  links.forEach((link) => {
    if (link.href.startsWith("/")) {
      try {
        const urlObj = new URL(link.href, baseUrl);
        urls.push(urlObj.href);
      } catch (error) {
        console.log("Error in relative path", err.message);
      }
    } else {
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("Error in absolute path", err.message);
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
