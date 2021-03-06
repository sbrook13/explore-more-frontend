const baseURL = 'http://localhost:3000';
export const loginURL = `${baseURL}/login`;
export const usersURL = `${baseURL}/users`;
export const homeURL = `${baseURL}/home`;
export const completedURL = `${baseURL}/completed_trails`;
export const favoritesURL = `${baseURL}/favorites`;
export const bucketlistURL = `${baseURL}/bucket_lists`;
export const bikeBaseURL = `https://www.mtbproject.com/data/get-trails`;
export const hikeBaseURL = `https://www.hikingproject.com/data/get-trails`;
export const ridesByIdURL = `https://www.mtbproject.com/data/get-trails-by-id`
export const hikesByIdURL = `https://www.hikingproject.com/data/get-trails-by-id`

export const authHeaders = { 
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}`
}

export const postTrailToBackend = (url, trail_id, trail_type, user) => {
  const user_id = user.id
  fetch(url, {
    method: 'POST',
    headers: authHeaders, 
    body: JSON.stringify({user_id, trail_id, trail_type})
  })
    .then(parseJSON)
    .then(result => console.log(result))
}

export function setToken(token){
  localStorage.setItem('token', token)
}

export function parseJSON(response) {
  return response.json()
}

export const calculateTime = (trail, type) => {
  if (type === 'bike') {
    const timeInHours = ( trail['length'] / 8 ) + (trail.ascent / 2500) 
    return timeInHours.toFixed(1)
  } else {
    const timeInHours = ( trail['length'] / 2.5 ) + (trail.ascent / 1500)
    return timeInHours.toFixed(1)
  }
}


