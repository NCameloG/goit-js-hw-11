import newAPIService from './js/api';
import Gallery from './js/render';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const service = new newAPIService();
let refs = {
  form: document.getElementById('search-form'),
};

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  let q = e.target.elements['search-form'].value;
  if (q.trim === '') {
    return;
  }
  document.getElementById('gallery').innerHTML = '';
  let data = await service.fetchimages(q);
  let imagesGallery = new Gallery(
    data,
    'gallery',
    service.fetchMore.bind(service)
  );
  imagesGallery.renderGallery();
});
