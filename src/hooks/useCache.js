import { useContext, useDebugValue } from 'react'
import CacheContext from '../contexts/CacheContext'

function getKey(args) {
  return JSON.stringify(args)
}

/**
 * Caches result of callback function into an internal state
 * @param {function} [callback] async function that caches results according to key
 * @returns function that executes callback and caches results
 */
/**
 *
 * Caches result of callback function into an internal state
 * @param {function} [callback] async function that caches results according to key
 * @param {string} [namespace] caching namespace to use. Very recommended to use to avoid cache collision
 * @param {string} [key] optional key of cache entry
 * @param {function} [keyGenerator] optional function that generates key. This function receives the parameters array of the function
 * @returns
 */
export default function useCache(
  callback,
  { keyGenerator = getKey, key, namespace = '__root' } = {},
) {
  const { caches, set } = useContext(CacheContext)
  useDebugValue(caches[namespace] ? caches[namespace].size : undefined)

  function getEntry(key) {
    return caches[namespace] && caches[namespace].get(key)
  }
  function setEntry(key, value) {
    set(namespace, key, value)
  }

  return async function(...args) {
    const finalKey = key || keyGenerator(args)
    let value = getEntry(finalKey)
    if (value === undefined) {
      value = await callback(...args)
      if (value !== null) {
        setEntry(finalKey, value)
      }
    }
    return value
  }
}
