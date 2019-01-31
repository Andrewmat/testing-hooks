import React, { useContext, useState, useEffect } from 'react'
import CacheContext from './CacheContext'

export default function CacheProvider({ children }) {
  const cacheContent = useContext(CacheContext)
  const [cacheState, setCacheState] = useState(cacheContent)

  function set(namespace, key, value) {
    if (!cacheState.caches[namespace]) {
      cacheState.caches[namespace] = new Map()
    }
    cacheState.caches[namespace].set(key, value)
    setCacheState(cacheState)
  }
  function clear(namespace, key) {
    cacheState.caches[namespace].clear(key)
    setCacheState(cacheState)
  }

  useEffect(() => {
    setCacheState({ ...cacheState, set, clear })
  }, [cacheState.caches, cacheState.set, cacheState.clear])

  return (
    <CacheContext.Provider value={cacheState}>{children}</CacheContext.Provider>
  )
}
