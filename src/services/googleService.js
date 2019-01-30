import { fetchJson } from './client'

const searchUrl = (searchParams = {}) => {
  const url = new URL('https://www.googleapis.com/customsearch/v1')
  url.search = new URLSearchParams({
    key: process.env.APP_GOOGLESEARCH_API_KEY,
    cx: process.env.APP_GOOGLESEARCH_CONTROL_ID,
    ...searchParams,
  })
  return url
}

export async function search(query) {
  return fetchJson(searchUrl({ q: query }))
}

export async function searchImage(query) {
  return fetchJson(
    searchUrl({
      q: query,
      searchType: 'image',
    }),
  )
}
