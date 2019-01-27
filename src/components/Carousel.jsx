import React, { Children } from 'react'
import PropTypes from 'prop-types'

import useIterator from '../hooks/useIterator'

const propTypes = {
  children: PropTypes.node.isRequired,
  startIndex: PropTypes.number,
  after: PropTypes.func,
  before: PropTypes.func,
  loop: PropTypes.bool,
}

const defaultBefore = ({ setPrevious }) => (
  <button onClick={setPrevious}>{'<'}</button>
)
const defaultAfter = ({ setNext }) => <button onClick={setNext}>{'>'}</button>

const defaultProps = {
  startIndex: 0,
  before: defaultBefore,
  after: defaultAfter,
  loop: false,
}

const Carousel = ({ children, startIndex, before, after, loop }) => {
  const { item, next, hasNext, previous, hasPrevious } = useIterator(
    Children.toArray(children),
    loop,
    startIndex,
  )

  const refProps = {
    setPrevious: previous,
    setNext: next,
    isFirst: !(loop || hasPrevious),
    isLast: !(loop || hasNext),
  }

  return (
    <div>
      {before && before(refProps)}
      {item}
      {after && after(refProps)}
    </div>
  )
}

Carousel.propTypes = propTypes
Carousel.defaultProps = defaultProps

export default Carousel
