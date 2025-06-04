import "./index.css";
import Api from "../utils/api.js";
import { enableValidation,settings,disableBtn,resetValidation} from "../scripts/validation.js";
import {setButtonText} from "../utils/helpers.js";
import avatarSrc from "../images/avatar.jpg";

const avatarImg = document.getElementById("bessieAvatar");
avatarImg.src = avatarSrc;

import crossLogoSrc from "../images/Logo.svg";

const crossLogoImg = document.getElementById("cross-logo");
crossLogoImg.src = crossLogoSrc;


import editPencilSrc from "../images/Pencil.svg";

const pencilImg = document.getElementById("edit-pencil");
pencilImg.src = editPencilSrc;


import addCrossSrc from "../images/cross.svg";

const addCrossImg = document.getElementById("add-cross");
addCrossImg.src = addCrossSrc;

import avatarEditPencil from "../images/avatar-edit-pencil.svg";

const addAvatarEditPencil = document.getElementById("avatar-edit-pencil");
addAvatarEditPencil.src = avatarEditPencil;


// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "438c56b7-9f70-465f-8796-4ec73adf5bfe",
    "Content-Type": "application/json",
  },
});

api.getAppInfo()
.then(([cards, users]) => {
  cards.forEach((card) => {
    const cardElement = getCardElement(card);
    cardsList.prepend(cardElement);
  })
profileDescription.textContent = users.about,
profileTitle.textContent = users.name,
avatarImg.src= users.avatar;
})
.catch(console.error);



const editProfileModal = document.querySelector("#edit-profile-modal");
const modalNameInput = document.querySelector("#input-name");
const modalDescriptionInput = document.querySelector("#input-description");
const modalSubmitBtn = document.querySelector(".modal_submit-btn");
const editModalCloseBtn = document.querySelector(".modal__close-btn");
const editModalFormElement = editProfileModal.querySelector(".modal__form");
const addProfileModal = document.querySelector("#add-profile-modal");
const addModalCloseBtn = addProfileModal.querySelector(".modal__close-btn");
const addModalFormElement = addProfileModal.querySelector(".modal__form");
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAddBtn = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const addCardLinkInput = addProfileModal.querySelector("#add-card-link-input");
const addCardCaptionInput = addProfileModal.querySelector("#input-caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const addModalBtn = addProfileModal.querySelector(".modal__submit-btn");


const deleteModal = document.querySelector("#delete-modal");
const deleteModalClosebtn = deleteModal.querySelector(".modal__close-btn-delete");
const deleteForm = deleteModal.querySelector(".delete__form");
const deleteModalDeleteBtn = deleteModal.querySelector(".modal__submit-btn-delete");
const deleteModalCancelBtn = deleteForm.querySelector(".modal__submit-btn-cancel");
const deleteModalInput = deleteForm.querySelector(".modal__label-delete");

const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarSubmitBtn =  avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarProfileInput = avatarModal.querySelector("#profile-avatar-input");

let selectedCard , selectedCardId;

function handleDeleteCard(cardElement,cardId){
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLike(evt,id){
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api.changeLikeStatus(id , isLiked)
   .then(()=> {
    evt.target.classList.toggle("card__like-button_liked"); })
    .catch(console.error);
  } ;

function handleDeleteSubmit(evt){
  evt.preventDefault();

  const deleteModalDeleteBtn = evt.submitter;
  setButtonText(deleteModalDeleteBtn,true,'Delete','Deleting...');

  api.removeCard(selectedCardId)
  .then(()=> {
  selectedCard.remove();
  closeModal(deleteModal);
  setButtonText(deleteModalDeleteBtn,false,'Delete','Deleting...');
  })
  .catch((err) => {
    console.error(err);
    setButtonText(deleteModalDeleteBtn,false,'Delete','Deleting...');
  });
};


deleteForm.addEventListener("submit", handleDeleteSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");


  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  if(data.isLiked){cardLikeBtn.classList.add("card__like-button_liked")};

  cardLikeBtn.addEventListener("click", (evt)=> handleLike(evt, data._id));

  cardDeleteBtn.addEventListener("click", () => handleDeleteCard(cardElement,data._id));



  cardImageElement.addEventListener("click", () => {
    previewModalImage.src = cardImageElement.src;
    previewModalImage.alt = cardImageElement.alt;
    previewModalCaption.textContent = cardNameElement.textContent;
    openModal(previewModal);
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", handleEscape);
}

profileEditBtn.addEventListener("click", () => {
  modalNameInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
  resetValidation(editModalFormElement, settings);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

function handleModalFormSubmit(evt) {
  evt.preventDefault();

  const modalSubmitBtn = evt.submitter;
   setButtonText(modalSubmitBtn,true);

   api.editUserInfo({name:modalNameInput.value,about:modalDescriptionInput.value})
    .then((data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  closeModal(editProfileModal);
  setButtonText(modalSubmitBtn,false);
    })
    .catch((err) => {
      console.error(err);
      setButtonText(modalSubmitBtn,false);
    });
};


function handleAvatarFormSubmit(evt){
  evt.preventDefault();

  const avatarSubmitBtn= evt.submitter;
  setButtonText(avatarSubmitBtn,true);

  api.editAvatarInfo(avatarProfileInput.value)
    .then((data) => {
      avatarImg.src = data.avatar;
      closeModal(avatarModal);
      avatarProfileInput.value = "";
      setButtonText(avatarSubmitBtn,false);
    })
    .catch((err) => {
      console.error(err);
      setButtonText(avatarSubmitBtn, false);
    });
  };


editModalFormElement.addEventListener("submit", handleModalFormSubmit);

deleteModalCancelBtn.addEventListener("click",()=>{
 closeModal(deleteModal);
});

profileAddBtn.addEventListener("click", () => {
  openModal(addProfileModal);
});

addModalCloseBtn.addEventListener("click", () => {
  closeModal(addProfileModal);
});

deleteModalClosebtn.addEventListener("click", () => {
  closeModal(deleteModal);
});


avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function addModalFormSubmit(evt) {
  evt.preventDefault();

  const addModalBtn= evt.submitter;
  setButtonText(addModalBtn,true);

  const inputValues = {
    name: addCardCaptionInput.value,
    link: addCardLinkInput.value,
  };
  api.createCards(inputValues)
  .then((cardData) =>{
   const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
  disableBtn(addModalBtn, settings);
  closeModal(addProfileModal);
  addCardCaptionInput.value = "";
  addCardLinkInput.value = "";
  setButtonText(addModalBtn,false);
 })
 .catch((err) => {
  console.error(err);
  setButtonText(addModalBtn,false);
});
};

addModalFormElement.addEventListener("submit", addModalFormSubmit);

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_open");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

enableValidation(settings);

