function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}$$$$$$$$\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Обрабатываем все ссылки, которые нужно изменить
const links = document.querySelectorAll('a');

links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('widget.servmeco.com')) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // отменяем стандартное поведение ссылки

            const veeneo_id = getCookie('veeneo_id');
            if (typeof veeneo_id !== "undefined") {
                const newUrl = `https://widget.servmeco.com/?oid=1574&source=venue_website&vid=${encodeURIComponent(veeneo_id)}`;
                // открываем в новой вкладке
                window.open(newUrl, '_blank');
                 link.removeAttribute('href');
            } else {                console.log('Кука veeneo_id не найдена.');
            }
        });
    }
});
