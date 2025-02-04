document.addEventListener("keydown", function (event) {
    if (
        event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
        (event.ctrlKey && event.key === "U")
    ) {
    }
});
