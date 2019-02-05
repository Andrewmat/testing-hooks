import React from 'react'

export default function CardImage({ name, response, error }) {
  if (error) {
    if (error.status === 403) {
      return (
        <div>
          Oops. It looks like we ran out of image lookups...
          <br />
          Look again tomorrow!
        </div>
      )
    } else {
      return <div>I find the lack of images disturbing</div>
    }
  }

  let result = response.items.find(resultItem => isImage(resultItem))
  if (!result) {
    const resultHttp = response.items.find(resultItem =>
      isImage(resultItem, false),
    )
    if (resultHttp) {
      result = resultHttp
    } else {
      return <div>It looks like no image was found :(</div>
    }
  }

  const dimensions = normalizeDimensions({
    ...result.image,
    maxWidth: 500,
    maxHeight: 250,
  })
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
        alt={name}
        height={dimensions.height}
        width={dimensions.width}
      />
    </div>
  )
}

function isImage(image, https = true) {
  const isLinkOk = /\.(jpe?g|png|webp)$/.test(image.link)
  const isHttps = /^https:/.test(image.link)
  const isMimeOk = /^image\//.test(image.mime)
  return isLinkOk && isMimeOk && (isHttps || !https)
}

function normalizeDimensions({ width, height, maxWidth, maxHeight }) {
  if (width <= maxWidth && height <= maxHeight) {
    return { width, height }
  }

  let calcWidth = width
  let calcHeight = height
  const ratio = width / height

  if (calcWidth > maxWidth) {
    calcWidth = maxWidth
    calcHeight = calcWidth / ratio
  }
  if (calcHeight > maxHeight) {
    calcHeight = maxHeight
    calcWidth = calcHeight * ratio
  }

  return { width: Math.floor(calcWidth), height: Math.floor(calcHeight) }
}
