/* ==============================-------------------- DROPDOWN TO CHOOSE ENCRYPTION ALGORITHM --------------------============================== */

function dropdown() {
    const dropdownMenu = document.querySelector('.dropdown');
    const selectBtn = document.querySelector('.dropdown__select');
    const titleSelect = document.querySelector('.dropdown__title');
    const options = document.querySelectorAll('.dropdown__option');
    const optionList = document.querySelector('.dropdown__option-list');

    selectBtn.addEventListener('click', () => {
        optionList.classList.toggle('active');
        dropdownMenu.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            let selectOption = option.querySelector('.dropdown__option-text').innerText;
            titleSelect.innerText = selectOption;
            optionList.classList.remove('active');
            dropdownMenu.classList.remove('open');
        });
    });
}

dropdown();


/* ==============================-------------------- LIMIT DYNAMIC TEXTAREA COUNTER ENCRYPT  --------------------============================== */
function characterCounter() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const charCountHighlight = document.querySelector('.encrypt__char-count--highlight');

    textArea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCountHighlight.textContent = currentLength;
    });
}

characterCounter();


/* ==============================-------------------- LIMIT DYNAMIC TEXTAREA COUNTER ENCRYPT  --------------------============================== */

function validateText() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const validationNotice = document.querySelector('.encrypt__textarea-notice');
    const regex = /^[a-z\s]*$/;
    const contentTextarea = textArea.value;

    if (contentTextarea === "") {
        validationNotice.innerHTML = "<i class='bx bxs-info-circle'></i> Solo letras minúsculas y sin acentos";
        validationNotice.style.color = "#94a4b7";
        return false;
    } else if (!regex.test(contentTextarea)) {
        validationNotice.innerHTML = "<i class='bx bxs-error-circle'></i> El texto contiene mayúsculas o caracteres especiales";
        validationNotice.style.color = "red";
        return false;
    } else {
        validationNotice.innerHTML = "<i class='bx bxs-check-circle'></i> Texto válido";
        validationNotice.style.color = "#20db93";
        return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.querySelector('.encrypt__textarea-input');
    textArea.addEventListener('input', validateText);
});


/* ==============================-------------------- PASSWORD BUTTON FUNCTION |SECTION ENCRYPT|--------------------============================== */

function generatePassword() {
    const btnPass = document.querySelector('.encrypt__button--generate-password');
    const textArea = document.querySelector('.encrypt__textarea-input');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const passwordModal = document.querySelector('.password__modal');
    const passwordElement = document.querySelector('.password__modal-pass');
    const modalTitle = document.querySelector('.password__modal-title');
    const btnCopy = document.querySelector('.password__modal-btnCopy');
    const btnClose = document.querySelector('.password__modal-btnClose');
    const inputPassword = document.querySelector('.decrypt__input-pass');
    const passwordLength = 20;

    btnPass.addEventListener('click', () => {
        if (textArea.value.trim() === '') {
            alert('Por favor, introduce texto en el campo antes de generar una contraseña.');
            return;
        }

        let password = '';
        while (password.length < passwordLength) {
            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            if (!password.includes(randomChar)) {
                password += randomChar;
            }
        }

        passwordElement.textContent = password;
        passwordModal.style.display = 'grid';
        inputPassword.disabled = false;
        inputPassword.style.border = '.1px solid #20db93';
        inputPassword.placeholder = 'Introduce la Contraseña';
        inputPassword.style.borderColor = '';

        btnCopy.addEventListener('click', () => {
            const passwordText = passwordElement.textContent;
            navigator.clipboard.writeText(passwordText).then(() => {
                modalTitle.textContent = '¡Contraseña copiada!';
            }).catch(err => {
                console.error('Error al copiar la contraseña: ', err);
            });
        });

        btnClose.addEventListener('click', () => {
            passwordModal.style.display = 'none';
            modalTitle.textContent = 'Contraseña Generada';
        });
    });
}

generatePassword();


/* ==============================-------------------- PASTE BUTTON FUNCTION |SECTION ENCRYPT|--------------------============================== */

function pasteText() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const btnPaste = document.querySelector('.encrypt__button--paste');

    btnPaste.addEventListener('click', () => {
        navigator.clipboard.readText().then((text) => {
            textArea.value = text;

            const event = new Event('input', { bubbles: true });
            textArea.dispatchEvent(event);
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    });
}

pasteText();


/* ==============================-------------------- DELETE BUTTON FUNCTION |SECTION ENCRYPT|--------------------============================== */

function deleteText() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const btnDelete = document.querySelector('.encrypt__button--delete');
    const validationNotice = document.querySelector('.encrypt__textarea-notice');
    const charCountHighlight = document.querySelector('.encrypt__char-count--highlight');

    btnDelete.addEventListener('click', () => {
        textArea.value = '';
        validationNotice.innerHTML = "<i class='bx bxs-info-circle'></i> Solo letras minúsculas y sin acentos";
        validationNotice.style.color = "#94a4b7";
        charCountHighlight.textContent = 0;
    });
}

deleteText();


/* ==============================-------------------- ENCRYPTION ALGORITHMS |SECTION ENCRYPT|--------------------============================== */

function aluraEncryptionMethod(stringEncrypt) {
    const encryptionMethod = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat"
    };

    stringEncrypt = stringEncrypt.toLowerCase();

    let encryptedText = '';
    for (let char of stringEncrypt) {
        encryptedText += encryptionMethod[char] || char;
    }

    return encryptedText;
}

function cesarEncryptionMethod(text, move) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    text = text.toLowerCase();

    let cipherText = '';

    for (let char of text) {
        if (alphabet.includes(char)) {
            let newIndex = (alphabet.indexOf(char) + move) % 26;
            cipherText += alphabet[newIndex];
        } else {
            cipherText += char;
        }
    }

    return cipherText;
}


/* ==============================-------------------- ENCRYPT BUTTON FUNCTION |SECTION ENCRYPT|--------------------============================== */

function encryptBtn() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const message = document.querySelector('.decrypt__textarea');
    const dropdownTitle = document.querySelector('.dropdown__select-title').innerText;
    const charCountHighlight = document.querySelector('.encrypt__char-count--highlight');
    const validationNotice = document.querySelector('.encrypt__textarea-notice');

    if (validateText()) {
        let encryptedText;

        if (dropdownTitle === "Alura Encrypt") {
            encryptedText = aluraEncryptionMethod(textArea.value);
        } else if (dropdownTitle === "César") {
            const shift = 3;
            encryptedText = cesarEncryptionMethod(textArea.value, shift);
        } else {
            alert("Por favor, selecciona un método de encriptación.");
            return;
        }

        message.value = encryptedText;
        message.style.backgroundImage = "none";
        textArea.value = '';
        charCountHighlight.textContent = 0;
        validationNotice.innerHTML = "<i class='bx bxs-info-circle'></i> Solo letras minúsculas y sin acentos";
        validationNotice.style.color = "#94a4b7";
    }
}

const btnEncrypt = document.querySelector('.encrypt__button--encrypt');
btnEncrypt.addEventListener('click', encryptBtn);


/* ==============================-------------------- DISABLE PASSWORD INPUT |SECTION DECRYPT|--------------------============================== */

document.addEventListener('DOMContentLoaded', () => {
    const inputPassword = document.querySelector('.decrypt__input-pass');
    inputPassword.disabled = true;
    inputPassword.style.border = 'none';
});


/* ==============================-------------------- RESET BUTTON FUNCTION |SECTION DECRYPT|--------------------============================== */

function resetText() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const message = document.querySelector('.decrypt__textarea');
    const btnReset = document.querySelector('.decrypt__button--reset');
    const validationNotice = document.querySelector('.encrypt__textarea-notice');
    const charCountHighlight = document.querySelector('.encrypt__char-count--highlight');
    const inputPassword = document.querySelector('.decrypt__input-pass');
    const dropdownTitle = document.querySelector('.dropdown__select-title');

    btnReset.addEventListener('click', () => {
        textArea.value = '';
        message.value = '';
        inputPassword.value = '';
        inputPassword.disabled = true;
        validationNotice.innerHTML = "<i class='bx bxs-info-circle'></i> Solo letras minúsculas y sin acentos";
        validationNotice.style.color = "#94a4b7";
        charCountHighlight.textContent = 0;
        dropdownTitle.innerText = 'Seleccionar una opción';
        inputPassword.placeholder = 'Contraseña';
        inputPassword.style.border = 'none';

        if (window.matchMedia("(max-width: 767px)").matches) {
            message.style.backgroundImage = "url('../assets/images/img-bg-1.png')";
        } else if (window.matchMedia("(max-width: 1024px)").matches) {
            message.style.backgroundImage = "url('../assets/images/img-bg-1.png')";
        } else {
            message.style.backgroundImage = "url('../assets/images/img-bg-2.png')";
        }

        message.addEventListener('focus', () => {
            message.style.backgroundImage = 'none';
        });

        navigator.clipboard.writeText('').then(() => {
            console.log('Portapapeles limpiado');
        }).catch(err => {
            console.error('Error al intentar limpiar el portapapeles: ', err);
        });
    });
}

resetText();


/* ==============================-------------------- COPY BUTTON FUNCTION |SECTION DECRYPT|--------------------============================== */

function copyText() {
    const message = document.querySelector('.decrypt__textarea');
    message.select();
    message.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(message.value)
        .then(() => {
        console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
        console.error('Error al copiar el texto: ', err);
        });
}

const btnCopy = document.querySelector('.decrypt__button--copy');
btnCopy.addEventListener('click', copyText);


/* ==============================-------------------- DECRYPTION ALGORITHMS |SECTION DECRYPT|--------------------============================== */

function aluraDecryptionMethod(stringDecrypt) {
    const decryptionMethod = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u"
    };

    for (let pattern in decryptionMethod) {
        if (stringDecrypt.includes(pattern)) {
            stringDecrypt = stringDecrypt.replaceAll(pattern, decryptionMethod[pattern]);
        }
    }

    return stringDecrypt;
}

function cesarDecryptionMethod(text, move) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    text = text.toLowerCase();

    let decryptedText = '';

    for (let char of text) {
        if (alphabet.includes(char)) {
            let newIndex = (alphabet.indexOf(char) - move + 26) % 26;
            decryptedText += alphabet[newIndex];
        } else {
            decryptedText += char;
        }
    }

    return decryptedText;
}


/* ==============================-------------------- DECRYPT BUTTON FUNCTION |SECTION DECRYPT|--------------------============================== */

function decryptBtn() {
    const message = document.querySelector('.decrypt__textarea');
    const dropdownTitle = document.querySelector('.dropdown__select-title').innerText;
    const inputPassword = document.querySelector('.decrypt__input-pass');

    if (!inputPassword.disabled && inputPassword.value.trim() === '') {
        inputPassword.placeholder = 'Colocar contraseña';
        inputPassword.style.borderColor = 'red';
        inputPassword.focus();
        return;
    } else {
        inputPassword.style.borderColor = '#20db93';
    }

    let decryptedText;

    if (dropdownTitle === "Alura Encrypt") {
        decryptedText = aluraDecryptionMethod(message.value);
    } else if (dropdownTitle === "César") {
        const shift = 3;
        decryptedText = cesarDecryptionMethod(message.value, shift);
    } else {
        return;
    }

    message.value = decryptedText;
}

const btnDecrypt = document.querySelector('.decrypt__button--decrypt');
btnDecrypt.addEventListener('click', decryptBtn);


/* ==============================-------------------- FOOTER --------------------============================== */

function changeFooterText() {
    const footerText = document.querySelector('.footer__text');

    if (window.matchMedia("(max-width: 460px)").matches) {
        footerText.innerText = "ONE + Alura Latam";
    } else {
        footerText.innerText = "Oracle Next Education + Alura Latam";
    }

}
changeFooterText();
