
<script>


const thisHostname = document.location.hostname;
const cookieExpiration = new Date(+new Date() + 1000 * 60 * 60 * 24 * 30 * 24);
const thisDomain = getDomain_(thisHostname);
function writeCookie_(name, value, expiration, path, domain) {
            var str = name + '=' + value + ';';
            if (expiration) str += 'Expires=' + expiration.toUTCString() + ';';
            if (path) str += 'Path=' + path + ';';
            if (domain) str += 'Domain=' + domain + ';';
            document.cookie = str;
        }

        function getCookie_(name) {
            var cookies = '; ' + document.cookie;
            var cvals = cookies.split('; ' + name + '=');
            if (cvals.length > 1) return cvals.pop().split(';')[0];
        }

function ownDomainFunc(domain_from_referer) {
        var ownDomainArr = [
            'ribambelle.ae',
            'checkout.stripe.com'
        ];
        if (ownDomainArr.indexOf(domain_from_referer) > -1) {return true} else {return false}
    }
function getDomain_(url) {
            if (!url) return;
            var a = document.createElement('a');
            a.href = url;

            try {
                return a.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/)[0];
            } catch (squelch) {}
        }

 const referer = document.referrer;

 var ownDomain = false
    if (referer) {
        let domainFromReferer = referer.match(/:\/\/(.[^/]+)/)[1];
        ownDomain = ownDomainFunc(domainFromReferer)
        
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
// РџРѕР»СѓС‡Р°РµРј РєСѓРєРё
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

// Р”РѕРї. РїСЂРѕРІРµСЂРєР° РЅР° Direct
var params = new URLSearchParams(window.location.search);
 
  
// РџСЂРѕРІРµСЂСЏРµРј С‚РµРєСѓС‰РёР№ РїРµСЂРµС…РѕРґ РґРёСЂРµРєС‚ РёР»Рё РЅРµС‚
function isThisDirect() {
  // РЎРїРёСЃРѕРє РєР»СЋС‡РµРІС‹С… РїР°СЂР°РјРµС‚СЂРѕРІ РІ URL РѕС‚РЅРѕСЃСЏС‰РµРіРѕСЃСЏ Рє Direct
        if(params.get('utmcsr') !== null &&
            (params.get('utmcsr') == 'direct' || params.get('utmcsr') == '')) return true;

 
        if(params.get('utm_source') !== null && 
           (params.get('utm_source') == 'direct' || params.get('utm_source') == '')) return true;   
  
        if(params.get('utm_medium') !== null && params.get('utm_medium') == '') return true;   
        if(params.get('utm_campaign') !== null && params.get('utm_campaign') == '') return true;    
  
        return false; 
}

// РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РєСѓРєРё РІ СЃРѕРѕС‚РІРµС‚РІРёРё СЃ РёСЃС‚РѕС‡РЅРёРєРѕРј Р·Р°РїСЂРѕСЃР°, Рё СЂСЏРґРѕРј РїСЂРѕС‡РёС… СѓСЃР»РѕРІРёР№
function setSourceCookie() {
    // РЎРѕР±СЃС‚РІРµРЅРЅС‹Р№ РґРѕРјРµРЅ
    // РїРµСЂРµС‡РёСЃР»СЏРµРј С‡С‚Рѕ С‚Р°РєРѕРµ СЃРѕР±СЃС‚РІРµРЅРЅС‹Рµ РґРѕРјРµРЅС‹, С‡С‚РѕР±С‹ РІС‹С‡РёСЃР»РёС‚СЊ РїСЂСЏРјС‹Рµ Р·Р°С…РѕРґС‹
    

    // РџРѕРёСЃРєРѕРІС‹Рµ СЃРёСЃС‚РµРјС‹
    // РїРµСЂРµС‡РёСЃР»СЏРµРј СЃРїРёСЃРѕРє РґРѕРјРµРЅРѕРІ, РєРѕС‚РѕСЂС‹Рµ РѕС‚РЅРѕСЃСЏС‚СЃСЏ Рє РїРѕРёСЃРєРѕРІС‹Рј СЃРёСЃС‚РµРјР°Рј С‚РёРїР° Р“СѓРіР» РїРѕРёСЃРє Рё РЇРЅРґРµРєСЃ РџРѕРёСЃРє
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

    // РїРµСЂРµРјРµРЅРЅР°СЏ РєРѕС‚РѕСЂР° РєР»Р°РґРµС‚СЃСЏ РґР°Р»РµРµ РІ href, С‡С‚РѕР±С‹ РµРіРѕ РјРѕР¶РЅРѕ Р±С‹Р»Рѕ РїР°СЂСЃРёС‚СЊ
    var a = document.createElement('a');
    // РїРѕР»РѕР¶РёР»Рё РІ href РўРћ С‡С‚Рѕ Р±С‹Р»Рѕ Сѓ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РІ document.referrer
    a.href = document.referrer;
    // Р·Р°С…РІР°С‚С‹РІР°РµРј РёР· document.referrer РїРѕР»РЅРѕРµ Р·РЅР°С‡РµРЅРёРµ hostname
    var fullDomain = a.hostname;
    // СЂР°Р·Р±РёРІР°РµРј РЅР° С‡Р°СЃС‚Рё РїРѕР»РЅРѕРµ РёРјСЏ С…РѕСЃС‚Р° РїРѕ С‚РѕС‡РєР°Рј (РїРѕРґРґРѕРјРµРЅС‹, Р·РѕРЅС‹ Рё С‚Рґ)
    var pieces = fullDomain.split(/[\s.]+/);
    // Р·Р°С…РІР°С‚С‹РІР°РµРј Р·РѕРЅСѓ РґРѕРјРµРЅР°
    var zone = pieces[pieces.length - 1];
    // РїРѕР»СѓС‡Р°РµРј С‚РѕР»СЊРєРѕ РґРѕРјРµРЅ Р±РµР· РїРѕРґРґРѕРјРµРЅР°
    var domain = pieces[pieces.length - 2];
    // РїРѕР»СѓС‡Р°РµРј РїРѕР»РЅРѕРµ Р·РЅР°С‡РµРЅРёРµ URL
    var sub_domain_name = new URL(document.referrer || document.location.href)
    // СЃРєР»РµР№РєР° Р·РѕРЅС‹ + РґРѕРјРµРЅР° Р±РµР· РїРѕРґРґРѕРјРµРЅР°
    var domain_name = domain + '.' + zone;
    // РїСЂРѕСЃР»СѓС€РёРІР°РµРј query РїР°СЂР°РјРµС‚СЂС‹ , РІСЃРµ РїРѕСЃР»Рµ ?
    var query_params = document.location.search;
    // РїРµСЂРµРјРµРЅРЅС‹Рµ РґР»СЏ РґР°Р»СЊРЅРµР№С€РµРіРѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ РІ РїРѕРёСЃРєРµ Р·РЅР°С‡РµРЅРёР№ РІ query РїР°СЂР°РјРµС‚СЂР°С…
    // РїРµСЂРµРјРµРЅРЅС‹Рµ РґР»СЏ Р·Р°РїРёСЃРё РєСѓРєРё
    var expirationTime = 31560000; // 12 months in seconds
    expirationTime = expirationTime * 1000; // Converts expirationtime to milliseconds

    var date = new Date();
    var dateTimeNow = date.getTime();
    date.setTime(dateTimeNow + expirationTime); // Sets expiration time (Time now + 12 month in seconds)

    var expirationTimeString = date.toUTCString(); // Converts milliseconds to UTC time string
    var expirationCookie = "; expires=" + expirationTimeString
    var cookieName = "last_utm_source"; // Name of your cookie

    var fullCookieValue = cookieName + "=direct; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains
   
    // РЅРµ DIRECT
    // РЈСЃР»РѕРІРёРµ, РµСЃР»Рё РІ URL Р·Р°РјРµС‡Р°РµС‚СЃСЏ С‚РµРєСЃС‚ "utm_source" РёР»Рё "utm_source", С‚Рѕ РјС‹ СЃ СЌС‚РёРјРё Р·РЅР°С‡РµРЅРёСЏРјРё Р·Р°РїРёСЃС‹РІР°РµРј РєСѓРєРё
    if (params.get('utm_source') != undefined || params.get('utm_medium') != undefined || params.get('utm_campaign') != undefined){
      var cookieValue = "utmcsr=" + params.get('utm_source') + "|" + "utmcmd=" + params.get('utm_medium') + "|" + "utmccn=" + params.get('utm_campaign') + "|" + "utmcct=" + params.get('utm_content') + "|" + "utmctr=" + params.get('utm_term') + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains      
    }

 
    // DIRECT
    // РЈСЃР»РѕРІРёСЏ, РµСЃР»Рё РґРѕРјРµРЅ РїРµСЂРІРѕРіРѕ СѓСЂРѕРІРЅСЏ + Р·РѕРЅР° СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‚ РЅР°С€РµРјСѓ РґРѕРјРµРЅСѓ domain_name С‚Рѕ РїРёС€РµРј СЃР»РµРґСѓСЋС‰РёРµ Р·РЅР°С‡РµРЅРёСЏ DIRECT
    /// else if this our domain then Direct
    else if (ownDomain) {
      var cookieValue = "utmcsr=" + 'direct' + "|" + "utmcmd=" + '(not set)' + "|" + "utmccn=" + '(not set)' + "|" + "utmcct=" + '(not set)' + "|" + "utmctr=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains    
    }
 
    // РЅРµ DIRECT
    // РЈСЃР»РѕРІРёСЏ , РµСЃР»Рё РґРѕРјРµРЅ РїРµСЂРІРѕРіРѕ СѓСЂРѕРІРЅСЏ + Р·РѕРЅР° СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‚ СЃРїРёСЃРєСѓ РїРѕРёСЃРєРѕРІС‹С… СЃРёСЃС‚РµРј
    else if (searchEngines.indexOf(domain_name) > -1) {
      var cookieValue = "utmcsr=" + domain_name + "|" + "utmcmd=" + 'organic' + "|" + "utmcct=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains

    // РЅРµ DIRECT  
    // СѓСЃР»РѕРІРёСЏ, РµСЃР»Рё РґРѕРјРµРЅ РЅРµ РїРѕРґРѕС€РµР» РЅРё РїРѕ РѕРґРЅРѕРјСѓ РёР· РїСЂР°РІРёР», Р·РЅР°С‡РёС‚ Р·Р°РїРёСЃС‹РІР°РµРј РєР°Рє РїРµСЂРµС…РѕРґ СЃ СЃР°Р№С‚Р°
    } else {
      var cookieValue = "utmcsr=" + domain_name + "|" + "utmcmd=" + 'referral' + "|" + "utmcct=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains  
    }

    var last_utm_source = getCookie(cookieName); // РџРѕСЃР»РµРґРЅРµРµ Р·РЅР°С‡РµРЅРёРµ UTM РјРµС‚РєРё РґРѕР±Р°РІР»РµРЅРЅРѕРµ РІ РєСѓРєРё

    // (1) Р•СЃР»Рё РєСѓРєРё СѓСЃС‚Р°РЅРѕРІР»РµРЅР°, Рё СЌС‚Рѕ РЅРµ РґРёСЂРµРєС‚, Р° С‚РµРєСѓС‰РёР№ Р·Р°С…РѕРґ РґРёСЂРµРєС‚ -  С‚Рѕ РЅРµ РјРµРЅСЏРµРј РєСѓРєРё
    if(last_utm_source != null 
       && last_utm_source 
       && last_utm_source.indexOf('utmcsr=direct') == -1      
       && (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }

    // (2) Р•СЃР»Рё РІ РєСѓРєРµ last_utm_source РёРјРµРµС‚СЃСЏ utm_source=direct (С‚Рѕ РµСЃС‚СЊ РїРѕСЃР»РµРґРЅРёР№ Р·Р°С…РѕРґ Р±С‹Р» РїСЂСЏРјРѕР№) + Р СЌС‚РѕС‚ РґР°РЅРЅС‹Р№ РїРµСЂРµС…РѕРґ С‚РѕР¶Рµ direct - РјС‹ РќР• Р·Р°РїСѓСЃРєР°РµРј СЃРєСЂРёРїС‚.
    if(last_utm_source != null &&
       last_utm_source.indexOf('utmcsr=direct') !== -1 &&
       (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }

    // (3) Р•СЃР»Рё РІ РєСѓРєРµ last_utm_source РёРјРµРµС‚СЃСЏ utm_source=direct (С‚Рѕ РµСЃС‚СЊ РїРѕСЃР»РµРґРЅРёР№ Р·Р°С…РѕРґ Р±С‹Р» РїСЂСЏРјРѕР№) > РќРћ СЌС‚РѕС‚ РїРµСЂРµС…РѕРґ РЅРµ РїСЂСЏРјРѕР№ (С‚Рѕ РµСЃС‚СЊ РќР• direct)- РњС‹ Р·Р°РїСѓСЃРєР°РµРј СЃРєСЂРёРїС‚, С‡С‚РѕР±С‹ РїРµСЂРµР·Р°РїРёСЃР°С‚СЊ РєСѓРєРё.
    if(last_utm_source != null &&
      last_utm_source.indexOf('utmcsr=direct') !== -1 &&
      (cookieValue.indexOf('utmcsr=direct') == -1 && isThisDirect() == false)) {
  document.cookie = fullCookieValue; // РЎРѕС…СЂР°РЅСЏРµРј Р·РіР°С‡РµРЅРёРµ UTM РІ РєСѓРєРё

      return true;
    }

    // (4) Р•СЃР»Рё РІ РєСѓРєРµ last_utm_source utm_source!=direct , С‚Рѕ РµСЃС‚СЊ РќР• РїСЂСЏРјРѕР№ > Рђ СЌС‚РѕС‚ РґР°РЅРЅС‹Р№ РїРµСЂРµС…РѕРґ direct, С‚Рѕ РµСЃС‚СЊ РїСЂСЏРјРѕР№ - РјС‹ РќР• Р·Р°РїСѓСЃРєР°РµРј СЃРєСЂРёРїС‚
    if(last_utm_source != null &&
      last_utm_source.indexOf('utmcsr=direct') == -1 &&
      (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }
    
    // (5) Р•СЃР»Рё РІ РєСѓРєРµ last_utm_source utm_source!=direct , (С‚Рѕ РµСЃС‚СЊ РїРѕСЃР»РµРґРЅРёР№ Р·Р°С…РѕРґ Р±С‹Р» РќР• РїСЂСЏРјРѕР№) > 
  // Р СЌС‚РѕС‚ РїРµСЂРµС…РѕРґ РЅРµ РџР РЇРњРћР™ (С‚Рѕ РµСЃС‚СЊ РќР• direct) - РњС‹ Р·Р°РїСѓСЃРєР°РµРј СЃРєСЂРёРїС‚, С‡С‚РѕР±С‹ РїРµСЂРµР·Р°РїРёСЃР°С‚СЊ РєСѓРєРё.
    if((cookieValue.indexOf('utmcsr=direct') == -1 && isThisDirect() == false) && 
        last_utm_source != null && 
        last_utm_source &&  
      last_utm_source.indexOf('utmcsr=direct') == -1) {

      document.cookie = fullCookieValue; // РЎРѕС…СЂР°РЅСЏРµРј Р·РіР°С‡РµРЅРёРµ UTM РІ РєСѓРєРё
      return true;
    }

    // РЎРѕС…СЂР°РЅСЏРµРј Р·РіР°С‡РµРЅРёРµ UTM РІ РєСѓРєРё
    document.cookie = fullCookieValue;
}

setSourceCookie();
  
}

function utmParams() {
  
    const domain = window.location.hostname;
    setCookie('domain', domain);

    
    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїР°СЂСЃРёРЅРіР° Р·РЅР°С‡РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂР° Р·Р°РїСЂРѕСЃР°
    function getQueryParam(name) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get(name);
    }

    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїР°СЂСЃРёРЅРіР° Р·РЅР°С‡РµРЅРёСЏ РєСѓРєРё
    function parseCookieValue(cookie, key) {
        const match = cookie.match(new RegExp('(?:^|; )' + key + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }

    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ СѓСЃС‚Р°РЅРѕРІРєРё РєСѓРєРё
    function setCookie(name, value, days) {
        const expires = days ? '; expires=' + new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString() : '';
        document.cookie = name + '=' + value + expires + '; path=/; domain='+ domain;
    }

    // РџРѕР»СѓС‡Р°РµРј Р·РЅР°С‡РµРЅРёСЏ РёР· РєСѓРєРё Рё referer    
    const searchCookie = parseCookieValue(document.cookie, 'search');
    if (getQueryParam('utm_source') !== null) {var utmSourceParam = getQueryParam('utm_source');}
   
    
   


    //РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј Р·РЅР°С‡РµРЅРёСЏ utM РїРѕ РґРµС„РѕР»С‚Сѓ
    let utm_source_param = '(not set)'
    let utm_med_param = '(not set)'
    let utm_camp_param = '(not set)'
    let utm_term_param = '(not set)'
    let utm_cont_param = '(not set)'

    if (getQueryParam('utm_source') !== null) utm_source_param = getQueryParam('utm_source')
    if (getQueryParam('utm_medium') !== null) utm_med_param = getQueryParam('utm_medium')
    if (getQueryParam('utm_campaign') !== null) utm_camp_param = getQueryParam('utm_campaign')
    if (getQueryParam('utm_term') !== null) utm_term_param = getQueryParam('utm_term')
    if (getQueryParam('utm_content') !== null) utm_cont_param = getQueryParam('utm_content')
  

    // Р›РѕРіРёРєР° СѓСЃС‚Р°РЅРѕРІРєРё РїСЂРѕС‡РёС… РєСѓРє!
    if (referer && ownDomain === false && (referer.includes('ya.ru') || referer.includes('yandex') || referer.includes('google') || referer.includes('bing') ) && !utmSourceParam) {
        const domainFromReferer = referer.match(/:\/\/(.[^/]+)/)[1];
        let search = 'yandex';
        if (referer.includes('google')) {search = 'google'} else if (referer.includes('bing')) {search = 'bing'}

        if (!getCookie_('first_utm_source')) { setCookie('first_utm_source', search, 365); }
        if (!getCookie_('first_utm_medium')) { setCookie('first_utm_medium', 'organic', 365); }
        if (!getCookie_('first_utm_campaign')) { setCookie('first_utm_campaign', '(not set)', 365); }
        setCookie('source_medium', search + ' / organic', 365);
        if (!getCookie_('first_source_medium')) setCookie('first_source_medium', search + ' / organic', 365);

        setCookie('search', search, 365);
        setCookie('utm_source', search, 365);
        setCookie('utm_medium', 'organic', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
        
    } else if (referer &&  ownDomain === false && !referer.includes('ya.ru') && !referer.includes('yandex') && !referer.includes('google') && !utmSourceParam) {
        const domainFromReferer = referer.match(/:\/\/(.[^/]+)/)[1];
        const rkName = domainFromReferer + ' / referrer';
        
        if (!getCookie_('first_utm_source')) { setCookie('first_utm_source', domainFromReferer, 365); }
        if (!getCookie_('first_utm_medium')) { setCookie('first_utm_medium', '(not set)', 365); }
        if (!getCookie_('first_utm_campaign')) { setCookie('first_utm_campaign', '(not set)', 365); }
        setCookie('source_medium', domainFromReferer + ' / referrer', 365);
        if (!getCookie_('first_source_medium')) setCookie('first_source_medium', domainFromReferer + ' / referrer', 365);

        setCookie('search', '(not set)', 365);
        setCookie('utm_source', domainFromReferer, 365);
        setCookie('utm_medium', '(not set)', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);

    } else if (utmSourceParam) {

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
       

        setCookie('source_medium', utm_source_param + ' / ' + utm_med_param, 365);
        if (!getCookie_('first_source_medium'))  setCookie('first_source_medium', utm_source_param + ' / ' + utm_med_param, 365);
    
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
utmParams();
</script>
