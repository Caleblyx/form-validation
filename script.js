const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

const showEmailError = () => {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = "Please provide your e-mail address above.  "
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = "The above is not a valid e-mail address. Please check that it matches this format: username@domainname.com"
    }
    emailError.className = "error active";
}

emailInput.addEventListener("input", (event) => {
    if (emailInput.validity.valid) {
        emailError.textContent = "";
    } else {
        console.log("hello")
        showEmailError();
    }
})

const countryInput = document.getElementById("country");
const countryError = document.getElementById("country-error");

const isInDataList = (country) => {
    const countryDatalist = Array.from(document.getElementById("countries").children);
    return countryDatalist.filter(child => {return child.innerHTML == country}).length == 1;
}

const showCountryError = () => {
    if (countryInput.validity.valueMissing) {
        countryError.textContent = "Please input your country of residence above."
        countryError.className = "error active"
        countryInput.className = "invalid"
    } else if (!isInDataList(countryInput.value)) {
        countryError.textContent = "Please input a country of residence that is within the provided drop-down list";
        countryError.className = "error active"
        countryInput.className = "invalid"
    } else {
        console.log
        countryError.textContent = "";
        countryError.className= "error"
        countryInput.className = ""
    }

}

countryInput.addEventListener("input", (event) => {
    showCountryError();
    showZipCodeError();
})

const zipCodeInput = document.getElementById("zip-code")
const zipCodeError = document.getElementById("zip-code-error")

const isValidPostalCode = (postalCode, countryCode) => {
    let postalCodeRegex;
    switch (countryCode) {
        case "US":
            postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
            break;
        case "CA":
            postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
            break;
        default:
            postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    }
    return postalCodeRegex.test(postalCode);
}

const showZipCodeError = () => {
    if ((countryInput.validity.valueMissing || !isInDataList(countryInput.value)) && zipCodeInput.value) {
        zipCodeError.textContent = "Please input a valid country of residence first."
        zipCodeError.className = "error active"
        zipCodeInput.className = "invalid"
    } else if (!isValidPostalCode(zipCodeInput.value, countryInput.value)) {
        zipCodeError.textContent = "Please input a valid zip code for the selected country of residence."
        zipCodeError.className = "error active"
        zipCodeInput.className = "invalid"
    } else {
        zipCodeError.textContent = "";
        zipCodeError.className = "error"
        zipCodeInput.className = "";
    }
}

zipCodeInput.addEventListener('input', (event) => {
    showZipCodeError()
})

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

const showPasswordError = () => {
    if (!passwordInput.validity.valid) {
        passwordError.textContent = "Please provide an alphanumeric password with at least one special character, at least one uppercase, and at least one lowercase character"
        passwordError.className = "error active"
    } else {
        passwordError.textContent = "";
        passwordError.className = "error"
    }
}

passwordInput.addEventListener("input", (event) => {
    showPasswordError()
    showPasswordConfirmationError()
});

const passwordConfirmationInput = document.getElementById("password-confirmation")
const passwordConfirmationError = document.getElementById("password-confirmation-error")

const showPasswordConfirmationError = () => {
    if (passwordConfirmationInput.value != passwordInput.value) {
        passwordConfirmationError.textContent = "Please ensure passwords match"
        passwordConfirmationInput.className = "invalid"
        passwordConfirmationError.className = "error active"
    } else {
        passwordConfirmationError.textContent = ""
        passwordConfirmationError.className = "error"
        passwordConfirmationInput.className = ""
    }
}
console.log(passwordConfirmationInput);
passwordConfirmationInput.addEventListener("input", (event) => {
    showPasswordConfirmationError()
})

const isValidInputs = () => {
    return !emailInput.validity.valueMissing 
        && !emailInput.validity.typeMismatch
        && !countryInput.validity.valueMissing
        && isInDataList(countryInput.value)
        && !zipCodeInput.validity.valueMissing
        && isValidPostalCode(zipCodeInput.value, countryInput.value)
        && passwordInput.validity.valid
        && passwordConfirmationInput.value == passwordInput.value
}

const form = document.getElementById("gen-form");

form.addEventListener("submit", (event) => {
    if (!isValidInputs()) {
        event.preventDefault();
    }
})