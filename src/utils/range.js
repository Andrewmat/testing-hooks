/**
 * range(start = 0, length)
 * Produces an array filled with a range of integer numbers
 * @param {*} start first value of range
 * @param {*} length length of range
 * @returns array of range from start to start + length
 */
export default function range(start, length) {
  let _start = start
  let _length = length
  if (!length) {
    _start = 0
    _length = start
  }
  return Array.from({ length: _length }).map((_, i) => i + _start)
}
