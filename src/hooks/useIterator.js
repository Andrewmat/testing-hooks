import { useState, useDebugValue } from 'react'

export default function useIterator(list, loop = false, startIndex = 0) {
  const [index, setIndex] = useState(startIndex)
  useDebugValue(index)

  function setLimitedIndex(newIndex) {
    let limitedIndex = newIndex
    if (newIndex < 0 || newIndex >= list.length) {
      // after limit?

      if (loop) {
        // loop enabled
        limitedIndex = newIndex >= list.length ? 0 : list.length - 1
      } else {
        // loop disabled
        limitedIndex = Math.min(Math.max(newIndex, 0), list.length - 1)
      }
    }
    setIndex(limitedIndex)
    return limitedIndex
  }

  function genHookProps(i) {
    return {
      index: i,
      item: list[i],
      next: () => {
        const nextIndex = setLimitedIndex(i + 1)
        return genHookProps(nextIndex)
      },
      previous: () => {
        const previousIndex = setLimitedIndex(i - 1)
        return genHookProps(previousIndex)
      },
      hasNext: loop || i < list.length - 1,
      hasPrevious: loop || i !== 0,
    }
  }

  return genHookProps(index)
}
