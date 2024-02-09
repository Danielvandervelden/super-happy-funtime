const img1URL = "https://emoji.slack-edge.com/T028LR0EWCS/kek/af5511f0b05a8a4b.jpg";
const img2URL = "https://emoji.slack-edge.com/T028LR0EWCS/mufasa/69041d6a7cd200d4.gif";

const img1HTML = `<img id="img1" class="dynamic-img" src="${img1URL}" alt="Img1" style="width: 50px; height: 50px; display: none;"/>`;
const img2HTML = `<img id="img2" class="dynamic-img" src="${img2URL}" alt="Img2" style="width: 50px; height: 50px; display: none;"/>`;

const styles = `
    .dynamic-img {
        position: fixed;
        z-index: 999999;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

let screensaverActive = false;
let screensaverTimer;

function createImageElement(htmlStr) {
    const div = document.createElement('div');
    div.innerHTML = htmlStr.trim();
    return div.firstChild; 
}

const img1 = createImageElement(img1HTML);
const img2 = createImageElement(img2HTML);

function bounceAnimation(img, velocityX, velocityY) {
    let posX = 0, posY = 0;
    img.style.display = 'block';

    function update() {
        if (!screensaverActive) {
            img.remove();
            return;
        }

        posX += velocityX;
        posY += velocityY;

        if (posX + img.width > window.innerWidth || posX < 0) {
            velocityX *= -1;
        }

        if (posY + img.height > window.innerHeight || posY < 0) {
            velocityY *= -1;
        }

        img.style.left = posX + 'px';
        img.style.top = posY + 'px';

        requestAnimationFrame(update);
    }

    update();
}

function startScreensaver() {
    screensaverActive = true;
    document.body.appendChild(img1);
    document.body.appendChild(img2);
    bounceAnimation(img1, 2, 3);
    bounceAnimation(img2, 3, 2);
}

function stopScreensaver() {
    screensaverActive = false;
}

function resetScreensaverTimer() {
    clearTimeout(screensaverTimer);
    screensaverTimer = setTimeout(startScreensaver, 60000); // 60 seconds
    if (screensaverActive) {
        stopScreensaver();
    }
}

['mousemove', 'click', 'keypress'].forEach(event => {
    window.addEventListener(event, resetScreensaverTimer);
});

resetScreensaverTimer();
