import React from 'react'
import classnames from 'classnames'
import { useCache, useIterator } from '@andrewmat/hooks'
import Card from './Card'
import Async from './Async'
import { getPerson } from '../services/swService'
import range from '../utils/range'
import './CardIterator.scss'

export default function CardIterator({ darkMode = false }) {
  const { item, next, hasNext, previous, hasPrevious } = useIterator(
    range(1, 6),
    true,
  )
  const cachedGetPerson = useCache(getPerson, 'swPerson')

  return (
    <div
      className={classnames({
        'card-iterator': true,
        'card-iterator--dark': darkMode,
      })}
    >
      <div className='card-iterator__btn-wrapper'>
        <button
          onClick={previous}
          disabled={!hasPrevious}
          className={classnames({
            'card-iterator__btn': true,
            'is-dark': !darkMode,
          })}
        >
          Previous
        </button>
      </div>
      <div className='card-iterator__item-wrapper'>
        <Async
          promise={() => cachedGetPerson(item)}
          deps={[item]}
          placeholder={<div className='card-iterator__item'>Loading...</div>}
        >
          {(data, error) => (
            <div className='card-iterator__item'>
              {error ? (
                <div className='card-iterator__item--error'>
                  Something went wrong :(
                  <div>
                    {Object.entries(error)
                      .filter(([_, value]) =>
                        ['string', 'number', 'boolean'].includes(typeof value),
                      )
                      .map(([key, value]) => (
                        <div>
                          <strong>{key}</strong>: {value}
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <Card data={data} darkMode={darkMode} />
              )}
            </div>
          )}
        </Async>
      </div>
      <div className='card-iterator__btn-wrapper'>
        <button
          onClick={next}
          disabled={!hasNext}
          className={classnames({
            'card-iterator__btn': true,
            'is-dark': !darkMode,
          })}
        >
          Next
        </button>
      </div>
    </div>
  )
}
