// 使用 fetch 讀取外部的 JSON 檔案
fetch('/json/announcements.json') // 確保這是 JSON 文件的正確路徑
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

        announcementsData.announcements.forEach(announcement => {
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

        // 加載完成後，根據 hash 滾動到對應公告並閃爍
        const hash = window.location.hash.substring(1); // 獲取 hash（不包含 #）
        if (hash) {
            const targetElement = document.getElementById(hash);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

                // 啟動閃爍效果
                targetElement.classList.add("highlight");
                setTimeout(() => {
                    targetElement.classList.remove("highlight");
                }, 1000); // 閃爍3秒後移除效果
            }
        }
    })
    .catch(error => console.error('Error loading announcements:', error)); // 錯誤處理
