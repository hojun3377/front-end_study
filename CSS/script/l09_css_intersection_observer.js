const observeTest = document.getElementById("observeTest");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((item, i) => {
    // item.target(타겟 요소)이 보여질 때, 요소 출력
    if(item.isIntersecting) {
      item.target.style.backgroundColor = "red";
    }
  });
}, {threshold:1});
observer.observe(observeTest);
