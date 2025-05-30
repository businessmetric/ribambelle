function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };   

// Получаем все ссылки, которые нужно обработать
const links = document.querySelectorAll('a');
const matchedLinks = [];

links.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.includes('https://widget.servmeco.com/?oid=1574&source=venue_website')) {
    matchedLinks.push(link);
  }
});

// Обработчик для каждой ссылки
matchedLinks.forEach(link => {
  // Можно установить обработчик события 'click'
  link.addEventListener('click', function (event) {
    const veeneo_id = getCookie('veeneo_id');
    if (typeof veeneo_id !== "undefined") {

      event.preventDefault();

      // Формируем новый URL
      const newHref = `https://widget.servmeco.com/?oid=1574&source=venue_website&vid=${encodeURIComponent(veeneo_id)}`;
      window.location.href = newHref;
    }
  
  });
});
