const showInputError = (formEl,inputEl,errorMsg,config) => {
 const errorMsgID = inputEl.id + "-error";
 const errorMsgEl = formEl.querySelector("#"+ errorMsgID);
 errorMsgEl.textContent = errorMsg;
 inputEl.classList.add(config.inputErrorClass);
};


const hideInputError = (formEl,inputEl,config) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#"+ errorMsgID);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
 };


const checkInputValidity = (formEl, inputEl,config) => {
  if (!inputEl.validity.valid){
  showInputError(formEl,inputEl,inputEl.validationMessage,config);
} else {
  hideInputError(formEl,inputEl,config);
}
};
const hasInvalidInput = (inputList) =>{
 return inputList.some((element) => {
  return !element.validity.valid;
 });
};

function resetValidation (formEl,config){
 const inputList = Array.from(formEl.querySelectorAll(config. inputSelector));
 inputList.forEach((inputEl) => {
  hideInputError(formEl,inputEl,config)
 });
const formSubmitBtn = formEl.querySelector(config.submitButtonSelector);
toggleButtonState(inputList, formSubmitBtn, config);
};

export const toggleButtonState = (inputList, formSubmitBtn,config) => {
 if (hasInvalidInput(inputList)){
   disableBtn(formSubmitBtn,config);
 }
 else {
  formSubmitBtn.disabled=false;
  formSubmitBtn.classList.remove(config.inactiveButtonClass);
 }
};

export const disableBtn = (formSubmitBtn,config) => {
  formSubmitBtn.disabled= true;
  formSubmitBtn.classList.add(config.inactiveButtonClass);
};

  const setEventListener = (formEl,config) =>{
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const formSubmitBtn = formEl.querySelector(config.submitButtonSelector);

toggleButtonState(inputList,formSubmitBtn,config);

formEl.addEventListener("reset", () => {
  disableBtn(formSubmitBtn, config);
});

inputList.forEach((inputEl) => {
  inputEl.addEventListener("input", function () {
  checkInputValidity(formEl, inputEl,config);
  toggleButtonState(inputList, formSubmitBtn,config);
  });
  });
};

export const enableValidation = (config) => {
 const formList = document.querySelectorAll(config.formSelector);
 formList.forEach((formEl)=> {
  setEventListener(formEl,config);
 });
};

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disable",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}
