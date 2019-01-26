import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  startIndex: PropTypes.number,
};

const defaultProps = {
  startIndex: 0,
}

const Carousel = ({ children, startIndex, before, after }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const childrenCount = Children.count(children);

  function changeToNeighborIndex(isNext) {
    const potentialIndex = currentIndex + (isNext ? 1 : -1);
    if (potentialIndex < 0) {
      setCurrentIndex(0);
    } else if (potentialIndex >= childrenCount) {
      setCurrentIndex(childrenCount - 1);
    } else {
      setCurrentIndex(potentialIndex);
    }
  }

  const refProps = {
    setPreviousSlide: () => changeToNeighborIndex(false),
    setNextSlide: () => changeToNeighborIndex(true),
  }

  return (
    <div>
      {before(refProps)}
      <div className="carousel">
        {children[currentIndex]}
      </div>
      {after(refProps)}
    </div>
  );
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel
