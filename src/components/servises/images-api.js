const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34774708-6b762e8885ee2872777619856';

async function fetchImages(query, page = 1, perPage = 12) {
    const url = `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const hits = await response.json();
    return hits;
}

export { fetchImages };
