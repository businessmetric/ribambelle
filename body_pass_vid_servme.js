document.addEventListener('DOMContentLoaded', function() {
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\\\+\^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('widget.servmeco.com')) {
            const veeneo_id = getCookie('veeneo_id');
            if (typeof veeneo_id !== "undefined") {
                const newUrl = `https://widget.servmeco.com/?oid=1574&source=venue_website&vid=${encodeURIComponent(veeneo_id)}`;
                // изменяем href
                link.setAttribute('href', newUrl);
                // добавляем атрибут target="_blank" для открытия в новой вкладке
                link.setAttribute('target', '_blank');
            } else {
                console.log('Кука veeneo_id не найдена.');
            }
        }
    });
});




