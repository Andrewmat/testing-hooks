import React, { Children } from 'react';
import PropTypes from 'prop-types';

import useIterator from '../hooks/useIterator';

const propTypes = {
  children: PropTypes.node.isRequired,
  startIndex: PropTypes.number,
  after: PropTypes.func,
  before: PropTypes.func,
  loop: PropTypes.bool,
};

const defaultBefore = ({ setPreviousSlide }) => <button onClick={setPreviousSlide}>{"<"}</button>;
const defaultAfter = ({ setNextSlide }) => <button onClick={setNextSlide}>{">"}</button>;

const defaultProps = {
  startIndex: 0,
  before: defaultBefore,
  after: defaultAfter,
  loop: false,
}

const Carousel = ({ children, startIndex, before, after, loop }) => {
  const { next, previous, item } = useIterator(
    Children.toArray(children),
    loop,
    startIndex
  );

  const refProps = {
    setPreviousSlide: previous,
    setNextSlide: next,
  };

  return (
    <div>
      {before && before(refProps)}
      {item}
      {after && after(refProps)}
    </div>
  );
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel
