fetch('https://verdo568.github.io/en_json/collaboration.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('collaboration-container');
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');

        data.collaborations.forEach(item => {
          // 創建合作夥伴的 HTML 結構
          const collaborationDiv = document.createElement('div');
          collaborationDiv.classList.add('container');

          const imageSection = document.createElement('div');
          imageSection.classList.add('image-section');

          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.alt;
          img.style.cursor = 'pointer'; // 指標變成手型
          img.addEventListener('click', () => {
            // 點擊圖片時顯示模態框
            modal.style.display = 'block';
            modalImage.src = item.image;
          });
          imageSection.appendChild(img);

          const textSection = document.createElement('div');
          textSection.classList.add('text-section');

          const name = document.createElement('h2');
          name.textContent = item.name;

          const status = document.createElement('p');
          status.innerHTML = `狀態：<span style="color: ${item.statusColor};">${item.status}</span>`;

          textSection.appendChild(name);
          textSection.appendChild(status);

          // 將圖片和文字加入容器
          collaborationDiv.appendChild(imageSection);
          collaborationDiv.appendChild(textSection);

          // 將合作夥伴容器加入主容器
          container.appendChild(collaborationDiv);
        });

        // 點擊模態框關閉
        modal.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      })
      .catch(error => console.error('Error loading collaborations:', error));