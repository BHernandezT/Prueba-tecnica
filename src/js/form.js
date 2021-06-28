const form = document.getElementById('form');
const first_name = document.getElementById('first-name');
const last_name = document.getElementById('last-name');
const email = document.getElementById('email');
const birth_date = document.getElementById('birth-date');

/**
 *  Show error message
 * @param input
 * @param message
 */
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

/**
 * Success Validation
 * @param input
 */
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/**
 * Email Validation
 * @param input
 */
function checkEmail(input) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}


/**
 * Required Validation
 * @param inputArr
 * @returns {boolean}
 */
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

/**
 * Max Length validation
 * @param input
 * @param min
 * @param max
 */
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

/**
 * Date Validation
 * @param date
 * @returns {boolean}
 */
function checkDate(date)
{
    const matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    const d = matches[2];
    const m = matches[1] - 1;
    const y = matches[3];
    const composedDate = new Date(y, m, d);

    if (composedDate.getDate() == d &&
        composedDate.getMonth() == m &&
        composedDate.getFullYear() == y){
        showSuccess(date);
    }else{
        showError(
            date,
            `${getFieldName(date)} is invalid date`
        );
    }
}

/**
 * Filed Name
 * @param input
 * @returns {string}
 */
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if(!checkRequired([first_name, last_name, email, birth_date])){
        checkLength(first_name, 3, 150);
        checkLength(last_name, 3, 150);
        checkEmail(email);
        checkDate(birth_date);
    }

});
