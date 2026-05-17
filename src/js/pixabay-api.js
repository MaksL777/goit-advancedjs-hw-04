import axios from 'axios';

const apiKey =
  import.meta.env.VITE_PIXABAY_API_KEY || '55900104-77b70d42c45e5d2cc95a09a21';

const options = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};

export async function getImagesByQuery(query, page) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: apiKey,
      q: query,
      page,
      ...options,
    },
  });
  return response.data;
}

export const totalPages = data => Math.ceil(data.totalHits / options.per_page);
