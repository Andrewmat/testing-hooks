import { useContext, useDebugValue } from 'react'
import { CacheContext } from '../components/CacheProvider'

function generateKey(args) {
  return args
    .map(arg => {
      if (arg == null) {
        return String.toString(arg)
      }
      if (typeof arg === 'string') {
        return arg
      }
      if (arg instanceof Object && typeof arg.toString === 'function') {
        return arg.toString()
      }
      return String.toString(arg)
    })
    .join(',')
}

/**
 *
 * Caches result of callback function into an internal state
 * @param {function} [callback] async function that caches results according to key
 * @param {string} [namespace] caching namespace to use. Very recommended to avoid cache collision when cache is used in different contexts
 * @param {string} [key] optional key of cache entry
 * @param {function} [keyGenerator] optional function that generates key. It receives an array of parameters and must return an string
 * @returns function that executes callback and caches results. The function has an extra property, clearCache, that removes all cache entries
 */
export default function useCache(
  callback,
  { keyGenerator = generateKey, key, namespace = '__root', limit } = {},
) {
  const { getCache } = useContext(CacheContext)
  const cache = getCache(namespace)
  useDebugValue(cache.size)

  async function cachedFunction(...args) {
    const finalKey = key || keyGenerator(args)
    let value = cache.get(finalKey)
    if (value === undefined) {
      value = await callback(...args)

      const isBelowLimit = limit === undefined || cache.size < limit
      if (value != null && isBelowLimit) {
        cache.set(finalKey, value)
      }
    }
    return value
  }

  cachedFunction.clearCache = () => {
    cache.clear()
  }

  return cachedFunction
}
