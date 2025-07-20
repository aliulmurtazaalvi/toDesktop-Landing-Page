const navDialog = document.getElementById("nav-dialog");
function handleMenu() {
  navDialog.classList.toggle("hidden");
}

const line1 = document.getElementById("line-1");
const line2 = document.getElementById("line-2");
const line3 = document.getElementById("line-3");
const line4 = document.getElementById("line-4");
const initialTranslateLTR = -48 * 4;
const initialTranslateRTL = 36 * 4;

function setupIntersectionObserver(element, isLTR, speed) {
  const intersectionCallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting;
    console.log(element, isIntersecting);

    if (isIntersecting) {
      document.addEventListener("scroll", scrollHandler);
    } else {
      document.removeEventListener("scroll", scrollHandler);
    }
  };

  const intersectionObserver = new IntersectionObserver(intersectionCallback);
  intersectionObserver.observe(element);

  function scrollHandler() {
    const translateX =
      (window.innerHeight - element.getBoundingClientRect().top) * speed;
    let totalTranslate = 0;
    if (isLTR) {
      totalTranslate = translateX + initialTranslateLTR;
    } else {
      totalTranslate = -(translateX + initialTranslateRTL);
    }

    element.style.transform = `translateX(${totalTranslate}px)`;
  }
}

setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15);
setupIntersectionObserver(line3, true, 0.15);
setupIntersectionObserver(line4, true, 0.5);

document.querySelectorAll("dt").forEach((dt) => {
  dt.addEventListener("click", () => {
    const dd = document.getElementById(dt.getAttribute("aria-controls"));
    const icon = dt.querySelector("i");
    if (dd) {
      dd.classList.toggle("hidden");
      dt.setAttribute("aria-expanded", !dd.classList.contains("hidden"));
    }
    if (icon) {
      icon.classList.toggle("rotate-180");
      icon.classList.toggle("-rotate-180");
    }
  });
});
