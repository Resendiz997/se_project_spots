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


const profileEditBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector('.cards__list');

function getCardElement(data){
 const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
 const cardNameElement = cardElement.querySelector('.card__title');
 const cardImageElement = cardElement.querySelector('.card__image');

 cardNameElement.textContent = data.name;
 cardImageElement.src = data.link , data.name;


  return cardElement;
}

 profileEditBtn.addEventListener("click",function(){
  editProfileModal.classList.add("modal_open");
  modalNameInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
});


modalCloseBtn.addEventListener("click", function(){
  editProfileModal.classList.remove("modal_open");
 });

function handleModalFormSubmit(evt) {
 evt.preventDefault();
 profileTitle.textContent = modalNameInput.value;
 profileDescription.textContent = modalDescriptionInput.value;
 modalCloseBtn;
}

modalFormElement.addEventListener("submit",handleModalFormSubmit);

for (let i = 0; i < initialCards.length;i++){
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
