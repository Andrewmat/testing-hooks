import { useReducer, useCallback } from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.func.isRequired,
  promise: PropTypes.func.isRequired,
  placeholder: PropTypes.element.isRequired,
}

const flux = {
  reducer: (state, { type, payload }) => {
    switch (type) {
      case "fetch":
        return {
          ...state,
          pending: true,
        }
      case "fulfilled":
        return {
          ...state,
          data: payload,
          error: undefined,
          pending: false,
        }
      case "rejected":
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
    fetch: () => ({ type: "fetch" }),
    fulfilled: data => ({ type: "fulfilled", payload: data }),
    rejected: error => ({ type: "rejected", payload: error }),
  },
}

const Async = ({ children, promise, placeholder }) => {
  const [{ pending, data, error }, dispatch] = useReducer(
    flux.reducer,
    flux.initialState,
  )
  const memoPromise = useCallback(() => {
    dispatch(flux.actions.fetch())
    promise()
      .then(resp => {
        dispatch(flux.actions.fulfilled(resp))
      })
      .catch(resp => {
        const message = resp.statusText || resp.status
        dispatch(flux.actions.rejected(new Error(message)))
      })
  }, [promise])

  if (pending) {
    return placeholder
  }

  if (data || error) {
    return children(data, error)
  }

  memoPromise()

  return null
}

Async.propTypes = propTypes

export default Async
