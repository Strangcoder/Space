const trigger = document.getElementById("triggerImage");
const box = document.getElementById("transform_platform");
let visible = false;

trigger.addEventListener("click", function () {
  box.classList.remove("animate", "animate_back");

  // Перезапуск анимации
  void box.offsetWidth;

  if (!visible) {
    box.classList.add("animate");
    document.querySelector('.txt_planet').style.display = 'block'
    document.querySelector('.box_image').style.display = 'flex'

  } else {
    box.classList.add("animate_back");
    setTimeout(() => {
     document.querySelector('.txt_planet').style.display = 'none';
    }, 750); // 500 — длительность анимации animate_back
  }
    

  visible = !visible;
});

const img = document.querySelector('#triggerImage img');
const originalSrc = '/image/arrow.png';
const newSrc = '/image/arrow_back.png';

document.querySelector('#triggerImage').addEventListener('click', () => {
  const current = img.getAttribute('src');
  if (current === originalSrc) {
  img.setAttribute('src', newSrc);
} else {
  img.setAttribute('src', originalSrc);
}
});
