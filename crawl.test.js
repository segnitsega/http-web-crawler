const { normalizeUrl } = require("./crawl");

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