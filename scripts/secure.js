  // 禁止右鍵
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 禁止按鍵組合（如Ctrl+C、Ctrl+U等）
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 'a')) {
        e.preventDefault();
    }
});

// 禁止 iOS 和 Android 的長按操作
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// 禁止選擇和複製功能的手勢
document.addEventListener('copy', function(e) {
    e.preventDefault();
});