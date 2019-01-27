import { useState, useDebugValue } from 'react'

export default function useAsyncCache(asyncCallback) {
  const [map, setMap] = useState({})
  useDebugValue(Object.keys(map).length)

  function getEntry(key) {
    return map[key]
  }
  function setEntry(key, value) {
    setMap({
      ...map,
      [key]: value,
    })
  }
  return async function(key) {
    let value = getEntry(key)
    if (value === undefined) {
      value = await asyncCallback(key)
      setEntry(key, value)
    }
    return value
  }
}
