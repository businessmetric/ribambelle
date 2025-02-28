// Этот код добавляет источник трафика в приветственное сообщение WhatsApp на странице /party.

// get_source_from_cookies() – получает источник трафика из cookie (source_medium) и преобразует его в читаемый формат (Instagram, Google, Facebook).
// create_msg_with_source() – формирует текст сообщения WhatsApp, добавляя источник трафика, если он известен.
// update_wa_text(link) – обновляет параметр text в ссылке на WhatsApp, заменяя его на сформированное сообщение.
// Автоматически выполняется при загрузке страницы, если пользователь находится на /party.

function get_source_from_cookies() {
    // Формирует код для разметки источника трафика по шаблону:
    const sources = {
        "instagram": "Instagram",
        "google": "Google",
        "facebook": "Facebook",
        "other": null,
    };

    let source_medium = getCookie_('source_medium')
    if (!source_medium) {
        return null
    };

    let medium = source_medium.split('/')[1].trim();
    if (medium != "cpc") {
        return null
    };

    let source_name = source_medium.split('/')[0].trim();
    let source = sources[source_name] || sources["other"];

    return source
};

function create_msg_with_source() {
    // Формирует текст приветственного сообщение для вацапа
    source = get_source_from_cookies()

    if (!source) {
        return "Hello, I want to book a party!"
    };

    return `Hello! I saw your ad in [${source}]. I want to book a party.`
};

function update_wa_text(link) {
    let url = new URL(link.href);
    let params = new URLSearchParams(url.search);
    let new_text = create_msg_with_source()

    if (params.has("text")) {
        params.set("text", new_text);
    } else {
        params.append("text", new_text);
    }

    link.href = url.origin + url.pathname + "?" + params.toString();
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/party") {
        document.querySelectorAll("a[href^='https://api.whatsapp.com/send/?phone=']").forEach(link => {
            update_wa_text(link)
        });
    }
});
