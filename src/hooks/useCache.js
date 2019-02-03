import { useContext, useDebugValue } from 'react'
import { sha256 } from 'js-sha256'
import { CacheContext } from '../components/CacheProvider'
import { warn } from '../utils/devconsole'

function defaultKeyGenerator(args) {
  const stringArgs = (args || [])
    .map(arg => {
      if (arg == null) {
        return String(arg).toString()
      }
      if (typeof arg === 'string') {
        return arg
      }
      if (arg instanceof Object && typeof arg.toString === 'function') {
        return arg.toString()
      }
      return String(arg).toString()
    })
    .join(',')

  return sha256(stringArgs)
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
  namespace = '__root',
  { keyGenerator = defaultKeyGenerator, key, limit } = {},
) {
  const { getCache } = useContext(CacheContext)
  const cache = getCache(namespace)
  useDebugValue(cache.size)
  if (namespace === '__root') {
    warn(
      `[useCache] Using default namespace since no namespace is given.\n\tA namespace is recommended and can be added in the second parameter "useCache(func, namespace)"`,
    )
  }

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
