const initialCards =[
    {name:"Val Thorens",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"},
    {name:"Restaurant terrace",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"},
    {name:"An outdoor cafe",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"},
    {name:"A very long bridge, over the forest and through the trees",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
    {name:"Tunnel with morning light",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"},
    {name:"Mountain house",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"},];

const editProfileModal = document.querySelector("#edit-profile-modal");
const modalNameInput = document.querySelector("#input-name");
const modalDescriptionInput = document.querySelector("#input-description");
const modalSubmitBtn = document.querySelector(".modal_submit-btn");
const modalCloseBtn = document.querySelector(".modal__close-btn");
const modalFormElement = editProfileModal.querySelector(".modal__form");
const addProfileModal = document.querySelector("#add-profile-modal");
const addModalCloseBtn = addProfileModal.querySelector(".modal__close-btn");
const addModalFormElement = addProfileModal.querySelector(".modal__form");

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAddBtn = document. querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector('.cards__list');
const addCardLinkInput = addProfileModal.querySelector("#add-card-link-input");
const addCardCaptionInput = addProfileModal.querySelector("#input-caption");



function getCardElement(data){
 const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
 const cardNameElement = cardElement.querySelector('.card__title');
 const cardImageElement = cardElement.querySelector('.card__image');
 const cardLikeBtn = cardElement.querySelector(".card__like-button");
 const cardDeleteBtn = cardElement.querySelector(".card__delete-button");


 cardNameElement.textContent = data.name;
 cardImageElement.src = data.link;
 cardImageElement.alt = data.name;

cardLikeBtn.addEventListener("click", () => {
  cardLikeBtn.classList.toggle("card__like-button_liked");
});

cardDeleteBtn.addEventListener("click", () => {
  cardDeleteBtn.classList.remove("card__delete-button");
});
  return cardElement;
}

function openBtn (modal){
  modal.classList.add("modal_open");
}

function closeBtn (modal){
  modal.classList.remove("modal_open");
}

profileEditBtn.addEventListener("click", () => {
  modalNameInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  openBtn(editProfileModal);
 });

modalCloseBtn.addEventListener("click",() => {
  closeBtn(editProfileModal);
});

function handleModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeBtn(editProfileModal);
 }
 modalFormElement.addEventListener("submit",handleModalFormSubmit);


initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

profileAddBtn.addEventListener("click", () => {
  openBtn(addProfileModal);
});

addModalCloseBtn.addEventListener("click", () => {
  closeBtn(addProfileModal);
});

function addModalFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {name: addCardCaptionInput.value , link: addCardLinkInput.value};
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeBtn(addProfileModal);
 }

addModalFormElement.addEventListener("submit",addModalFormSubmit);

function deleteCard (){

};