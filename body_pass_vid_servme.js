console.log('start')
document.addEventListener('DOMContentLoaded', function() {
 console.log('start')  
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
                // Проверяем, есть ли уже параметры в URL
                const separator = href.includes('?') ? '&' : '?';
                const newUrl = `${href}${separator}vid=${encodeURIComponent(veeneo_id)}`;
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



