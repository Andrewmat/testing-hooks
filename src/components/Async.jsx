import { memo, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.func.isRequired,
  promise: PropTypes.func.isRequired,
  placeholder: PropTypes.element.isRequired,
};

const Async = memo(({ children, promise, placeholder }) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  if (response || error) {
    return children(response, error);
  }

  promise()
    .then(resp => {
      setResponse(resp);
      setError(undefined);
    })
    .catch(error => {
      setError(error);
    });

  return placeholder;
});

Async.propTypes = propTypes;

export default Async;