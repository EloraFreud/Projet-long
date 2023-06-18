const carousel = document.querySelector("#carousel");
        const cards = document.querySelectorAll("#carousel > .card");
        let activeIndex = cards.length - 1;
        updateCards();
        let drag = false;
  
        cards.forEach((card, i) => {
          card.addEventListener("  ", () => {
            drag = card.classList.contains("active");
          });
  
          document.addEventListener("mousemove", (ev) => {
            if (!drag || i != activeIndex) {
              return;
            }
  
            const defaultTransition = card.style.transition;
            card.style.transition = "none";
  
            const currentTransform = getTranslateValues(card);
            card.style.transform = `translate(${currentTransform.x}, ${
              currentTransform.y + ev.movementY
            }px)`;
  
            card.style.transition = defaultTransition;
          });
        });
  
        document.addEventListener("mouseup", () => {
          drag = false;
  
          const activeCard = document.querySelector("#carousel > .card.active");
          const transform = getTranslateValues(activeCard);
  
          if (transform.y < -15) {
            activeIndex += 1;
          } else if (transform.y > 15) {
            activeIndex -= 1;
          }
  
          updateCards();
        });
  
        function updateCards() {
          console.log(activeIndex);
  
          if (activeIndex < 0) {
            activeIndex = cards.length - 1;
          } else if (activeIndex >= cards.length) {
            activeIndex = 0;
          }
  
          console.log(activeIndex);
  
          cards.forEach((card, i) => {
            card.classList.remove("active");
  
            const BASE_Z_INDEX = 100;
  
            if (i == activeIndex - 1) {
              card.style.transform = "translate(0, -15%) scale(0.9)";
              card.style.opacity = "1";
              card.style["z-index"] = BASE_Z_INDEX - 1;
            } else if (i == activeIndex) {
              card.classList.add("active");
              card.style.transform = "translate(0, 0) scale(1)";
              card.style.opacity = "1";
              card.style["z-index"] = BASE_Z_INDEX;
            } else if (i == activeIndex + 1) {
              card.style.transform = "translate(0, 115%) scale(0.9)";
              card.style.opacity = "0";
              card.style["z-index"] = BASE_Z_INDEX + 1;
            } else {
              card.style.transform = "translate(0, -30%) scale(0.8)";
              card.style.opacity = "1";
              card.style["z-index"] = BASE_Z_INDEX - 2;
            }
          });
        }
  
        document.addEventListener("keypress", (ev) => {
          console.log(activeIndex);
  
          if (ev.keyCode == 117) {
            activeIndex += 1;
            updateCards();
          }
  
          if (ev.keyCode == 101) {
            activeIndex -= 1;
            updateCards();
          }
        });
  
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