const { sortPages } = require("./report.js");

test("report sort test", () => {
  const input = {
    "http://segni.dev/path": 1,
    "http://segni.dev": 3,
    "http://segni.dev/path2": 2,
  };

  const expected = [
    ["http://segni.dev", 3],
    ["http://segni.dev/path2", 2],
    ["http://segni.dev/path", 1],
  ];

  const output = sortPages(input);
  expect(output).toEqual(expected);
});
