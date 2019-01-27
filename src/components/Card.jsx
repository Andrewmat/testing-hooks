import React from "react"
import "./Card.scss"

const Card = ({ data }) => (
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
  </div>
)

export default Card
