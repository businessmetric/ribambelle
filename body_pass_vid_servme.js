
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
                // изменяем href сразу при загрузке
                link.setAttribute('href', newUrl);
            } else {
                console.log('Кука veeneo_id не найдена.');
            }
        }
    });
});



