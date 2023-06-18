const carousel = document.querySelector("#carousel");
const cards = document.querySelectorAll("#carousel > .card");

const touchpad = document.querySelector("#touchpad");
document.querySelector("#touchpad > span").style.height = `${
  cards[0].clientHeight * cards.length
}px`;
console.log("setting height to :" + cards[0].clientHeight * cards.length);

window.addEventListener("load", (event) => {
  const scrollMax = touchpad.scrollTopMax
    ? touchpad.scrollTopMax
    : touchpad.scrollHeight - touchpad.clientHeight;
  touchpad.scrollTo(0, scrollMax);
  requestAnimationFrame(updateCarousel);
});

function updateCarousel() {
  const scrollPos = touchpad.scrollTop;
  const scrollableLength = touchpad.scrollTopMax;
  const cardHeight = cards[0].clientHeight;

  cards.forEach((card, i) => {
    const currentCardTranslate = getTranslateValues(card);
    const cardPos = cardHeight * i;

    if (scrollPos > cardPos + cardHeight * 2) {
      card.style.transform = `translate(0px,-15%) scale(0.8)`;
      card.style.opacity = "1";
    } else if (
      scrollPos > cardPos + cardHeight &&
      scrollPos <= cardPos + cardHeight * 2
    ) {
      const progress = rangeMap(
        scrollPos,
        cardPos + cardHeight * 2,
        cardPos + cardHeight,
        0,
        1
      );
      card.style.transform = `translate(0px,-${15 - 7.5 * progress}%) scale(${
        0.8 + 0.1 * progress
      })`;
      card.style.opacity = "1";
    } else if (scrollPos > cardPos && scrollPos <= cardPos + cardHeight) {
      const progress = rangeMap(scrollPos, cardPos + cardHeight, cardPos, 0, 1);
      card.style.transform = `translate(0px,-${7.5 - 7.5 * progress}%) scale(${
        0.9 + 0.1 * progress
      })`;
      card.style.opacity = "1";
    } else if (cardPos == scrollPos) {
      card.style.transform = "translate(0px,0%)";
      card.style.opacity = "1";
    } else if (scrollPos < cardPos && scrollPos >= cardPos - cardHeight) {
      const progress = rangeMap(scrollPos, cardPos, cardPos - cardHeight, 0, 1);
      card.style.transform = `translate(0px,${100 * progress}%) scale(${
        1 - 0.2 * progress
      })`;
      card.style.opacity = `${1 - progress}`;
    } else if (cardPos > scrollPos + cardHeight) {
      card.style.transform = "translate(0px,100%)";
      card.style.opacity = "0";
    }
  });
  requestAnimationFrame(updateCarousel);
}

function rangeMap(value, x1, y1, x2, y2) {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}

//https://zellwk.com/blog/css-translate-values-in-javascript/
function getTranslateValues(element) {
  const style = window.getComputedStyle(element);
  const matrix =
    style["transform"] || style.webkitTransform || style.mozTransform;

  // No transform property. Simply return 0 values.
  if (matrix === "none" || typeof matrix === "undefined") {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes("3d") ? "3d" : "2d";
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === "2d") {
    return {
      x: parseFloat(matrixValues[4]),
      y: parseFloat(matrixValues[5]),
      z: 0,
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === "3d") {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14],
    };
  }
}
