import pics from './gallery-items.js';

const ulListRef = document.querySelector('.gallery.js-gallery'); // Ссылка на коллекцию UL
const backDropRef = document.querySelector('.js-lightbox'); // Ссылка на бэкдроп
const originalImgRef = document.querySelector('.lightbox__image'); // Ссылка на img для оригинальной картинки
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]'); // Ссылка кнопки-закрытия
const overlayRef = document.querySelector('.lightbox__overlay'); // Ссылка на серый фон (оверлей)

const listOfLinks = pics.map(pic => pic.original); // массив ссылок на оригиналбные (увеличенные) картинки

// Перебираем массив pics для получения строки-li с нужными атрибутами
const listOfimg = pics.reduce((accum, pic, idx) => {
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
      data-idx="${idx}"
      alt="${pic.description}"
    />
  </a>
</li>`
  );
}, '');

// добавляем в нашу коллекцию UL - строки
ulListRef.insertAdjacentHTML('afterbegin', listOfimg);

// слушатель на бекдроп по клику
ulListRef.addEventListener('click', event => {
  event.preventDefault(); // запрет браузеру на стандартные действия, чтобы не переходил по ссылке кликнув на pic
  const target = event.target;

  // получение url большого изображения
  // console.log(target.dataset.source);

  // добавляем class="is-open" для бэкдропа
  if (target.nodeName === 'IMG') {
    // добавление класса для открытия бэкдропа
    backDropRef.classList.add('is-open');
    // добавляем слушателя на закрытие бэкдропа по Escape
    window.addEventListener('keydown', onClickEscape);
  }

  // Подмена значения src у <img>
  if (target.nodeName === 'IMG') {
    originalImgRef.src = target.getAttribute('data-source');
    originalImgRef.alt = target.getAttribute('alt');
  }

  // todo клацаем по кнопкам влево / вправо по галерее
  let activeIdx = +event.target.getAttribute('data-idx'); // таргет на клацнутом єлементе, то-есть на img
  // console.log('Начальный индекс:', activeIdx); //!

  window.addEventListener('keydown', event => {
    if (event.code === 'ArrowRight') {
      activeIdx += 1;
      if (activeIdx < 9) {
        // console.log('Наклацанный индекс:', activeIdx);
        originalImgRef.src = listOfLinks[`${activeIdx}`];
      } else {
        activeIdx = listOfLinks.length - 1;
      }
    }

    if (event.code === 'ArrowLeft') {
      activeIdx -= 1;
      if (activeIdx >= 0) {
        // console.log('Наклацанный индекс:', activeIdx);
        originalImgRef.src = listOfLinks[`${activeIdx}`];
      } else {
        activeIdx = 0;
      }
    }
  });
});

// Закрытие по клику по оверлею
overlayRef.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    backDropRef.classList.remove('is-open');
    closePic(); // ф-я очистки значения атрибута src
    window.removeEventListener('keydown', onClickEscape);
  }
});

// Закрытие по клику по кнопке
closeBtnRef.addEventListener('click', () => {
  backDropRef.classList.remove('is-open');
  closePic(); // ф-я очистки значения атрибута src
  window.removeEventListener('keydown', onClickEscape);
});

// ф-я для закрытия по Ескейпу
function onClickEscape(event) {
  if (event.code === 'Escape') {
    // console.log('нажал ЕСКЕЙП');
    backDropRef.classList.remove('is-open');
    closePic(); // ф-я очистки значения атрибута src
    window.removeEventListener('keydown', onClickEscape);
  }
}

// ф-я очистки значения атрибута src элемента img.lightbox__image
function closePic() {
  originalImgRef.src = '';
  originalImgRef.alt = '';
}
