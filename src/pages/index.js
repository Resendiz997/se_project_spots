import "./index.css";
import { enableValidation,settings,disableBtn} from "../scripts/validation.js";

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

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

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

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

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
  profileTitle.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal(editProfileModal);
}
editModalFormElement.addEventListener("submit", handleModalFormSubmit);

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

profileAddBtn.addEventListener("click", () => {
  openModal(addProfileModal);
});

addModalCloseBtn.addEventListener("click", () => {
  closeModal(addProfileModal);
});

function addModalFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: addCardCaptionInput.value,
    link: addCardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  disableBtn(addModalBtn, settings);
  closeModal(addProfileModal);
  addCardCaptionInput.value = "";
  addCardLinkInput.value = "";
}

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

