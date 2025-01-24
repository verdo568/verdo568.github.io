// 從 script 標籤的 data-json 屬性中獲取 JSON 文件地址
const scriptTag = document.querySelector('script[src="scripts/header-script.js"]');
const jsonPath = scriptTag.getAttribute('data-json');

if (jsonPath) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      const header = document.createElement('header');
      header.className = 'primary-header flex';

      // Logo
      const logoDiv = document.createElement('div');
      const logoLink = document.createElement('a');
      logoLink.href = data.logo.href;
      const logoImg = document.createElement('img');
      logoImg.src = data.logo.src;
      logoImg.alt = data.logo.alt;
      logoImg.className = 'logo';
      logoLink.appendChild(logoImg);
      logoDiv.appendChild(logoLink);
      header.appendChild(logoDiv);

      // Mobile nav toggle
      const navToggle = document.createElement('button');
      navToggle.className = 'mobile-nav-toggle';
      navToggle.setAttribute('aria-controls', data.menuToggle.ariaControls);
      const navSpan = document.createElement('span');
      navSpan.className = 'sr-only';
      navSpan.setAttribute('aria-expanded', data.menuToggle.ariaExpanded);
      navSpan.textContent = data.menuToggle.srOnlyText;
      navToggle.appendChild(navSpan);
      header.appendChild(navToggle);

      // Navigation
      const nav = document.createElement('nav');
      const ul = document.createElement('ul');
      ul.id = data.menuToggle.ariaControls;
      ul.dataset.visible = 'false';
      ul.className = 'primary-navigation underline-indicators flex';

      data.navigation.forEach(item => {
        const li = document.createElement('li');
        if (item.class) li.className = item.class;

        // Handle dropdown menu
        if (item.dropdown) {
          li.className = 'dropdown';
          const a = document.createElement('a');
          a.className = 'ff-sans-cond uppercase text-white letter-spacing-2 dropdown-toggle';
          a.innerHTML = `<span aria-hidden="true">${item.ariaHidden}</span>${item.text}`;
          li.appendChild(a);

          const dropdownMenu = document.createElement('ul');
          dropdownMenu.className = 'dropdown-menu';
          dropdownMenu.dataset.visible = 'false';

          item.items.forEach(subItem => {
            const subLi = document.createElement('li');
            const subA = document.createElement('a');
            subA.textContent = subItem.text;
            subA.href = subItem.href;
            if (subItem.target) subA.target = subItem.target;
            if (subItem.rel) subA.rel = subItem.rel;
            subLi.appendChild(subA);
            dropdownMenu.appendChild(subLi);
          });

          li.appendChild(dropdownMenu);
        } else {
          const a = document.createElement('a');
          a.className = 'ff-sans-cond uppercase text-white letter-spacing-2';
          a.href = item.href;
          a.innerHTML = `<span aria-hidden="true">${item.ariaHidden}</span>${item.text}`;
          if (item.target) a.target = item.target;
          li.appendChild(a);
        }

        ul.appendChild(li);
      });

      nav.appendChild(ul);
      header.appendChild(nav);

      document.body.prepend(header);

      // Handle dropdown functionality
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

      // 移動端的導覽菜單切換邏輯
      const navToggleButton = document.querySelector('.mobile-nav-toggle');
      const mobileNav = document.querySelector('.primary-navigation');

      mobileNav.dataset.visible = 'false';

      navToggleButton.addEventListener('click', changeVisibility);

      function changeVisibility() {
        const visibility = mobileNav.getAttribute('data-visible');
        if (visibility === 'false') {
          mobileNav.dataset.visible = 'true';
          navToggleButton.setAttribute('aria-expanded', true);
        } else {
          mobileNav.dataset.visible = 'false';
          navToggleButton.setAttribute('aria-expanded', false);
        }
      }
    })
    .catch(error => console.error('Error loading header data:', error));
} else {
  console.error('JSON path not provided!');
}
