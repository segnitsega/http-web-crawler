# http-web-crawler

A small Node.js web crawler for exploring and counting pages within a single host. Intended for learning and simple crawling tasks.

## Features

- Recursively crawls pages within the same hostname
- Extracts absolute and relative links from HTML
- Normalizes URLs for counting/uniqueness
- Simple, testable modules: normalizeUrl, getUrlFromHtml, crawlPage

## Getting started

Requirements

- Node.js 18+ (or a Node version that provides fetch)
- npm

Install

```bash
npm install
```

Run (example)

```bash
node start "http://example.com"
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
