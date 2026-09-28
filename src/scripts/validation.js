function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-error`
  );


  inputElement.classList.add(config.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-error`
  );

  inputElement.classList.remove(config.inputErrorClass);

  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.validationMessage;

    if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.dataset.errorMessage;
    }

    showInputError(
      formElement,
      inputElement,
      errorMessage,
      config
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      config
    );
  }
}

function toggleButtonState(formElement, config) {
  const button = formElement.querySelector(
    config.submitButtonSelector
  );

  if (!formElement.checkValidity()) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(formElement, config) {
  const inputs = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(
        formElement,
        inputElement,
        config
      );

      toggleButtonState(
        formElement,
        config
      );
    });
  });
}

export function enableValidation(config) {
  const forms = Array.from(
    document.querySelectorAll(config.formSelector)
  );

  forms.forEach((formElement) => {
    setEventListeners(
      formElement,
      config
    );
  });
}

export function clearValidation(formElement, config) {
  const inputs = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputs.forEach((inputElement) => {
    hideInputError(
      formElement,
      inputElement,
      config
    );
  });

  toggleButtonState(
    formElement,
    config
  );
}
