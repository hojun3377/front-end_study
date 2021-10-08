window.onload=function() {
  const dropdownArr = document.querySelectorAll(".dropdown-active .link");

  // 요소 노드만 선택
  // node.nextSibling: 인접(after) 형제 선택자
  // node.previousSibling: 인접(before) 형제 선택자
  // node.firstElementChild: 첫번째 자식 선택자
  // node.lastElementChild: 마지막 자식 선택자
  // node.children: 모든 자식 선택자
  // node.parentNode: 부모 선택자

  // 비요소 노드도 선택
  // node.firstChild: 첫번째 자식 선택자
  // node.lastChild: 마지막 자식 선택자
  // node.childNodes: 모든 자식 선택자

  dropdownArr.forEach(el => {
    el.addEventListener("click", function(e) {
      const menu = e.target.nextSibling;
      
      el.classList.toggle("active");
      menu.classList.toggle("active");
    });
  });
}