import { Loading, Notify } from 'notiflix';
import { fetchImgs } from './api';
import { refs } from './refs';
import { gallery } from '.';

let page = 1;
let currentSearchTarget = '';

const observe = new IntersectionObserver(observeHandler);

function makeMarkup(imagesArr) {
  return imagesArr
    .map(image => {
      return `
      <div class="photo-card">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes: ${image.likes}</b></p>
          <p class="info-item"><b>Views: ${image.views}</b></p>
          <p class="info-item"><b>Comments: ${image.comments}</b></p>
          <p class="info-item"><b>Downloads: ${image.downloads}</b></p>
        </div>
      </div>
    `;
    })
    .join('');
}

async function fetchAndDisplayImages(searchTarget, page) {
  try {
    const imgs = await fetchImgByPage(searchTarget, page);
    if (imgs.totalHits === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    const markup = makeMarkup(imgs.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(imgs.totalHits / 40);
    if (page < totalPages) {
      observe.observe(refs.trigger);
    } else {
      Notify.info("You've reached the end of the results.");
    }
  } catch (error) {
    Notify.failure('Oops, something went wrong. Try reloading the page!');
  } finally {
    Loading.remove();
    gallery.refresh();
  }
}

function observeHandler(entries) {
  entries.forEach(item => {
    if (item.isIntersecting) {
      page += 1;
      fetchAndDisplayImages(currentSearchTarget, page);
    }
  });
}

export { makeMarkup, fetchAndDisplayImages, observeHandler };
