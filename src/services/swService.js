import { fetchJson } from './client'

export async function getPerson(id) {
  return fetchJson(`https://swapi.co/api/people/${id}/`)
}
