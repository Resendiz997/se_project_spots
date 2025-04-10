const showInputError = (formEl,inputEl,errorMsg) => {
 const errorMsgID = inputEl.id + "-error";
 const errorMsgEl = document.querySelector("#"+ errorMsgID);
 errorMsgEl.textContent = errorMsg;
};


const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid){
  showInputError(formEl,inputEl,inputEl.validationMessage);
}
};


const setEventListener = (formEl) =>{
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const formSubmitBtn = formEl.querySelector(".modal__submit-btn");

  //toggleButtonState(inputList,formSubmitBtn);
inputList.forEach((inputEl) => {
  inputEl.addEventListener("input", function () {
  checkInputValidity(formEl, inputEl);
  // toggleButtonState(inputList, formSubmitBtn);
  });
  });
};

const enableValidation = () => {
 const formList = document.querySelectorAll(".modal__form");
 formList.forEach((formEl)=> {
  setEventListener(formEl);
 });
};

enableValidation();
