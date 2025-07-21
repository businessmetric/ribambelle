
// Конфиг для логирования
const DEBUG_CONFIG = {
    enableDebug: true // переключатель логов
};

function logDebug(...args) {
    if (DEBUG_CONFIG.enableDebug) {
        console.log('[DEBUG]', ...args);
    }
}

const thisHostname = document.location.hostname;
const cookieExpiration = new Date(+new Date() + 1000 * 60 * 60 * 24 * 30 * 24);
const thisDomain = getDomain_(thisHostname);

function ownDomainFunc(domain_from_referer) {
    var ownDomainArr = [
        'passwork.pro',
        'passwork.com',
        'passwork.ru'
    ];
    const isOwn = ownDomainArr.indexOf(domain_from_referer) > -1;
    logDebug('ownDomainFunc:', domain_from_referer, '=>', isOwn);
    return isOwn;
}

function getDomain_(url) {
    if (!url) return;
    var a = document.createElement('a');
    a.href = url;
    try {
        const domain = a.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/)[0];
        logDebug('getDomain_:', url, '=>', domain);
        return domain;
    } catch (squelch) {
        logDebug('getDomain_ error:', url, squelch);
    }
}

function mapUtmSourceMedium(source, medium) {
    // Можно расширить конфиг для маппинга
    const mapping = {
        'google': {
            'organic': 'google / organic',
            'cpc': 'google / cpc',
        },
        'yandex': {
            'organic': 'yandex / organic',
            'cpc': 'yandex / cpc',
        },
        'bing': {
            'organic': 'bing / organic',
            'cpc': 'bing / cpc',
        }
    };
    const result = (mapping[source] && mapping[source][medium]) ? mapping[source][medium] : source + ' / ' + medium;
    logDebug('mapUtmSourceMedium:', source, medium, '=>', result);
    return result;
}
function writeCookie_(name, value, expiration, path, domain) {
    var str = name + '=' + value + ';';
    if (expiration) str += 'Expires=' + expiration.toUTCString() + ';';
    if (path) str += 'Path=' + path + ';';
    if (domain) str += 'Domain=' + domain + ';';
    logDebug('writeCookie_:', str);
    document.cookie = str;
}

        function getCookie_(name) {
    // Логика установки прочих кук!
    logDebug('getCookie_ called:', name);
    let domainFromReferer = '';
    let domainFromRefererMatch = referer ? referer.match(/:\/\/(.[^/]+)/) : null;
    if (domainFromRefererMatch) {
        domainFromReferer = domainFromRefererMatch[1];
    }
    logDebug('referer:', referer, 'ownDomain:', ownDomain, 'utmSourceParam:', utmSourceParam);
    if (referer && ownDomain === false && (referer.includes('ya.ru') || referer.includes('yandex') || referer.includes('google') || referer.includes('bing')) && !utmSourceParam) {
        let search = 'yandex';
        if (referer.includes('google')) {
            search = 'google';
        } else if (referer.includes('bing')) {
            search = 'bing';
        }
        logDebug('Organic search detected:', search);
        if (!getCookie_('first_utm_source')) {
            setCookie('first_utm_source', search, 365);
        }
        if (!getCookie_('first_utm_medium')) {
            setCookie('first_utm_medium', 'organic', 365);
        }
        if (!getCookie_('first_utm_campaign')) {
            setCookie('first_utm_campaign', '(not set)', 365);
        }
        setCookie('source_medium', mapUtmSourceMedium(search, 'organic'), 365);
        if (!getCookie_('first_source_medium')) {
            setCookie('first_source_medium', mapUtmSourceMedium(search, 'organic'), 365);
        }
        setCookie('search', search, 365);
        setCookie('utm_source', search, 365);
        setCookie('utm_medium', 'organic', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
    } else if (referer && ownDomain === false && !referer.includes('ya.ru') && !referer.includes('yandex') && !referer.includes('google') && !utmSourceParam) {
        const rkName = domainFromReferer + ' / referrer';
        logDebug('Referral detected:', domainFromReferer);
        if (!getCookie_('first_utm_source')) {
            setCookie('first_utm_source', domainFromReferer, 365);
        }
        if (!getCookie_('first_utm_medium')) {
            setCookie('first_utm_medium', '(not set)', 365);
        }
        if (!getCookie_('first_utm_campaign')) {
            setCookie('first_utm_campaign', '(not set)', 365);
        }
        setCookie('source_medium', mapUtmSourceMedium(domainFromReferer, 'referrer'), 365);
        if (!getCookie_('first_source_medium')) {
            setCookie('first_source_medium', mapUtmSourceMedium(domainFromReferer, 'referrer'), 365);
        }
        setCookie('search', '(not set)', 365);
        setCookie('utm_source', domainFromReferer, 365);
        setCookie('utm_medium', '(not set)', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
    } else if (utmSourceParam) {
        logDebug('UTM detected:', utm_source_param, utm_med_param, utm_camp_param);
        try {
            return a.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/)[0];
        } catch (squelch) {}
    }

 const referer = document.referrer;

 var ownDomain = false
if (referer) {
    let domainFromRefererMatch = referer.match(/:\/\/(.[^/]+)/);
    let domainFromReferer = domainFromRefererMatch ? domainFromRefererMatch[1] : '';
    ownDomain = ownDomainFunc(domainFromReferer);
}
console.log('ownDomain: ' + ownDomain)
function firstSource() {
    function _extends() {
        _extends = Object.assign
            ? Object.assign.bind()
            : function (target) {
                  for (var i = 1; i < arguments.length; i++) {
                      var source = arguments[i];
                      for (var key in source) {
                          if (Object.prototype.hasOwnProperty.call(source, key)) {
                              target[key] = source[key];
                          }
                      }
                  }
                  return target;
              };
        return _extends.apply(this, arguments);
    }

    (function (document) {
         const referrer = document.referrer;
        
        
        var referringDomain = getDomain_(document.referrer);
        const sessionCookie = getCookie_('__utmzzses');
        
        const qs = document.location.search.replace('?', '');
        const hash = document.location.hash.replace('#', '');
        const gaParams = parseGoogleParams(qs + '#' + hash);
        const referringInfo = parseGaReferrer(referrer);
        const storedVals = getCookie_('__utmz') || getCookie_('__utmzz');
        const newCookieVals = [];
        /** Final object with default values */

        const gaReferral = {
            utmcsr: '(direct)',
            utmcmd: '(none)',
            utmccn: '(not set)',
            utmhostname: new URL(document.referrer || document.location.href).hostname,
        };
        /** map object for converting long utm names to short analogs (e.g. utm_source => utmcsr) */

        const keyMap = {
            utm_source: 'utmcsr',
            utm_medium: 'utmcmd',
            utm_campaign: 'utmccn',
            utm_content: 'utmcct',
            utm_term: 'utmctr',
            gclid: 'utmgclid',
            dclid: 'utmdclid',
        };
        const keyFilter = ['utmcsr', 'utmcmd', 'utmccn', 'utmcct', 'utmctr', 'utmhostname'];
        

        if (sessionCookie && referringDomain === thisDomain) {
            gaParams = null;
            referringInfo = null;
        } // if query_params contains signup // prime_partners / referral

        // if gaParams variable (query string from Google) contains utm values (at least source, gclid and dclid properties)
        if (gaParams && gaParams.utm_source) {
            // map google long utm names to short (with values)
            for (var key in gaParams) {
                if (!gaParams[key]) continue;
                var keyName = keyMap[key];
                gaReferral[keyName] = gaParams[key];
            } // if gclid or dclid then source = google and medium = cpc or cpm (depends on utmgclid)

        } // else if document referrer contains utm values
        else if (referringInfo) {
            gaReferral.utmcsr = referringInfo.source;
            gaReferral.utmcmd = referringInfo.medium;

            if (referringInfo.term) {
                gaReferral.utmctr = referringInfo.term;
            }
        } // else if one of __utmz or__utmzz cookies exists and __utmzzses cookie exists and referring domain === this domain
        else if (storedVals) {
            // __utmz or __utmzz cookie will be parsed and stored into final cookie
            gaReferral = storedVals.split('|').reduce(function (sum, i) {
                var _extends2;

                var _i$split = i.split('='),
                    cookieName = _i$split[0],
                    cookieValue = _i$split[1];

                return _extends(
                    {},
                    sum,
                    ((_extends2 = {}),
                    (_extends2[cookieName.split('.').pop()] = cookieValue),
                    _extends2)
                );
            }, {});
        } // parse final object and create cookie from it

        for (var _key in gaReferral) {
            if (typeof gaReferral[_key] !== 'undefined' && keyFilter.indexOf(_key) > -1) {
                newCookieVals.push(_key + '=' + gaReferral[_key]);
            }
        } // If cookie initialTrafficSource isn't exists, then write it

        if (!getCookie_('initialTrafficSource')) {
            writeCookie_(
                'initialTrafficSource',
                newCookieVals.join('|'),
                cookieExpiration,
                '/',
                thisDomain
            );
        }

    

        
        

        // always write __utmzzses cookie
        writeCookie_('__utmzzses', 1, null, '/', thisDomain);
        /*
         * ==============
         * Help functions
         * ==============
         * */

        /**
         * @param {String} str
         * @returns {(object|undefined)}
         */

        function parseGoogleParams(str) {
            var campaignParams = ['source', 'medium', 'campaign', 'term', 'content'];
            var regex = new RegExp(
                '(utm_(' + campaignParams.join('|') + ')|(d|g)clid)=.*?([^&#]*|$)',
                'gi'
            );
            var gaParams = str.match(regex);
            var paramsObj, vals, len, i;
            if (!gaParams) return;
            paramsObj = {};
            len = gaParams.length;

            for (i = 0; i < len; i++) {
                vals = gaParams[i].split('=');

                if (vals) {
                    paramsObj[vals[0]] = vals[1];
                }
            }

            return paramsObj;
        }

        function parseGaReferrer(referrer) {
            if (!referrer) return;
            var searchEngines = {
                'daum.net': {
                    p: 'q',
                    n: 'daum',
                },
                'eniro.se': {
                    p: 'search_word',
                    n: 'eniro ',
                },
                'naver.com': {
                    p: 'query',
                    n: 'naver ',
                },
                'yahoo.com': {
                    p: 'p',
                    n: 'yahoo',
                },
                'msn.com': {
                    p: 'q',
                    n: 'msn',
                },
                'bing.com': {
                    p: 'q',
                    n: 'live',
                },
                'aol.com': {
                    p: 'q',
                    n: 'aol',
                },
                'lycos.com': {
                    p: 'q',
                    n: 'lycos',
                },
                'ask.com': {
                    p: 'q',
                    n: 'ask',
                },
                'altavista.com': {
                    p: 'q',
                    n: 'altavista',
                },
                'search.netscape.com': {
                    p: 'query',
                    n: 'netscape',
                },
                'cnn.com': {
                    p: 'query',
                    n: 'cnn',
                },
                'about.com': {
                    p: 'terms',
                    n: 'about',
                },
                'mamma.com': {
                    p: 'query',
                    n: 'mama',
                },
                'alltheweb.com': {
                    p: 'q',
                    n: 'alltheweb',
                },
                'voila.fr': {
                    p: 'rdata',
                    n: 'voila',
                },
                'search.virgilio.it': {
                    p: 'qs',
                    n: 'virgilio',
                },
                'baidu.com': {
                    p: 'wd',
                    n: 'baidu',
                },
                'alice.com': {
                    p: 'qs',
                    n: 'alice',
                },
                'yandex.com': {
                    p: 'text',
                    n: 'yandex',
                },

                'ya.ru': {
                    p: 'text',
                    n: 'yandex',
                },

                'yandex.ru': {
                    p: 'text',
                    n: 'yandex',
                },
                'najdi.org.mk': {
                    p: 'q',
                    n: 'najdi',
                },
                'seznam.cz': {
                    p: 'q',
                    n: 'seznam',
                },
                'search.com': {
                    p: 'q',
                    n: 'search',
                },
                'wp.pl': {
                    p: 'szukaj ',
                    n: 'wirtulana polska',
                },
                'online.onetcenter.org': {
                    p: 'qt',
                    n: 'o*net',
                },
                'szukacz.pl': {
                    p: 'q',
                    n: 'szukacz',
                },
                'yam.com': {
                    p: 'k',
                    n: 'yam',
                },
                'pchome.com': {
                    p: 'q',
                    n: 'pchome',
                },
                'kvasir.no': {
                    p: 'q',
                    n: 'kvasir',
                },
                'sesam.no': {
                    p: 'q',
                    n: 'sesam',
                },
                'ozu.es': {
                    p: 'q',
                    n: 'ozu ',
                },
                'terra.com': {
                    p: 'query',
                    n: 'terra',
                },
                'mynet.com': {
                    p: 'q',
                    n: 'mynet',
                },
                'ekolay.net': {
                    p: 'q',
                    n: 'ekolay',
                },
                'rambler.ru': {
                    p: 'words',
                    n: 'rambler',
                },
                google: {
                    p: 'q',
                    n: 'google',
                },
            };
            var a = document.createElement('a');
            var values = {};
            var searchEngine, termRegex, term;
            a.href = referrer; // Shim for the billion google search engines

            if (a.hostname.indexOf('google') > -1) {
                referringDomain = 'google';
            }

            if (searchEngines[referringDomain]) {
                searchEngine = searchEngines[referringDomain];
                termRegex = new RegExp(searchEngine.p + '=.*?([^&#]*|$)', 'gi');
                term = a.search.match(termRegex);
                values.source = searchEngine.n;
                values.medium = 'organic';
                values.term = (term ? term[0].split('=')[1] : '') || '(not provided)';
            } else if (referringDomain !== thisDomain) {
                values.source = a.hostname;
                values.medium = 'referral';
            }

            return values;
        }
     

        
    })(document);
}


function lastNonDirect() {
// lsn
// Получаем куки
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Доп. проверка на Direct
var params = new URLSearchParams(window.location.search);
 
  
// Проверяем текущий переход директ или нет
function isThisDirect() {
  // Список ключевых параметров в URL относящегося к Direct
        if(params.get('utmcsr') !== null &&
            (params.get('utmcsr') == 'direct' || params.get('utmcsr') == '')) return true;

 
        if(params.get('utm_source') !== null && 
           (params.get('utm_source') == 'direct' || params.get('utm_source') == '')) return true;   
  
        if(params.get('utm_medium') !== null && params.get('utm_medium') == '') return true;   
        if(params.get('utm_campaign') !== null && params.get('utm_campaign') == '') return true;    
  
        return false; 
}

// Устанавливаем куки в соответвии с источником запроса, и рядом прочих условий
function setSourceCookie() {
    // Собственный домен
    // перечисляем что такое собственные домены, чтобы вычислить прямые заходы
    

    // Поисковые си
    // перечисляем список доменов, которые относятся к поисковым системам типа Гугл поиск и Яндекс Поиск
    var searchEngines = [
      'daum.net',
      'eniro.se',
      'naver.com',
      'yahoo.com',
      'msn.com',
      'bing.com',
      'aol.com',
      'lycos.com',
      'ask.com',
      'altavista.com',
      'netscape.com',
      'cnn.com',
      'about.com',
      'mamma.com',
      'alltheweb.com',
      'voila.fr',
      'virgilio.it',
      'baidu.com',
      'alice.com',
      'yandex.com',
      'najdi.org.mk',
      'seznam.cz',
      'search.com',
      'wp.pl',
      'onetcenter.org',
      'szukacz.pl',
      'yam.com',
      'pchome.com',
      'kvasir.no',
      'sesam.no',
      'ozu.es',
      'terra.com',
      'mynet.com',
      'ekolay.net',
      'rambler.ru',
      'google.com',
      'yandex.ru',
      'ya.ru'
    ];

    // переменная котора кладется далее в href, чтобы его можно было парсить
    var a = document.createElement('a');
    // положили в href ТО что было у пользователя в document.referrer
    a.href = document.referrer;
    // захватываем из document.referrer полное значение hostname
    var fullDomain = a.hostname;
    // разбиваем на части полное имя хоста по точкам (поддомены, зоны и тд)
    var pieces = fullDomain.split(/[\s.]+/);
    // захватываем зону домена
    var zone = pieces[pieces.length - 1];
    // получаем только домен без поддомена
    var domain = pieces[pieces.length - 2];
    // получаем полное значение URL
    var sub_domain_name = new URL(document.referrer || document.location.href)
    // склейка зоны + домена без поддомена
    var domain_name = domain + '.' + zone;
    // прослушиваем query параметры , все после ?
    var query_params = document.location.search;
    // переменные для дальнейшего использования в поиске значений в query параметрах
    // переменные для записи куки
    var expirationTime = 31560000; // 12 months in seconds
    expirationTime = expirationTime * 1000; // Converts expirationtime to milliseconds

    var date = new Date();
    var dateTimeNow = date.getTime();
    date.setTime(dateTimeNow + expirationTime); // Sets expiration time (Time now + 12 month in seconds)

    var expirationTimeString = date.toUTCString(); // Converts milliseconds to UTC time string
    var expirationCookie = "; expires=" + expirationTimeString
    var cookieName = "last_utm_source"; // Name of your cookie

    var fullCookieValue = cookieName + "=direct; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains
   
    // не DIRECT
    // Условие, если в URL замечается текст "utm_source" или "utm_source", то мы с этими значениями записываем куки
    if (params.get('utm_source') != undefined || params.get('utm_medium') != undefined || params.get('utm_campaign') != undefined){
      var cookieValue = "utmcsr=" + params.get('utm_source') + "|" + "utmcmd=" + params.get('utm_medium') + "|" + "utmccn=" + params.get('utm_campaign') + "|" + "utmcct=" + params.get('utm_content') + "|" + "utmctr=" + params.get('utm_term') + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains      
    }

 
    // DIRECT
    // Условия, если домен первого уровня + зона соответствуют нашему домену domain_name то пишем следующие значения DIRECT
    /// else if this our domain then Direct
    else if (ownDomain) {
      var cookieValue = "utmcsr=" + 'direct' + "|" + "utmcmd=" + '(not set)' + "|" + "utmccn=" + '(not set)' + "|" + "utmcct=" + '(not set)' + "|" + "utmctr=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains    
    }
 
    // не DIRECT
    // Условия , если домен первого уровня + зона соответствуют списку поисковых систем
    else if (searchEngines.indexOf(domain_name) > -1) {
      var cookieValue = "utmcsr=" + domain_name + "|" + "utmcmd=" + 'organic' + "|" + "utmcct=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains

    // не DIRECT  
    // условия, если домен не подошел ни по одному из правил, значит записываем как переход с сайта
    } else {
      var cookieValue = "utmcsr=" + domain_name + "|" + "utmcmd=" + 'referral' + "|" + "utmcct=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains  
    }

    var last_utm_source = getCookie(cookieName); // Последнее значение UTM метки добавленное в куки

    // (1) Если куки установлена, и это не директ, а текущий заход директ -  то не меняем куки
    if(last_utm_source != null 
       && last_utm_source 
       && last_utm_source.indexOf('utmcsr=direct') == -1      
       && (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }

    // (2) Если в куке last_utm_source имеется utm_source=direct (то есть последний заход был прямой) + �? этот данный переход тоже direct - мы НЕ запускаем скрипт.
    if(last_utm_source != null &&
       last_utm_source.indexOf('utmcsr=direct') !== -1 &&
       (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }

    // (3) Если в куке last_utm_source имеется utm_source=direct (то есть последний заход был прямой) > НО этот переход не прямой (то есть НЕ direct)- Мы запускаем скрипт, чтобы перезаписать куки.
    if(last_utm_source != null &&
      last_utm_source.indexOf('utmcsr=direct') !== -1 &&
      (cookieValue.indexOf('utmcsr=direct') == -1 && isThisDirect() == false)) {
  document.cookie = fullCookieValue; // Сохраняем згачение UTM в куки

      return true;
    }

    // (4) Если в куке last_utm_source utm_source!=direct , то есть НЕ прямой > А этот данный переход direct, то есть прямой - мы НЕ запускаем скрипт
    if(last_utm_source != null &&
      last_utm_source.indexOf('utmcsr=direct') == -1 &&
      (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }
    
    // (5) Если в куке last_utm_source utm_source!=direct , (то есть последний заход был НЕ прямой) > 
  // �? этот переход не П� ЯМОЙ (то есть НЕ direct) - Мы запускаем скрипт, чтобы перезаписать куки.
    if((cookieValue.indexOf('utmcsr=direct') == -1 && isThisDirect() == false) && 
        last_utm_source != null && 
        last_utm_source &&  
      last_utm_source.indexOf('utmcsr=direct') == -1) {

      document.cookie = fullCookieValue; // Сохраняем згачение UTM в куки
      return true;
    }

    // Сохраняем згачение UTM в куки
    document.cookie = fullCookieValue;
}

setSourceCookie();
  
}

function utmParams() {
  
    const domain = window.location.hostname;
    setCookie('domain', domain);

    
    // Функция для парсинга значения параметра запроса
    function getQueryParam(name) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get(name);
    }

    // Функция для парсинга значения куки
    function parseCookieValue(cookie, key) {
        const match = cookie.match(new RegExp('(?:^|; )' + key + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }

    // Логика установки прочих кук!
    var domainFromReferer = '';
    if (referer) {
        var domainFromRefererMatch = referer.match(/:\/\/(.[^/]+)/);
        if (domainFromRefererMatch) {
            domainFromReferer = domainFromRefererMatch[1];
        }
    }
    if (referer && ownDomain === false && (referer.includes('ya.ru') || referer.includes('yandex') || referer.includes('google') || referer.includes('bing')) && !utmSourceParam) {
        var search = 'yandex';
        if (referer.includes('google')) {
            search = 'google';
        } else if (referer.includes('bing')) {
            search = 'bing';
        }
        if (!getCookie_('first_utm_source')) { setCookie('first_utm_source', search, 365); }
        if (!getCookie_('first_utm_medium')) { setCookie('first_utm_medium', 'organic', 365); }
        if (!getCookie_('first_utm_campaign')) { setCookie('first_utm_campaign', '(not set)', 365); }
        setCookie('source_medium', mapUtmSourceMedium(search, 'organic'), 365);
        if (!getCookie_('first_source_medium')) { setCookie('first_source_medium', mapUtmSourceMedium(search, 'organic'), 365); }
        setCookie('search', search, 365);
        setCookie('utm_source', search, 365);
        setCookie('utm_medium', 'organic', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
    } else if (referer && ownDomain === false && !referer.includes('ya.ru') && !referer.includes('yandex') && !referer.includes('google') && !utmSourceParam) {
        var rkName = domainFromReferer + ' / referrer';
        if (!getCookie_('first_utm_source')) { setCookie('first_utm_source', domainFromReferer, 365); }
        if (!getCookie_('first_utm_medium')) { setCookie('first_utm_medium', '(not set)', 365); }
        if (!getCookie_('first_utm_campaign')) { setCookie('first_utm_campaign', '(not set)', 365); }
        setCookie('source_medium', mapUtmSourceMedium(domainFromReferer, 'referrer'), 365);
        if (!getCookie_('first_source_medium')) { setCookie('first_source_medium', mapUtmSourceMedium(domainFromReferer, 'referrer'), 365); }
        setCookie('search', '(not set)', 365);
        setCookie('utm_source', domainFromReferer, 365);
        setCookie('utm_medium', '(not set)', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
    } else if (utmSourceParam) {
        // Если есть utmSourceParam, используем параметры из URL
        if (!getCookie_('first_utm_source') && utm_source_param) {
            setCookie('first_utm_source', utm_source_param, 365);
        }
        if (!getCookie_('first_utm_medium') && utm_med_param) {
            setCookie('first_utm_medium', utm_med_param, 365);
        }
        if (!getCookie_('first_utm_campaign') && utm_camp_param) {
            setCookie('first_utm_campaign', utm_camp_param, 365);
        }
        setCookie('utm_source', utm_source_param, 365);
        setCookie('utm_medium', utm_med_param, 365);
        setCookie('utm_campaign', utm_camp_param, 365);
        setCookie('utm_content', utm_cont_param, 365);
        setCookie('utm_term', utm_term_param, 365);
        setCookie('source_medium', mapUtmSourceMedium(utm_source_param, utm_med_param), 365);
        if (!getCookie_('first_source_medium'))  setCookie('first_source_medium', mapUtmSourceMedium(utm_source_param, utm_med_param), 365);
    } else if (!referer && !utmSourceParam && !parseCookieValue(document.cookie, 'utm_source')) {

        if (!getCookie_('first_utm_source')) { setCookie('first_utm_source', '(not set)', 365); }
        if (!getCookie_('first_utm_medium')) { setCookie('first_utm_medium', '(not set)', 365); }
        if (!getCookie_('first_utm_campaign')) { setCookie('first_utm_campaign', '(not set)', 365); }
        setCookie('source_medium', '(not set) / (not set)', 365);
        if (!getCookie_('first_source_medium')) {  setCookie('first_source_medium', '(not set) / (not set)', 365);}

        setCookie('search', '(not set)', 365);
        setCookie('utm_source', '(not set)', 365);
        setCookie('utm_medium', '(not set)', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
    } 


   
}

firstSource()
lastNonDirect()
}
utmParams();
