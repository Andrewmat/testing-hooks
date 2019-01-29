import React, { useState, useEffect } from 'react'

function isImage(image) {
  const isLinkOk = /\.(jpe?g|png|webp)$/.test(image.link)
  const isMimeOk = /^image\//.test(image.mime)
  return isLinkOk && isMimeOk
}

export default function GoogleImage({ query }) {
  const [image, setImage] = useState()
  useEffect(() => {
    const url = new URL('https://www.googleapis.com/customsearch/v1')
    url.search = new URLSearchParams({
      key: 'AIzaSyBTc4ymLstGMOQXihOPecItcg9Y4xQjCpY',
      cx: '007277771693008475535:3daq_gak8bm',
      searchType: 'image',
      q: query,
    })
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(json => {
        return json.items.find(resultItem => isImage(resultItem))
      })
      .then(item => {
        setImage(item)
      })
  }, query)

  if (!image) return null
  return (
    <img
      src={image.link}
      alt={query}
      height={image.image.height}
      width={image.image.width}
    />
  )
}
