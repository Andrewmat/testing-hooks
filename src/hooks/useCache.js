import { useState, useDebugValue } from 'react'

export default function useCache(callback) {
  const [map, setMap] = useState({})
  useDebugValue(Object.keys(map).length)

  function getEntry(key) {
    return map[key]
  }
  function setEntry(key, value) {
    setMap({
      ...map,
      key: value,
    })
  }
  return function(key) {
    let value = getEntry(key)
    if (value === undefined) {
      value = callback(key)
      setEntry(key, value)
    }
    return value
  }
}
