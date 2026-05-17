import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#loadMore');

export const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('visually-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('visually-hidden');
}

export function createGallery(images) {
  const markup = images
    .map(
      item => `<li class="gallery-list-item">
      <a href="${item.largeImageURL}"><img src="${item.webformatURL}" alt="${item.tags}" /></a>
    <table>
      <tr>
        <th>Likes</th>
        <th>Views</th>
        <th>Comments</th>
        <th>Downloads</th>
      </tr>
      <tr>
        <td>${item.likes}</td>
        <td>${item.views}</td>
        <td>${item.comments}</td>
        <td>${item.downloads}</td>
      </tr>
    </table>
  </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
