const apiKey = '39897083 - 75dbac4ee3cbc91ee06f44220';

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchQuery = event.target.searchQuery.value;
  
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    const images = response.data.hits;

    console.log(images);
  } catch (error) {
    console.error('Error fetching images', error);
  }
});
