/**
 * Генерирует случайный ID из 7 символов (буквы и цифры)
 * @param {number} length - Длина ID (по умолчанию 7)
 * @returns {string} Сгенерированный ID
 */
function generateRandomId(length = 7) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result;
    
    do {
        result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (!/[0-9]/.test(result) || !/[A-Z]/.test(result));
    
    return result;
}

/**
 * Устанавливает куки с указанным именем, значением и сроком жизни
 * @param {string} name - Имя куки
 * @param {string} value - Значение куки
 * @param {number} days - Срок жизни в днях
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

/**
 * Получает значение куки по имени
 * @param {string} name - Имя куки
 * @returns {string|null} Значение куки или null если не найдено
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

/**
 * Получает или создает veeneo_id с сохранением в куки
 * @returns {string} Уникальный veeneo_id
 */
function getOrCreateVeeneoId() {
    const COOKIE_NAME = 'veeneo_id';
    const EXPIRY_DAYS = 1; // Срок жизни 1 день
    
    // Пробуем получить veeneo_id из куки
    let veeneoId = getCookie(COOKIE_NAME);
    
    // Если veeneo_id нет - генерируем новый
    if (!veeneoId) {
        veeneoId = generateRandomId();
        setCookie(COOKIE_NAME, veeneoId, EXPIRY_DAYS);
    }
    
    return veeneoId;
}

// Автоматически выполняем при загрузке страницы
(function() {
    // Получаем или создаем veeneo_id
    const veeneoId = getOrCreateVeeneoId();
    
    // Делаем veeneo_id доступным в глобальной области видимости
    window.veeneoId = veeneoId;
    
    // Для отладки - выводим в консоль
    console.log('Veeneo ID:', veeneoId);
})();
