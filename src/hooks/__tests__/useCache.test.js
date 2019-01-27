// import useCache from '../useCache'

describe('useCache', () => {
  describe('synchronous', () => {
    // const sum = (a, b) => a + b

    it('should return same result', () => {
      // const mock = jest.fn(sum)
      // const cache = useCache(mock)
      // expect(cache(1, 2)).toBe(sum(1, 2))
      // expect(mock).toHaveBeenLastCalledWith(1, 2)
    })
    it('should cache one result', () => {
      // const mockSum = jest.fn(sum)
      // const cachedSum = useCache(mockSum)
      // cachedSum(1, 2)
      // cachedSum(1, 2)
      // cachedSum(1, 2)
      // expect(mockSum).toHaveBeenCalledTimes(1)
    })
    it('should cache multiple results')
    it('should use only first param to create cache key')
  })
})
