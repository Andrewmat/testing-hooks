export async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw response
  }
  return response.json()
}
