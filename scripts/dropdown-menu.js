// 選取所有有下拉選單的元素
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  // 點擊時切換顯示/隱藏
  toggle.addEventListener('click', (e) => {
    e.preventDefault(); // 防止連結跳轉
    const isVisible = menu.getAttribute('data-visible') === 'true';
    menu.setAttribute('data-visible', !isVisible);
  });

  // 滑鼠進入時顯示下拉選單
  dropdown.addEventListener('mouseenter', () => {
    menu.setAttribute('data-visible', 'true');
  });

  // 滑鼠離開時隱藏下拉選單
  dropdown.addEventListener('mouseleave', () => {
    menu.setAttribute('data-visible', 'false');
  });
});
