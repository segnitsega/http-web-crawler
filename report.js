const fs = require("fs");
const path = require("path");

function printReport(pages, brokenPages = []) {
  console.log("\n" + "=".repeat(50));
  console.log("CRAWL REPORT");
  console.log("=".repeat(50));

  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    const url = page[0];
    const freq = page[1];
    console.log(`Found ${freq} internal links --> ${url}`);
  }

  if (brokenPages.length > 0) {
    console.log("\n❌ BROKEN PAGES FOUND:");
    console.log("-".repeat(50));
    brokenPages.forEach((page, index) => {
      console.log(`${index + 1}. ${page.url}`);
      console.log(
        `   Status: ${page.status}${page.error ? ` (${page.error})` : ""}`
      );
      console.log(`   Linked from: ${page.referrer}`);
    });
  }

  console.log("\n" + "=".repeat(50));
  console.log("SUMMARY:");
  console.log("-".repeat(50));
  console.log(`Total unique pages: ${sortedPages.length}`);
  console.log(`Total broken pages: ${brokenPages.length}`);
  console.log("=".repeat(50) + "\n");
}

function sortPages(pages) {
  let pageList = Object.entries(pages);
  pageList = pageList.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });
  return pageList;
}

function saveReportToJSON(pages, brokenPages, baseUrl, filename) {
  const report = {
    metadata: {
      baseUrl: baseUrl,
      crawlDate: new Date().toISOString(),
      totalPages: Object.keys(pages).length,
      totalBrokenPages: brokenPages.length,
    },
    pages: Object.entries(pages).map(([url, count]) => ({
      url: url,
      internalLinksCount: count,
    })),
    brokenPages: brokenPages.map((page) => ({
      url: page.url,
      status: page.status,
      error: page.error || null,
      referrer: page.referrer,
      discoveredAt: page.discoveredAt,
    })),
  };

  const filePath = path.join(process.cwd(), filename);
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
  console.log(`✅ JSON report saved to: ${filePath}`);

  return filePath;
}

function saveReportToCSV(pages, brokenPages, baseUrl, filename) {
  let csvContent = "";

  // Header
  csvContent += "Crawl Report\n";
  csvContent += `Base URL: ${baseUrl}\n`;
  csvContent += `Crawl Date: ${new Date().toISOString()}\n\n`;

  // Pages section
  csvContent += "PAGES\n";
  csvContent += "URL,Internal Links Count\n";

  const sortedPages = sortPages(pages);
  sortedPages.forEach(([url, count]) => {
    csvContent += `"${url}",${count}\n`;
  });

  // Broken pages section
  if (brokenPages.length > 0) {
    csvContent += "\nBROKEN PAGES\n";
    csvContent += "URL,Status,Error,Referrer,Discovered At\n";

    brokenPages.forEach((page) => {
      csvContent += `"${page.url}",${page.status},"${page.error || ""}","${
        page.referrer
      }","${page.discoveredAt}"\n`;
    });
  }

  // Summary
  csvContent += "\nSUMMARY\n";
  csvContent += `Total Pages,${Object.keys(pages).length}\n`;
  csvContent += `Total Broken Pages,${brokenPages.length}\n`;

  const filePath = path.join(process.cwd(), filename);
  fs.writeFileSync(filePath, csvContent);
  console.log(`✅ CSV report saved to: ${filePath}`);

  return filePath;
}

module.exports = { sortPages, printReport, saveReportToCSV, saveReportToJSON };
