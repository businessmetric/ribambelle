(function() {
  // Настройки (можно менять)
  var cookieName = 'gclid';
  var expiryDays = 90;
  
  // Функция для установки cookie
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
  }
  
  // Получаем gclid из URL
  var urlParams = new URLSearchParams(window.location.search);
  var gclid = urlParams.get('gclid');
  
  // Если gclid найден и еще не сохранен в cookie
  if (gclid && !document.cookie.includes(cookieName + '=' + gclid)) {
    setCookie(cookieName, gclid, expiryDays);
    
    // Отправляем данные в dataLayer (опционально)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'gclid_captured',
      'gclid': gclid
    });
    
    // Логирование для debug (можно удалить)
    console.log('GCLID captured and saved:', gclid);
  }
})();
