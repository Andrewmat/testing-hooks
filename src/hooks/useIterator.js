import { useState } from "react"

export default function useIterator(list, loop = false, startIndex = 0) {
  const [index, setIndex] = useState(startIndex)

  function setIndexLimited(newIndex) {
    if (newIndex >= 0 && newIndex < list.length) {
      setIndex(newIndex)
    } else if (loop) {
      // loop
      setIndex(newIndex >= list.length ? 0 : list.length - 1)
    } else {
      // on edge
      setIndex(Math.min(Math.max(newIndex, 0), list.length - 1))
    }
  }

  return {
    index,
    item: list[index],
    next: () => setIndexLimited(index + 1),
    hasNext: index < list.length - 1,
    previous: () => setIndexLimited(index - 1),
    hasPrevious: index !== 0,
  }
}
