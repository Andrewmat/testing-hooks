
export function fetchPerson(id) {
  return fetch(`https://swapi.co/api/people/${id}/`)
    .then(resp => resp.json())
    .catch(error => {
      throw error;
    });
}