let icons = document.querySelectorAll(".ico");
let length = icons.length;

icons.forEach((item, index) => {
  item.addEventListener("mouseover", (e) => {
    focus(e.target, index);
  });
  item.addEventListener("mouseleave", () => {
    resetTransform();
  });
  item.addEventListener("click", (e) => {
    addSpecialEffectToNextLi(index);
  });
});

const resetTransform = () => {
  icons.forEach((item) => {
    item.style.transform = "scale(1)  translateY(0px)";
  });
};

const focus = (elem, index) => {
  let previous = index - 1;
  let next = index + 1;

  if (previous == -1) {
    elem.style.transform = "scale(1.5)  translateY(-10px)";
  } else if (next == icons.length) {
    elem.style.transform = "scale(1.5)  translateY(-10px)";
  } else {
    elem.style.transform = "scale(1.5)  translateY(-10px)";
    icons[previous].style.transform = "scale(1.2) translateY(-6px)";
    icons[next].style.transform = "scale(1.2) translateY(-6px)";
  }
};

const addSpecialEffectToNextLi = (index) => {
  let nextLiIndex = index + 1;
  if (nextLiIndex < icons.length) {
    let nextLi = icons[nextLiIndex].parentElement; // Assuming the parent of the icon is the li
    nextLi.classList.add("special-effect"); // Add your special effect class
  }
};
