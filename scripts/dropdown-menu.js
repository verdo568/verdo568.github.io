// 選取所有有下拉選單的元素
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');
  let clickCount = 0; // 記錄點擊次數

  // 判斷是否是手機端
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // 在手機端使用 touchstart 事件
    toggle.addEventListener('touchstart', (e) => {
      clickCount++;  // 增加點擊次數
      if (clickCount === 1) {
        const isVisible = menu.getAttribute('data-visible') === 'true';
        menu.setAttribute('data-visible', !isVisible); // 切換顯示/隱藏
        clickCount = 0;  // 重置點擊次數
      }
    });
  } else {
    // 在桌面端使用 click 事件
    toggle.addEventListener('click', (e) => {
      e.preventDefault(); // 防止連結跳轉
      const isVisible = menu.getAttribute('data-visible') === 'true';
      menu.setAttribute('data-visible', !isVisible); // 切換顯示/隱藏
    });
  }

  // 滑鼠進入時顯示下拉選單
  dropdown.addEventListener('mouseenter', () => {
    menu.setAttribute('data-visible', 'true');
  });

  // 滑鼠離開時隱藏下拉選單
  dropdown.addEventListener('mouseleave', () => {
    menu.setAttribute('data-visible', 'false');
  });
});
