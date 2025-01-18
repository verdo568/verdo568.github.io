// 使用 fetch 讀取外部的 JSON 檔案
fetch('/json/announcements.json') // 請確認這裡是 JSON 文件的正確路徑
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
            copyLinkText.textContent = "複製此公告連結";
            copyLinkText.classList.add("copy-link-text");
            copyLinkText.style.color = "#BB86FC"; // 設置文字顏色
            copyLinkText.style.cursor = "pointer"; // 設置為可點擊
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
    })
    .catch(error => console.error('Error loading announcements:', error)); // 錯誤處理
