import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '44058591-0a089b90b73dabb9c701622b7';
const BASE_URL = 'https://pixabay.com/api/?';

export default class newAPIService {
  constructor() {
    this.q = '';
    this.page = 1;
    this.data = [];
  }
  async fetchimages(q) {
    this.q = q;
    let params = new URLSearchParams({
      q: this.q,
      page: this.page,
      //Constantes
      key: API_KEY,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    try {
      let response = await axios.get(BASE_URL + params);
      this.data = response.data.hits;
      if (this.data.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notiflix.Notify.success('Done, images found', 'Images Loaded', 'Close', {
        width: '360px',
        svgSize: '120px',
      });
      return this.data;
    } catch (error) {
      Notiflix.Notify.failure(error.message, 'Close', {
        width: '360px',
        svgSize: '120px',
      });
      return [];
    }
  }
  async fetchMore() {
    this.page += 1;
    let data = await this.fetchimages(this.q);
    return data;
  }
}
