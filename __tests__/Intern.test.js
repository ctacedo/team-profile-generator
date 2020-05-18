const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
  const testValue = "ASU";
  const e = new Intern("Me", 1, "help@me.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("You", 1, "sparky@pitkchforks.com", "SunDevils!!!!");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "ASU";
  const e = new Intern("Hello", 1, "kale@sucks.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});