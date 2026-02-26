const test = require("tap").test
const range = require("./index.js")

test("basic range functionality", (t) => {
  t.same(range(1, 5), [1, 2, 3, 4, 5], "should return 1 to 5")
  t.same(range(0, 3), [0, 1, 2, 3], "should handle starting at 0")
  t.same(range(5, 10), [5, 6, 7, 8, 9, 10], "should handle starting at number other than 0 or 1")
  t.same(range(10, 10), [10], "should handle start === end")
  t.same(range(5, 10), [5, 6, 7, 8, 9, 10], "should handle mid-range starts")
  t.same(range(100, 105), [100, 101, 102, 103, 104, 105], "should handle large starts")
  t.same(range(0, 1), [0, 1], "should handle minimal range")
  t.end()
})

test("negative number handling", (t) => {
  t.same(range(-3, 2), [-3, -2, -1, 0, 1, 2], "should handle negative start to positive end")
  t.same(range(-5, -2), [-5, -4, -3, -2], "should handle both negative start and end")
  t.same(range(-1, 0), [-1, 0], "should handle range ending at 0")
  t.end()
})

test("error cases", (t) => {
  t.throws(
    () => range(5, 1),
    new RangeError("start must be less than end"),
    "should throw RangeError if start > end"
  )
  t.end()
})

test("internal logic quirks", (t) => {
  const result = range(-2, 1)
  t.equal(result.length, 4, "range length should be correct")
  t.equal(result[0], -2, "first element should be -2")
  t.equal(result[3], 1, "last element should be 1")
  t.end()
})