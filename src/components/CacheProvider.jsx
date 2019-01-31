import React, { createContext, useContext, useState } from 'react'

const sendInitError = () => {
  try {
    throw new Error('Uninitialized cache context')
  } catch (error) {
    console.error(error)
  }
}
export const CacheContext = createContext({
  caches: {},
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
    const getMap = () => cacheState.caches[namespace]

    if (!cacheState.caches[namespace]) {
      cacheState.caches[namespace] = new Map()
    }
    function get(key) {
      return getMap().get(key)
    }
    function set(key, value) {
      getMap().set(key, value)
      setCacheState(cacheState)
    }
    function remove(key) {
      getMap().delete(key)
      setCacheState(cacheState)
    }
    function clear() {
      getMap().clear()
      setCacheState(cacheState)
    }

    const val = {
      size: getMap().size,
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
