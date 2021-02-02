import pics from './gallery-items.js';

const ulListRef = document.querySelector('.gallery.js-gallery'); // Ссылка на коллекцию UL
const backDropRef = document.querySelector('.js-lightbox'); // Ссылка на бэкдроп
const originalImgRef = document.querySelector('.lightbox__image'); // Ссылка на img для оригинальной картинки
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]'); // Ссылка кнопки-закрытия
const overlayRef = document.querySelector('.lightbox__overlay'); // Ссылка на серый фон (оверлей)

// !Перебираем массив pics для получения строки-li с тегами и src
const listOfimg = pics.reduce((accum, pic) => {
  return (
    accum +
    `  
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${pic.original}"
  >
    <img
      class="gallery__image"
      src="${pic.preview}"
      data-source="${pic.original}"
      alt="${pic.description}"
    />
  </a>
</li>`
  );
}, '');

// !добавляем в нашу коллекцию UL строки
ulListRef.insertAdjacentHTML('afterbegin', listOfimg);

// !слушатель на бекдроп по клику
ulListRef.addEventListener('click', event => {
  event.preventDefault(); // чтобы не переходить по ссылке
  const target = event.target;

  // *добавляем класс для бэкдропа
  if (target.nodeName === 'IMG') {
    backDropRef.classList.add('is-open'); // добавление класса для открытия модалки
    window.addEventListener('keydown', onClickEscape); // закрываем по Escape
  }

  // *Подмена значения src img
  if (target.nodeName === 'IMG') {
    originalImgRef.src = target.getAttribute('data-source');
    originalImgRef.alt = target.getAttribute('alt');
  }
});

// !Закрытие по клику по оверлею
overlayRef.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    backDropRef.classList.remove('is-open');
    window.removeEventListener('keydown', onClickEscape);
  }
});

// !Закрытие по клику по кнопке
closeBtnRef.addEventListener('click', () => {
  backDropRef.classList.remove('is-open');
  window.removeEventListener('keydown', onClickEscape);
});

// ф-я для закрытия по Ескейпу
function onClickEscape(event) {
  if (event.code === 'Escape') {
    console.log('нажал ЕСКЕЙП');
    backDropRef.classList.remove('is-open');
    window.removeEventListener('keydown', onClickEscape);
  }
}
