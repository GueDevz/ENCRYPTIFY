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


/* ==============================-------------------- HOME PAGE TITLE ANIMATION--------------------============================== */

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