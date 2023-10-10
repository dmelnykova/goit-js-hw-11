import axios from 'axios';

const API_KEY = '39897083-75dbac4ee3cbc91ee06f44220';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImgs(target, page = 1) {
  const options = {
    key: API_KEY,
    q: target,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 40,
  };

  try {
    const response = await axios.get(BASE_URL, { params: options });
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images');
  }
}

export { fetchImgs };
