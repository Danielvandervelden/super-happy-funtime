console.log(
    "Hi guys, hopefully you don't mind me leaving a little something for you in DEVELOPMENT mode :)"
);

const kekw = "https://emoji.slack-edge.com/T028LR0EWCS/kek/af5511f0b05a8a4b.jpg";
const mufasa = "https://emoji.slack-edge.com/T028LR0EWCS/mufasa/69041d6a7cd200d4.gif";

const kekwImg = `<img id="kekw" class="super-happy-funtime" src="${kekw}" alt="KEKW" style="width: 50px; height: 50px;"/>`;
const mufasaImg = `<img id="mufasa" class="super-happy-funtime" src="${mufasa}" alt="Mufasa" style="width: 50px; height: 50px;"/>`;

const styles = `
  .super-happy-funtime {
      position: fixed;
      z-index: 999999;
  }
`;

// Append styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Append images to the document body
document.body.innerHTML += kekwImg + mufasaImg;

function bounceAnimation(elementId, velocityX, velocityY) {
    const img = document.getElementById(elementId);
    let posX = 0,
        posY = 0;

    function update() {
        posX += velocityX;
        posY += velocityY;

        // Check for right or left wall collision
        if (posX + img.width > window.innerWidth || posX < 0) {
            velocityX *= -1;
        }

        // Check for top or bottom wall collision
        if (posY + img.height > window.innerHeight || posY < 0) {
            velocityY *= -1;
        }

        img.style.left = posX + "px";
        img.style.top = posY + "px";

        requestAnimationFrame(update);
    }

    update();
}

// Start bouncing animations with different velocities
bounceAnimation("kekw", 2, 3);
bounceAnimation("mufasa", 3, 2);
