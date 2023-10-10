import { Notify, Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImgs } from './api';
import { makeMarkup } from './functions'; 
import { refs } from './refs';

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentSearchTarget = '';  
let page = 1; 

async function dataHandler(searchTarget, page = 1) {
  try {
    const imgs = await fetchImgs(searchTarget, page);
    if (imgs.totalHits === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    
    const markup = makeMarkup(imgs.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    // "Load more" button
    refs.loadMore.style.display = 'block';

    Notify.success(`Hooray! We found ${imgs.totalHits} images.`);
  } catch (error) {
    Notify.failure('Oops, something went wrong. Try reloading the page!');
  } finally {
    Loading.remove();
    gallery.refresh();
  }
}

refs.loadMore.addEventListener('click', () => {
  page++;
  dataHandler(currentSearchTarget, page);
});

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  Loading.arrows();

  currentSearchTarget = e.target.elements.searchQuery.value;
  if (!currentSearchTarget) {
    Loading.remove();
    Notify.failure('Please enter your request correctly!');
    return;
  }

  page = 1;
  refs.gallery.innerHTML = ''; 
  dataHandler(currentSearchTarget, page);  

  e.target.reset();
});

export { gallery };
