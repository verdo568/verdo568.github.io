fetch('../json/collaboration.json') // 假設 JSON 檔案和 HTML 位於同一目錄
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('collaboration-container');

        data.collaborations.forEach(item => {
          // 建立合作夥伴的 HTML 結構
          const collaborationDiv = document.createElement('div');
          collaborationDiv.classList.add('container');

          const imageSection = document.createElement('div');
          imageSection.classList.add('image-section');

          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.alt;
          imageSection.appendChild(img);

          const textSection = document.createElement('div');
          textSection.classList.add('text-section');

          const name = document.createElement('h2');
          name.textContent = item.name;

          const status = document.createElement('p');
          status.innerHTML = `狀態：<span style="color: ${item.statusColor};">${item.status}</span>`;

          textSection.appendChild(name);
          textSection.appendChild(status);

          // 將圖片區塊和文字區塊加入到容器中
          collaborationDiv.appendChild(imageSection);
          collaborationDiv.appendChild(textSection);

          // 將合作夥伴容器加入到主容器中
          container.appendChild(collaborationDiv);
        });
      })
      .catch(error => console.error('Error loading collaborations:', error));