const { normalizeUrl, getUrlFromHtml } = require("./crawl");

test("normalizeUrl strip protocols", () => {
  const inputUrl = "http://example.com/path";
  const normalizedUrl = normalizeUrl(inputUrl);
  const expectedUrl = "example.com/path";
  expect(normalizedUrl).toBe(expectedUrl);
});

test("normalizeUrl strip trailing slashes", () => {
  const inputUrl = "http://example.com/path/";
  const normalizedUrl = normalizeUrl(inputUrl);
  const expectedUrl = "example.com/path";
  expect(normalizedUrl).toBe(expectedUrl);
});

test("normalizeUrl capitals", () => {
  const inputUrl = "http://EXAMPLE.com/path";
  const normalizedUrl = normalizeUrl(inputUrl);
  const expectedUrl = "example.com/path";
  expect(normalizedUrl).toBe(expectedUrl);
});

test("get asbsolute urls from html", () => {
  const inputHtmlBody = `<html><body><a href="http://example.com/path/">Link</a><a href="http://segni.com">Link</a></body></html>`;
  const inputBaseUrl = "http://example.com";
  const extractedUrls = getUrlFromHtml(inputHtmlBody, inputBaseUrl);
  const expectedUrls = ["http://example.com/path/", "http://segni.com/"];
  expect(extractedUrls).toEqual(expectedUrls);
});

test("get relative urls from html", () => {
  const inputHtmlBody = `<html><body><a href="/path">Link</a></body></html>`;
  const inputBaseUrl = "http://example.com";
  const extractedUrls = getUrlFromHtml(inputHtmlBody, inputBaseUrl);
  const expectedUrls = ["http://example.com/path"];
  expect(extractedUrls).toEqual(expectedUrls);
});

test("get asbsolute, and relative urls from html", () => {
  const inputHtmlBody = `<html><body><a href="http://example.com/path/">Link</a><a href="/path2">Link</a></body></html>`;

  const inputBaseUrl = "http://example.com";
  const extractedUrls = getUrlFromHtml(inputHtmlBody, inputBaseUrl);
  const expectedUrls = ["http://example.com/path/", "http://example.com/path2"];
  expect(extractedUrls).toEqual(expectedUrls);
});

test("don't include invalid urls from html", () => {
  const inputHtmlBody = `<html><body><a href="invalid">invalid url</a></body></html>`;

  const inputBaseUrl = "http://example.com";
  const extractedUrls = getUrlFromHtml(inputHtmlBody, inputBaseUrl);
  const expectedUrls = [];
  expect(extractedUrls).toEqual(expectedUrls);
});

