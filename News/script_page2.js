document.querySelectorAll(".arrow").forEach((trigger, index) => {
  const box = document.querySelectorAll(".block_info")[index];
  const text = box.querySelector(".txt_planet");
  const img = trigger.querySelector("img");
  const originalSrc = "../image/arrow.png";
  const newSrc = "../image/arrow_back.png";
  let visible = false;

  trigger.addEventListener("click", function () {
    box.classList.remove("animate_planet", "animate_back_planet");

    // Перезапуск анимации
    void box.offsetWidth;

    if (!visible) {
      box.classList.add("animate_planet");
      setTimeout(() => {
        text.style.display = "block";
      }, 100);
    } else {
      box.classList.add("animate_back_planet");
      setTimeout(() => {
        text.style.display = "none";
      }, 100); // Поставь 500, если нужно синхронизировать с анимацией
    }

    // Переключение изображения стрелки
    const current = img.getAttribute("src");
    img.setAttribute("src", current === originalSrc ? newSrc : originalSrc);

    visible = !visible;
  });
});

