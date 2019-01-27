
export function fetchPerson(id) {
  return fetch(`https://swapi.co/api/people/${id}/`)
    .then(resp => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json()
    })
    .catch(error => {
      throw error;
    });
}