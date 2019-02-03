import React, { createContext, useContext, useState } from 'react'

const sendInitError = () => {
  try {
    throw new Error('Uninitialized cache context')
  } catch (error) {
    console.error(error)
  }
}
export const CacheContext = createContext({
  _cache: {},
  getCache: () => ({
    size: 0,
    get: sendInitError,
    set: sendInitError,
    remove: sendInitError,
    clear: sendInitError,
  }),
})

export default function CacheProvider({ children }) {
  const cacheContent = useContext(CacheContext)
  const [cacheState, setCacheState] = useState(cacheContent)

  function getCache(namespace) {
    const initNamespace = () => {
      cacheState._cache[namespace] = new Map()
    }
    const getNamespace = () => cacheState._cache[namespace]

    if (!getNamespace()) {
      initNamespace()
    }
    function get(key) {
      return getNamespace().get(key)
    }
    function set(key, value) {
      getNamespace().set(key, value)
      setCacheState(cacheState)
    }
    function remove(key) {
      getNamespace().delete(key)
      setCacheState(cacheState)
    }
    function clear() {
      getNamespace().clear()
      setCacheState(cacheState)
    }

    const val = {
      size: getNamespace().size,
      get,
      set,
      remove,
      clear,
    }
    return val
  }

  return (
    <CacheContext.Provider value={{ ...cacheState, getCache }}>
      {children}
    </CacheContext.Provider>
  )
}
