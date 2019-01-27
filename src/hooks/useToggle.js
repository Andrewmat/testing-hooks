import { useState, useDebugValue } from 'react'

export default function useToggle(initial = false) {
  const [value, setValue] = useState(Boolean(initial))
  useDebugValue(value)
  return [value, () => setValue(!value)]
}
