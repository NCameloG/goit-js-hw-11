export default class Gallery {
  constructor(data, imagesID, loadMoreCallback) {
    this.data = data;
    this.images = document.getElementById(imagesID);
    this.callback = loadMoreCallback;
  }
  renderGallery() {
    let oldButton = this.images.querySelector('button');
    if (oldButton) {
      oldButton.remove();
    }
    let toRenderText = this.data
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
          <a href="${largeImageURL}">
            <img
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
              class="photo"
            />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <br>${likes}</br>
              </p>
              <p class="info-item">
                <b>Views</b>
                <br>${views}</br>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <br>${comments}</br>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <br>${downloads}</br>
              </p>
            </div>
          </div>`;
        }
      )
      .join('');
    gallery.addEventListener('click', openModal);

    function openModal(e) {
      e.preventDefault();
    }
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsDelay: '200ms',
      captionPosition: 'bottom',
      captionsData: 'alt',
    });
    let button = document.createElement('button');
    let div = document.createElement('div');
    div.id = 'loadMoreContainer';
    div.style.width = '100%';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignContent = 'center';
    button.type = 'button';
    button.classList.add('load-button');
    button.textContent = 'Load more';
    button.addEventListener('click', async () => {
      this.data = await this.callback();
      this.renderGallery();
    });
    this.images.innerHTML += toRenderText;
    div.append(button);
    this.images.append(div);
    lightbox.refresh();
  }
}
