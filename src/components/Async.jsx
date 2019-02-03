import { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { warn } from '../utils/devconsole'

const propTypes = {
  children: PropTypes.func.isRequired,
  promise: PropTypes.func.isRequired,
  placeholder: PropTypes.element.isRequired,
}

const flux = {
  reducer: (state, { type, payload }) => {
    switch (type) {
      case 'fetch':
        return {
          ...state,
          pending: true,
        }
      case 'fulfilled':
        return {
          ...state,
          data: payload,
          error: undefined,
          pending: false,
        }
      case 'rejected':
        return {
          ...state,
          error: payload,
          pending: false,
        }
      default:
        return state
    }
  },
  initialState: {
    pending: false,
    data: undefined,
    error: undefined,
  },
  actions: {
    fetch: () => ({ type: 'fetch' }),
    fulfilled: data => ({ type: 'fulfilled', payload: data }),
    rejected: error => ({ type: 'rejected', payload: error }),
  },
}

export default function Async({ children, promise, deps, placeholder }) {
  const [{ pending, data, error }, dispatch] = useReducer(
    flux.reducer,
    flux.initialState,
  )

  useEffect(() => {
    if (deps == null) {
      warn(
        `[Async] No deps array was given, so <Async> will only call async function when is mounted\n\tTo fix this, you should set the deps prop to the appropriate value`,
      )
    }
    dispatch(flux.actions.fetch())
    promise()
      .then(resp => dispatch(flux.actions.fulfilled(resp)))
      .catch(error => dispatch(flux.actions.rejected(error)))
  }, deps || [])

  if (pending) {
    return placeholder
  }

  if (data || error) {
    return children(data, error)
  }

  return null
}

Async.propTypes = propTypes
