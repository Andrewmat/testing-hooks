import { useState, useEffect } from 'react'

export default function useDocumentTitle(title) {
  const [originalTitle, setOriginalTitle] = useState(document.title)
  useEffect(() => {
    setOriginalTitle(document.title)
    document.title = title
    return () => {
      document.title = originalTitle
    }
  }, [title])
  if (!document) {
    throw new Error(
      `useDocumentTitle can't be used in contexts without document`,
    )
  }
}
