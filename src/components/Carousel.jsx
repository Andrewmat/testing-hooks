import React, { Children } from 'react'
import PropTypes from 'prop-types'

import useIterator from '../hooks/useIterator'

const propTypes = {
  children: PropTypes.node.isRequired,
  startIndex: PropTypes.number,
  after: PropTypes.func,
  before: PropTypes.func,
  loop: PropTypes.bool,
  onChange: PropTypes.func,
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
  onChange: () => undefined,
}

export default function Carousel({
  children,
  startIndex,
  before,
  after,
  loop,
  onChange,
}) {
  const { item, index, next, hasNext, previous, hasPrevious } = useIterator(
    Children.toArray(children),
    loop,
    startIndex,
  )

  const refProps = {
    previous() {
      let previousProps = previous()
      onChange(previousProps, index)
      return previousProps
    },
    next() {
      let nextProps = next()
      onChange(nextProps, index)
      return nextProps
    },
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
