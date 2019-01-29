import React from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import GoogleImage from './GoogleImage'
import './Card.scss'

export default function Card({ data }) {
  useDocumentTitle(`${data.name} - SWDB`)
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
      <GoogleImage query={data.name} />
    </div>
  )
}
