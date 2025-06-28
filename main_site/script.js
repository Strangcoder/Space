const trigger = document.getElementById("triggerImage");
const box = document.getElementById("transform_platform");
const box1 = document.getElementById("slider");
let visible = false;

trigger.addEventListener("click", function () {
  box.classList.remove("animate", "animate_back");
  box1.classList.remove("animate", "animate_back");

  // Перезапуск анимации
  void box.offsetWidth;

  if (!visible) {
    box.classList.add("animate");
    box1.classList.remove("animate", "animate_back");
  } else {
    box.classList.add("animate_back");
    box1.classList.remove("animate", "animate_back");
  }

  visible = !visible;
});

