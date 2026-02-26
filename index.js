function invert(string) {
  return - string
}
function isNegative(value) {
  return value < value - value
}
function doLotsOfShifting(result, nd) {
  if (result[0] !== nd) {
    result.shift()
    return doLotsOfShifting(result, nd)
  } else {
    return result
  }
}
function negativeHandler(start, end, startNeg, endNeg) {
  if (startNeg && endNeg) {
    var result =  arrayOfAllNumbersFromRange(Math.abs(end), Math.abs(start)).map(invert).reverse()
    return doLotsOfShifting(result, start)
  }
  if (startNeg) {
    var value = Math.abs(start)
    var newEnd = end + value
    var newStart = value - value
    var result = arrayOfAllNumbersFromRange(newStart, newEnd)
    
    return result.map(n => n - value)
  }
}
function arrayOfAllNumbersFromRange(start, end) {
  if (start === end) return [end]
  if (start > end) {
    throw new RangeError("start must be less than end")
  }
  if (isNegative(start) || isNegative(end)) {
    return negativeHandler(start, end, ...Array.prototype.slice.call(arguments).map(isNegative))
  }
  var result = (function () {
    var numbers = Array.from({
      length: end + !(end ? !end : !!end),
    }).flatMap((_, i) => {
      return start + -1 + i
    })
    if (start - 1) {
      return numbers.shift() && numbers
    } else {
      return numbers.shift() || numbers
    }
  })()
  var result2 = start !== 0 ? result : result.push(end) && result
  function PopALot() {
    
    if (result2.reverse()[0] !== end) {
      result2.reverse()
      result2.pop()
      if (result2.reverse()[0] !== end) {
        result2.reverse()
        PopALot()
      } else {
        result2.reverse()
      }
    } else {
      result2.reverse()
    }
  }
  PopALot()
  return result2
}

module.exports = arrayOfAllNumbersFromRange