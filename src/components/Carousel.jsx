import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  startIndex: PropTypes.number,
};

const defaultProps = {
  startIndex: 0,
}

const Carousel = ({ children, startIndex }) => {
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

  return (
    <div>
      <button type="button" onClick={() => changeToNeighborIndex(false)}>Anterior</button>
      <div className="carousel">
        {children[currentIndex]}
      </div>
      <button type="button" onClick={() => changeToNeighborIndex(true)}>Proximo</button>
    </div>
  );
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel
