export const toggleDisabledState = () => {
  const fieldsets = document.querySelectorAll("fieldset");
  console.debug(fieldsets);

  fieldsets.forEach((fieldset) => {
    fieldset.toggleAttribute("disabled");
  });
};

export const enableInput = (input) => {
  const inputField = document.querySelector(`#${input}`);

  if (!inputField) {
    return;
  }

  inputField.toggleAttribute("disabled");
};
