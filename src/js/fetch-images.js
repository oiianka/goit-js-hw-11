import axios from 'axios'
export {fetchImages}
axios.defaults.baseURL = 'https://pixabay.com/api/'
const KEY = "25299896-e17c3381d4682ff8b047d8255"

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  )
  return response
};