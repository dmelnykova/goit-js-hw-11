// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import SimpleLightbox from 'simple-li' ;
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import { fetchImgs } from './api';
// import { makeMarkup, onSubmit } from './functions';
// import { refs } from './refs';

// let gallery = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// async function dataHandler(searchTarget, page = 1) {
//   try {
//     const imgs = await fetchImgs(searchTarget, page);
//     if (imgs.totalHits === 0) {
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }
//     refs.gallery.innerHTML = makeMarkup(imgs.hits);
//     Notify.success(`Hooray! We found ${imgs.totalHits} images.`);
//   } catch (error) {
//     Notify.failure('Oops, something went wrong. Try reloading the page!');
//   } finally {
//     Loading.remove();
//   }
//   gallery.refresh();
// }

// refs.form.addEventListener('submit', e => {
//   onSubmit(e, dataHandler);
// });

// export { gallery };
