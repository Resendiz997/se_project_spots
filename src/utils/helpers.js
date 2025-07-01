export function setButtonText(modalSubmitBtn, isLoading, defaultText='Save', loadingText='Saving...'){
if (isLoading){
  modalSubmitBtn.textContent= loadingText ;
} else{
  modalSubmitBtn.textContent = defaultText
}
};