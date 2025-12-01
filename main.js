const { crawlPage } = require("./crawl");
const { printReport, saveReportToJSON, saveReportToCSV } = require("./report");

async function main() {
  if (process.argv.length < 3) {
    console.log("No website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    const allowedArgs = ["--json", "--csv", "--all"];
    const thirdArg = process.argv[3];
    if (!allowedArgs.includes(thirdArg)) {
      console.log("Too many arguments provided");
      process.exit(1);
    }
  }
  
  const baseUrl = process.argv[2];

  const exportToJSON = process.argv.includes("--json");
  const exportToCSV = process.argv.includes("--csv");
  const exportAll = process.argv.includes("--all");

  console.log(`Started crawling website: ${baseUrl}`);
  const { pages, brokenPages } = await crawlPage(baseUrl, baseUrl, {}, []);

  printReport(pages, brokenPages);

  const domain = new URL(baseUrl).hostname;
  const timeStamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, "-");

  if (exportToJSON || exportAll) {
    const filename = `report-${domain}-${timeStamp}.json`;
    saveReportToJSON(pages, brokenPages, baseUrl, filename);
  }

  if (exportToCSV || exportAll) {
    const filename = `report-${domain}-${timeStamp}.csv`;
    saveReportToCSV(pages, brokenPages, baseUrl, filename);
  }

  if (!exportToJSON && !exportToCSV && !exportAll) {
    const filename = `report-${domain}.json`;
    saveReportToJSON(pages, brokenPages, baseUrl, filename);
  }
}

main();
