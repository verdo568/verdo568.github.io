const announcementsPerPage = 10; // 每頁顯示 10 個公告

// 使用 fetch 讀取外部的 JSON 檔案
fetch('/json/announcements.json')  // 請確保這是 JSON 文件的正確路徑
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .then(announcementsData => {
        const container = document.getElementById("announcement-container");

        if (announcementsData.announcements.length === 0) {
            container.innerHTML = "<p>No announcements available.</p>";
            return;
        }

        const totalAnnouncements = announcementsData.announcements.length;
        const totalPages = Math.ceil(totalAnnouncements / announcementsPerPage); // 計算總頁數

        let currentPage = parseInt(window.location.hash.replace('#', '')) || 1; // 默認為頁碼 1

        // 計算目標公告所在的頁碼
        const targetAnnouncementId = window.location.hash.substring(1);
        let targetPage = currentPage;

        if (targetAnnouncementId) {
            const targetAnnouncementIndex = announcementsData.announcements.findIndex(a => a.id === targetAnnouncementId);
            if (targetAnnouncementIndex !== -1) {
                targetPage = Math.floor(targetAnnouncementIndex / announcementsPerPage) + 1;
            }
        }

        // 渲染頁面
        function renderPage(page) {
            const startIndex = (page - 1) * announcementsPerPage;
            const endIndex = Math.min(page * announcementsPerPage, totalAnnouncements);
            const pageAnnouncements = announcementsData.announcements.slice(startIndex, endIndex);

            // 清空容器
            container.innerHTML = '';

            // 顯示公告
            pageAnnouncements.forEach(announcement => {
                const announcementDiv = document.createElement("div");
                announcementDiv.classList.add("announcement-container");
                announcementDiv.id = announcement.id; // 設置公告 ID

                const header = document.createElement("div");
                header.classList.add("announcement-header");
                header.innerHTML = announcement.header;

                const body = document.createElement("div");
                body.classList.add("announcement-body");
                body.innerHTML = announcement.body;

                const footer = document.createElement("div");
                footer.classList.add("announcement-footer");

                // 複製公告連結功能
                const link = `${window.location.origin}${window.location.pathname}#${announcement.id}`;
                const copyLinkText = document.createElement("span");
                copyLinkText.textContent = "複製公告連結";
                copyLinkText.classList.add("copy-link-text");
                copyLinkText.style.color = "#BB86FC"; // 設置文字顏色
                copyLinkText.style.cursor = "pointer"; // 設置為可點擊

                // 點擊複製並跳轉到對應的公告
                copyLinkText.addEventListener("click", () => {
                    navigator.clipboard.writeText(link)
                        .then(() => alert("公告連結已複製到剪貼簿！"))
                        .catch(err => console.error("複製連結失敗：", err));
                });

                footer.innerHTML = announcement.footer;
                footer.appendChild(copyLinkText); // 新增複製文字

                announcementDiv.appendChild(header);
                announcementDiv.appendChild(body);
                announcementDiv.appendChild(footer);

                container.appendChild(announcementDiv);
            });

            // 根據 hash 滾動到指定的公告
            const hash = window.location.hash.substring(1); // 獲取 hash（不包含 #）
            if (hash) {
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

                    // 啟動閃爍效果
                    targetElement.classList.add("highlight");
                    setTimeout(() => {
                        targetElement.classList.remove("highlight");
                    }, 850); // 閃爍 3 秒後移除效果
                }
            }
        }

        // 渲染當前頁
        renderPage(targetPage);

        // 處理頁碼
        function renderPagination() {
            const pagination = document.getElementById("pagination");
            pagination.innerHTML = '';  // 清空現有的頁碼

            for (let i = 1; i <= totalPages; i++) {
                const pageLink = document.createElement("a");
                pageLink.href = `#${i}`;  // 使用 hash 設置頁碼
                pageLink.textContent = i;
                pageLink.classList.add("pagination-link");

                // 如果是當前頁，設置為活躍狀態
                if (i === targetPage) {
                    pageLink.classList.add("active");
                }

                pageLink.addEventListener("click", function(e) {
                    e.preventDefault();
                    targetPage = i;
                    window.location.hash = `#${i}`;
                    renderPage(targetPage);
                    renderPagination();

                    // 滾動到頁面最上方
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });

                pagination.appendChild(pageLink);
            }
        }

        // 渲染分頁
        renderPagination();

    })
    .catch(error => console.error('Error loading announcements:', error)); // 錯誤處理
