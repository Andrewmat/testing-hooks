import React from 'react'
import classnames from 'classnames'
import Async from './Async'
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

function isImage(image) {
  const isLinkOk = /\.(jpe?g|png|webp)$/.test(image.link)
  const isMimeOk = /^image\//.test(image.mime)
  return isLinkOk && isMimeOk
}

const calcDimensions = ({ width, height }) => {
  const MAX_WIDTH = 500
  const MAX_HEIGHT = 250

  if (width <= MAX_WIDTH && height <= MAX_HEIGHT) {
    return { width, height }
  }
  let calcWidth = width
  let calcHeight = height
  const ratio = width / height

  if (calcWidth > MAX_WIDTH) {
    calcWidth = MAX_WIDTH
    calcHeight = calcWidth / ratio
  }
  if (calcHeight > MAX_HEIGHT) {
    calcHeight = MAX_HEIGHT
    calcWidth = calcHeight * ratio
  }

  return { width: Math.floor(calcWidth), height: Math.floor(calcHeight) }
}

const renderCardImage = data => (response, error) => {
  if (error) {
    if (error.status === 403) {
      return (
        <div>
          Oops. It looks like we ran out of image lookups... Look again
          tomorrow!
        </div>
      )
    } else {
      return <div>I find the lack of images disturbing</div>
    }
  }
  const result = response.items.find(resultItem => isImage(resultItem))
  const dimensions = calcDimensions(result.image)
  return (
    <div
      className='card__image-wrapper'
      style={{
        maxHeight: `${dimensions.height}px`,
        maxWidth: `${dimensions.width}px`,
      }}
    >
      <img
        src={result.link}
        alt={data.name}
        height={dimensions.height}
        width={dimensions.width}
      />
    </div>
  )
}

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
  const promise = useCache(() => searchImage(data.name), {
    key: data.name,
    namespace: 'img',
  })

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
        promise={promise}
        placeholder={placeholderImage}
        deps={[data.name]}
      >
        {renderCardImage(data)}
      </Async>
    </div>
  )
}
