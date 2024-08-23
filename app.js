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
document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.querySelector('.encrypt__textarea-input');
    const validationNotice = document.querySelector('.encrypt__textarea-notice');
    const originalNoticeText = validationNotice.innerHTML;

    textArea.addEventListener('input', validateText);

    function validateText() {
        const regex = /^[a-z0-9\s]*$/;
        const contentTextarea = textArea.value;

        if (contentTextarea === "") {
            validationNotice.innerHTML = originalNoticeText;
            validationNotice.style.color = "";
        } else if (!regex.test(contentTextarea)) {
            validationNotice.innerHTML = "<i class='bx bxs-error-circle'></i> Error: tu texto contiene mayúsculas o caracteres";
            validationNotice.style.color = "red";
        } else {
            validationNotice.innerHTML = "<i class='bx bxs-check-circle'></i> Texto válido";
            validationNotice.style.color = "#20db93";
        }
    }
});


/* ==============================-------------------- PASSWORD BUTTON FUNCTION |SECTION ENCRYPT|--------------------============================== */
function generatePassword() {
    const btnPass = document.querySelector('.encrypt__button--generate-password');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const passwordModal = document.querySelector('.password__modal');
    const passwordElement = document.querySelector('.password__modal-pass');
    const modalTitle = document.querySelector('.password__modal-title');
    const btnCopy = document.querySelector('.password__modal-btnCopy');
    const btnClose = document.querySelector('.password__modal-btnClose');
    const passwordLength = 20;

    btnPass.addEventListener('click', () => {
        let password = '';
        while (password.length < passwordLength) {
            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            if (!password.includes(randomChar)) {
                password += randomChar;
            }
        }

        passwordElement.textContent = password;
        passwordModal.style.display = 'grid';

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