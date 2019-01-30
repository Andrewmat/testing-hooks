import { useState } from 'react'

export default function(initialIndex = 0) {
  const [count, setCount] = useState(initialIndex)
  function increment() {
    setCount(count + 1)
  }
  function reset() {
    setCount(initialIndex)
  }
  return [count, increment, reset]
}
