# 🌐 http-web-crawler

A small Node.js web crawler for exploring and counting pages within a single host. Intended for learning and simple crawling tasks.

## Features

- Smart Crawling - Recursively crawls pages within the same hostname
- SEO Analysis - Counts internal links to identify important pages
- URL Extraction - Parses absolute and relative links from HTML
- Broken Link Detection - Identifies 404 pages and network errors
- Report Export - Save results as JSON or CSV files
- URL Normalization - Ensures consistent URL comparison

## Getting started

Requirements

- Node.js 18+ (or a Node version that provides fetch)
- npm

Installation

```bash
git clone https://github.com/segnitsega/http-web-crawler.git
cd http-web-crawler
npm install
```

Basic Usage

```bash
# Crawl a website (saves JSON report by default)
npm start -- https://example.com

# Save report as CSV
npm start -- https://example.com --csv

# Save report as JSON
npm start -- https://example.com --json

# Save report both as CSV and as JSON
npm start -- https://example.com --all

```

Sample Output

```bash
==================================================
CRAWL REPORT
==================================================

📊 INTERNAL LINK ANALYSIS:
--------------------------------------------------
Found 63 internal links → www.example.com
Found 62 internal links → www.example.com/tags
Found 62 internal links → www.example.com/about
...

❌ BROKEN PAGES FOUND:
--------------------------------------------------
1. https://example.com/deleted-page
   Status: 404
   Linked from: https://example.com/home

==================================================
SUMMARY:
--------------------------------------------------
Total unique pages: 31
Total broken pages: 2
==================================================
```

JSON Report Structure

```bash
{
  "metadata": {"baseUrl": "https://example.com",
    "crawlDate": "2024-01-15T10:30:00.000Z",
    "totalPages": 31,
    "totalBrokenPages": 2},
  "pages": [
    {
      "url": "www.example.com",
      "internalLinksCount": 63
    }
  ],
  "brokenPages": [
    {
      "url": "https://example.com/deleted-page",
      "status": 404,
      "referrer": "https://example.com/home"
    }
  ]
}

```

API (quick)

- normalizeUrl(url) -> returns "hostname/path" (no protocol, no trailing slash)
- getUrlFromHtml(htmlBody, baseUrl) -> returns array of resolved hrefs
- crawlPage(baseUrl, currentUrl, pages) -> async recursive crawler; returns pages map

Testing

If tests fail due to ESM-only jsdom, choose one:

- Run Jest with Node VM modules enabled:
  ```bash
  NODE_OPTIONS=--experimental-vm-modules npx jest --runInBand
  ```
- Or use an older CommonJS-compatible jsdom (pin appropriate version):
  ```bash
  npm install jsdom@20
  ```

Run tests

```bash
npm test
```

Development notes

- getUrlFromHtml uses the WHATWG URL constructor to resolve relative links.
- crawlPage fetches currentUrl and only follows links within the same hostname.
- For local debugging, add console.log statements or run single-page runs with node.
