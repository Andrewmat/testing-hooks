import React from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useCache from '../hooks/useCache'
import { searchImage } from '../services/googleService'
import './Card.scss'
import Async from './Async'

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

function renderImage({ data }) {
  return (response, error) => {
    if (error) {
      return null
    }
    const image = response.items.find(resultItem => isImage(resultItem))
    return (
      <img
        src={image.link}
        alt={data.name}
        height={image.image.height}
        width={image.image.width}
      />
    )
  }
}

export default function Card(props) {
  const { data } = props
  useDocumentTitle(`${data.name} - SWDB`)
  const promise = useCache(() => searchImage(data.name), {
    key: data.name,
    namespace: 'img',
  })

  return (
    <div className='card'>
      <span className='card__title'>{data.name}</span>
      <div className='card__data'>
        <div>Eye color:</div>
        <div>{data.eye_color}</div>
      </div>
      <div className='card__data'>
        <div>Skin color:</div>
        <div>{data.skin_color}</div>
      </div>
      <div className='card__data'>
        <div>Hair color:</div>
        <div>{data.hair_color}</div>
      </div>
      <div className='card__data'>
        <div>Height:</div>
        <div>{data.height}cm</div>
      </div>
      <div className='card__data'>
        <div>Mass:</div>
        <div>{data.mass}kg</div>
      </div>
      <Async
        promise={promise}
        placeholder={placeholderImage}
        deps={[data.name]}
      >
        {renderImage(props)}
      </Async>
    </div>
  )
}
