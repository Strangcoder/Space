const triggers = document.getElementById("triggerImage");
const boxs = document.getElementById("transform_platform");
let visibles = false;

triggers.addEventListener("click", function () {
  boxs.classList.remove("animate", "animate_back");

  // Перезапуск анимации
  void boxs.offsetWidth;

  if (!visibles) {
    boxs.classList.add("animate");
  } else {
    boxs.classList.add("animate_back");
  }

  visibles = !visibles;
});