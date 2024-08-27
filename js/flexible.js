; (function () {
    function setRem() {
        var clientW = document.documentElement.offsetWidth;
        var fontSize = (clientW / 375) * 100
        document.documentElement.style.fontSize = fontSize + "px";
    }

    window.addEventListener('resize', setRem);
    setRem();
})();