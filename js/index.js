/**
 *  数据埋点 
 *  @param type 1:落地页打开次数  2:落地页按钮点击  3:落地页下载次数，后续通过链接下载的次数
 */
function reportEvent(type) {
    const data = {
        eventId: type
    }
    const xhr = new XMLHttpRequest();
    const params = new URLSearchParams(data).toString();
    xhr.open('GET', `https://testapi.bcpoker.com/api/web/statistics/click?${params}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('事件上报成功:', xhr.responseText);
        }
    };
    xhr.send();
}

function downloadEvent(){
   reportEvent(2);
   reportEvent(3);
}

window.onload = function () {
    reportEvent(1);
}