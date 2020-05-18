const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const testValue = "G-hubs";
  const e = new Engineer("Joe", 1, "batman@batman.com", testValue);
  expect(e.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("Will", 1, "words@words.com", "G-hub");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "G-hub";
  const e = new Engineer("Mac", 1, "what@will.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});