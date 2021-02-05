import pics from './gallery-items.js';

const ulListRef = document.querySelector('.gallery.js-gallery'); // Ссылка на коллекцию UL
const backDropRef = document.querySelector('.js-lightbox'); // Ссылка на бэкдроп
const originalImgRef = document.querySelector('.lightbox__image'); // Ссылка на img для оригинальной картинки
const closeModalBtnRef = document.querySelector('button[data-action="close-lightbox"]'); // Ссылка кнопки-закрытия
const overlayClickRef = document.querySelector('.lightbox__overlay'); // Ссылка на серый фон (оверлей)

const listOfLinks = pics.map(pic => pic.original); // массив ссылок на оригиналбные (увеличенные) картинки
let activeIdx; // текущий индекс "таргетной" текущей картинки (счетчик для переключения по кликам влево / вправо)

// Перебираем массив pics для получения строки-li с нужными атрибутами для создания html динамически
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
// Создаем динамически разметку HTML, добавляем в нашу коллекцию UL - строки
ulListRef.insertAdjacentHTML('afterbegin', listOfimg);

ulListRef.addEventListener('click', onOpenModal); // Открытие модалки по клику на img
closeModalBtnRef.addEventListener('click', onHandleToPressSomeBtns); // Закрытие модалки по клику на кнопку
overlayClickRef.addEventListener('click', onHandleToPressSomeBtns); // Закрытие модалки по клику на Оверлей

// !ф-я открытия модалки
function onOpenModal(event) {
  event.preventDefault(); // запрет браузеру на стандартные действия, чтобы не переходил по ссылке кликнув на pic
  const target = event.target;

  if (target.nodeName === 'IMG') {
    // добавление класса для открытия бэкдропа
    backDropRef.classList.add('is-open');
    // добавляем слушателя на закрытие бэкдропа по Escape
    window.addEventListener('keydown', onHandleToPressSomeBtns);
    // Подмена значения src и alt у <img>
    originalImgRef.src = target.dataset.source;
    originalImgRef.alt = target.alt;
  }

  activeIdx = +event.target.getAttribute('data-idx'); // таргет на клацнутом єлементе, то-есть на img
  // console.log(activeIdx);
}

// !универсальный метод по кликам кнопок
function onHandleToPressSomeBtns(event) {
  // закрытие по ескейпу или клику на оверлей
  if (event.code === 'Escape' || event.target === event.currentTarget) {
    // console.log('закрыл какой-то кнопкой');
    closeModal();
  }

  // перелистывание по клику на Right button
  if (event.code === 'ArrowRight') {
    activeIdx += 1;
    if (activeIdx < 9) {
      // console.log('Наклацанный индекс:', activeIdx);
      originalImgRef.src = listOfLinks[`${activeIdx}`];
    } else {
      activeIdx = listOfLinks.length - 1;
    }
  }

  // перелистывание по клику на Left button
  if (event.code === 'ArrowLeft') {
    activeIdx -= 1;
    if (activeIdx >= 0) {
      // console.log('Наклацанный индекс:', activeIdx);
      originalImgRef.src = listOfLinks[`${activeIdx}`];
    } else {
      activeIdx = 0;
    }
  }
}

// !функция закрытия модалки и очистки атрибутов
function closeModal() {
  // закрытие модалки
  backDropRef.classList.remove('is-open');
  // снятие слушателя с ESC
  window.removeEventListener('keydown', onHandleToPressSomeBtns);
  // очистка значения атрибута src элемента img.lightbox__image
  originalImgRef.src = '';
  originalImgRef.alt = '';
}
