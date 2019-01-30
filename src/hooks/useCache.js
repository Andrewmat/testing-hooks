import { useState, useDebugValue } from 'react'

function getKey(args) {
  return JSON.stringify(args)
}

/**
 * Caches result of callback function into an internal state
 * @param {function} [callback] function to receive caching functions into
 * @param {boolean} [asynchronous=false] whether the callback function is async or returns a promise, and the result of the promise should be cached
 * @returns function that executes callback and caches results
 */
export default function useCache(
  callback,
  { asynchronous = true, keyGenerator = getKey } = {},
) {
  const [map, setMap] = useState(new Map())
  useDebugValue(map.size)

  function getEntry(key) {
    return map.get(key)
  }
  function setEntry(key, value) {
    setMap(map.set(key, value))
  }

  if (asynchronous) {
    return async function(...args) {
      const key = keyGenerator(args)
      let value = getEntry(key)
      if (value === undefined) {
        value = await callback(...args)
        setEntry(key, value)
      }
      return value
    }
  } else {
    return function(...args) {
      const key = keyGenerator(args)
      let value = getEntry(key)
      if (value === undefined) {
        value = callback(...args)
        setEntry(key, value)
      }
      return value
    }
  }
}
