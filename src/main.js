import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadBtn = document.querySelector('#loadMore');

const messageStyles = {
  backgroundColor: '#ef4040',
  maxWidth: '432px',
  position: 'topRight',
  icon: 'fa-regular fa-times-circle',
  iconColor: '#fafafb',
  messageColor: '#fafafb',
  close: false,
  closeOnClick: true,
};

let inputValue = '';
let currentPage = 1;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  inputValue = event.target.elements.search.value.trim();

  if (inputValue === '') {
    iziToast.error({
      message: 'Please enter a search term!',
      ...messageStyles,
    });
    return;
  }

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(inputValue, currentPage);

    if (data.totalHits === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        ...messageStyles,
      });
      return;
    }

    createGallery(data.hits);

    if (currentPage * perPage < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
      ...messageStyles,
    });
  } finally {
    hideLoader();
  }
});

loadBtn.addEventListener('click', async () => {
  currentPage++;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(inputValue, currentPage);

    createGallery(data.hits);

    const firstCard = document.querySelector('.gallery-list-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (currentPage * perPage >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        ...messageStyles,
        backgroundColor: '#4e75ff',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoadMoreButton();
    iziToast.error({
      message: 'Something went wrong. Please try again!',
      ...messageStyles,
    });
  } finally {
    hideLoader();
  }
});
