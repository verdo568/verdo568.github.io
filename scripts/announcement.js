      // 使用 fetch 讀取外部的 JSON 檔案
      fetch('announcements.json')  // 假設 announcements.json 檔案在同一資料夾中
          .then(response => response.json())  // 將回應轉換為 JSON 物件
          .then(announcementsData => {
              const container = document.getElementById("announcement-container");

              // 針對每一個公告生成 HTML
              announcementsData.announcements.forEach(announcement => {
                  const announcementDiv = document.createElement("div");
                  announcementDiv.classList.add("announcement-container");

                  const header = document.createElement("div");
                  header.classList.add("announcement-header");
                  header.innerHTML = announcement.header;

                  const body = document.createElement("div");
                  body.classList.add("announcement-body");
                  body.innerHTML = announcement.body;

                  const footer = document.createElement("div");
                  footer.classList.add("announcement-footer");
                  footer.innerHTML = announcement.footer;

                  // 將 header、body、footer 加入到公告容器中
                  announcementDiv.appendChild(header);
                  announcementDiv.appendChild(body);
                  announcementDiv.appendChild(footer);

                  container.appendChild(announcementDiv);  // 加入公告到頁面
              });
          })
          .catch(error => console.error('Error loading announcements:', error));  // 錯誤處理