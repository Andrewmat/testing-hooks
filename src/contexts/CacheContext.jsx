import { createContext } from 'react'

const CacheContext = createContext({
  caches: {},
  set: () => {
    try {
      throw new Error('Uninitialized cache context')
    } catch (error) {
      console.error(error)
    }
  },
  clear: () => {
    try {
      throw new Error('Uninitialized cache context')
    } catch (error) {
      console.error(error)
    }
  },
})

export default CacheContext
