/* ==============================-------------------- HOME PAGE TITLE ANIMATION--------------------============================== */

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('hero__title-reveal');
    const fullText = 'ENCRYPTIFY';
    const characters = '!1@2#3$4%5^6&7*8(9)0_+-=[]{}|;:>' + fullText;
    const revealDuration = 600;
    const pauseDuration = 1500;
    const revealIntervalDuration = revealDuration / 8;
    const numCycles = 10;

    const currentText = Array(fullText.length).fill('');

    function revealCharacter(index, cycle = 0) {
        if (cycle < numCycles) {
            currentText[index] = generateRandomCharacter();
            textElement.textContent = currentText.join('');
            setTimeout(() => revealCharacter(index, cycle + 1), revealIntervalDuration);
        } else {
            currentText[index] = fullText[index];
            textElement.textContent = currentText.join('');
            if (index < fullText.length - 1) {
                setTimeout(() => revealCharacter(index + 1), revealDuration);
            } else {
                setTimeout(startReveal, pauseDuration);
            }
        }
    }

    function generateRandomCharacter() {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    function startReveal() {
        currentText.fill('');
        revealCharacter(0);
    }

    startReveal();
});


/* ==============================-------------------- BUTTON DARK/LIGHT MODE --------------------============================== */

document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.querySelector('.header__button');
    const switchIcon = document.querySelector('.header__button-icon');
    const logo = document.querySelector('.header__logo');
    const body = document.querySelector('body');

    switcher.addEventListener('click', () => {
        body.classList.toggle('active');

        if (body.classList.contains('active')) {
            switchIcon.classList.replace('bx-sun', 'bx-moon');
            body.style.backgroundImage = 'url(../assets/images/background-2.jpg)';
            logo.src = "../assets/images/Logo-dark.svg";

        } else {
            switchIcon.classList.replace('bx-moon', 'bx-sun');
            body.style.backgroundImage = 'url(../assets/images/background.jpg)';
            logo.src = "../assets/images/Logo-light.svg";
        }
    });
});


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
        validationNotice.innerHTML = "<i class='bx bxs-error-circle'></i> Error: tu texto contiene mayúsculas o caracteres";
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
        // Verificar si hay texto en el textarea antes de generar la contraseña
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

function vigenereEncryptionMethod(text, key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    text = text.toLowerCase().replace(/\s/g, '');
    key = key.toLowerCase().repeat(Math.ceil(text.length / key.length));

    let cipherText = '';

    for (let i = 0; i < text.length; i++) {
        if (alphabet.includes(text[i])) {
            let textIndex = alphabet.indexOf(text[i]);
            let keyIndex = alphabet.indexOf(key[i]);
            let newIndex = (textIndex + keyIndex) % 26;
            cipherText += alphabet[newIndex];
        } else {
            cipherText += text[i];
        }
    }

    return cipherText;
}


/* ==============================-------------------- ENCRYPT BUTTON FUNCTION |SECTION ENCRYPT|--------------------============================== */
function encryptBtn() {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const message = document.querySelector('.decrypt__textarea');
    const dropdownTitle = document.querySelector('.dropdown__select-title').innerText;

    if (validateText()) {
        let encryptedText;

        if (dropdownTitle === "Alura Encrypt") {
            encryptedText = aluraEncryptionMethod(textArea.value);
        } else if (dropdownTitle === "César") {
            const shift = 3;
            encryptedText = cesarEncryptionMethod(textArea.value, shift);
        } else if (dropdownTitle === "Vigenère") {
            const key = "clave";
            encryptedText = vigenereEncryptionMethod(textArea.value, key);
        } else {
            alert("Por favor, selecciona un método de encriptación.");
            return;
        }

        message.value = encryptedText;
        message.style.backgroundImage = "none";
        // textArea.value = '';
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

function vigenereDecryptionMethod(text, key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    text = text.toLowerCase().replace(/\s/g, '');
    key = key.toLowerCase().repeat(Math.ceil(text.length / key.length));

    let decryptedText = '';

    for (let i = 0; i < text.length; i++) {
        if (alphabet.includes(text[i])) {
            let textIndex = alphabet.indexOf(text[i]);
            let keyIndex = alphabet.indexOf(key[i]);
            let newIndex = (textIndex - keyIndex + 26) % 26;
            decryptedText += alphabet[newIndex];
        } else {
            decryptedText += text[i];
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
    } else if (dropdownTitle === "Vigenère") {
        const key = inputPassword.value.trim();
        decryptedText = vigenereDecryptionMethod(message.value, key);
    } else {
        return;
    }

    message.value = decryptedText;
}

const btnDecrypt = document.querySelector('.decrypt__button--decrypt');
btnDecrypt.addEventListener('click', decryptBtn);