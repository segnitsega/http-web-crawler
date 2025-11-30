function printReport(pages) {
  pages = sortPages(pages);
  console.log("====== REPORT ======");
  for (const page of pages) {
    const url = page[0];
    const freq = page[1];
    console.log(`found ${freq} of url: ${url}`);
  }
  console.log("====== END REPORT ======");


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

module.exports = { sortPages, printReport };
