import { useState, useDebugValue } from 'react'

export default function useToggle(val) {
  let initialValue = false
  let toggledValue = true

  if (Array.isArray(val)) {
    ;[initialValue, toggledValue] = val
    if (val.length !== 2) {
      warn(`[useToggle] toggle was given ${val.length} indexes, but only supports 2`)
    }
  } else {
    initialValue = Boolean(val)
  }

  const [value, setValue] = useState(initialValue)
  useDebugValue(value)
  return [
    value,
    () => setValue(value === initialValue ? toggledValue : initialValue),
  ]
}
