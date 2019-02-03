import React from 'react'
import classnames from 'classnames'
import Async from './Async'
import CardImage from './CardImage'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useCache from '../hooks/useCache'
import { searchImage } from '../services/googleService'
import './Card.scss'

const placeholderImage = (
  <img
    src='https://picsum.photos/300/200/?blur'
    alt='placeholder'
    width={300}
    height={200}
  />
)

const dataDescription = {
  eye_color: 'Eye color',
  skin_color: 'Skin color',
  hair_color: 'Hair color',
  height: 'Height',
  mass: 'Mass',
}

export default function Card(props) {
  const { data, darkMode } = props
  useDocumentTitle(`${data.name} - SWDB`)
  const cachedSearchImage = useCache(searchImage, 'img')

  return (
    <div
      className={classnames({
        card: true,
        'card--dark-mode': darkMode,
      })}
    >
      <span className='card__title'>{data.name}</span>
      {Object.entries(dataDescription).map(([key, description]) => (
        <div className='card__data' key={key}>
          <div>{description}:</div>
          <div>{data[key]}</div>
        </div>
      ))}
      <Async
        promise={() => cachedSearchImage(data.name)}
        placeholder={placeholderImage}
        deps={[data.name]}
      >
        {(response, error) => (
          <CardImage response={response} error={error} name={data.name} />
        )}
      </Async>
    </div>
  )
}
