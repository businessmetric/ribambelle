// Функция для получения cookie
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Функция для получения источника трафика из cookie
function getTrafficSource() {
    const sources = {
        "instagram": "Instagram",
        "google": "Google",
        "facebook": "Facebook"
    };

    const sourceMedium = getCookie('source_medium');
    if (!sourceMedium) return null;

    // Разбираем значение на составляющие
    const parts = sourceMedium.split('/');
    if (parts.length < 2) return null;

    const medium = parts[1].trim();
    const sourceName = parts[0].trim();

    // Учитываем только платный трафик (cpc)
    return medium === "cpc" ? (sources[sourceName] || null) : null;
}

// Функция формирования текста сообщения
function createWhatsAppMessage() {
    const source = getTrafficSource();
    const veeneoId = getCookie('veeneo_id');
    
    let message = "Hello! I want to book a party.";
    
    // Добавляем источник, если он есть
    if (source) {
        message = `Hello! I saw your ad in ${source}. I want to book a party.`;
    }
    
    // Добавляем OrderID, если он есть
    if (veeneoId) {
        message += ` My OrderID: [${veeneoId}]`;
    }
    
    return message;
}

// Функция обновления WhatsApp-ссылок
function updateWhatsAppLinks() {
    const waLinks = document.querySelectorAll("a[href*='whatsapp.com'], a[href*='wa.me']");
    
    if (waLinks.length === 0) {
        console.warn('No WhatsApp links found');
        return;
    }

    const message = createWhatsAppMessage();
    console.log('Generated WhatsApp message:', message);

    waLinks.forEach(link => {
        try {
            // Пропускаем уже обработанные ссылки
            if (link.dataset.waProcessed) return;
            
            const url = new URL(link.href);
            const params = new URLSearchParams(url.search);
            
            // Сохраняем оригинальный текст как начальное значение
            const originalText = params.get('text') || '';
            
            // Формируем финальный текст: оригинал + наше сообщение
            const finalText = originalText ? `${originalText}\n\n${message}` : message;
            
            // Устанавливаем новый текст
            params.set('text', finalText);
            link.href = `${url.origin}${url.pathname}?${params.toString()}`;
            
            // Помечаем ссылку как обработанную
            link.dataset.waProcessed = "true";
            
            console.log('Updated WhatsApp link:', link.href);
        } catch (e) {
            console.error('Error processing WhatsApp link:', link.href, e);
        }
    });
}

// Инициализация на всех страницах
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing WhatsApp link updates');
    
    // Проверяем наличие ключевых cookie
    console.log('Traffic source:', getTrafficSource() || 'not found');
    console.log('veeneo_id:', getCookie('veeneo_id') ? `[${getCookie('veeneo_id')}]` : 'not found');
    
    // Обновляем ссылки
    updateWhatsAppLinks();
    
    // Дополнительное обновление через 1 секунду (для динамического контента)
    setTimeout(updateWhatsAppLinks, 1000);
    
    // Мониторинг изменений DOM для динамически добавляемых ссылок
    const observer = new MutationObserver(updateWhatsAppLinks);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
