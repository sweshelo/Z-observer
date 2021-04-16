// ==UserScript==
// @name         Zabbix Observer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  監視ツールを監視するツール(←?)
// @author       Sweshelo
// @match        *zabbix.php?action=dashboard.view*
// @icon         none
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    var targets = $(".dashbrd-grid-widget-content:first").get(0);

    const observer = new MutationObserver(records => {
        var plob  = $(".dashbrd-grid-widget-content:first table tbody tr:eq(0)");
        var url   = $(plob).children("td:eq(0)").children("a").attr("href");
        var a_date= $(plob).children("td:eq(0)").children("a").text();
        var b_date= $(plob).children("td:eq(3)").children("a").text();
        var state = $(plob).children("td:eq(4)").text();
        var info  = $(plob).children("td:eq(5)").text();
        var host  = $(plob).children("td:eq(6)").text();
        var desc  = $(plob).children("td:eq(7)").children("a").text();

        console.log("<URL to Zabbix server>"+url, a_date, b_date, state, info, host, desc);
        var data = {
            url:url,
            a_date:a_date,
            b_date:b_date,
            state:state,
            info:info,
            host:host,
            desc:desc
        };

        $.ajax('<URL to Zabbix server>/notify.php',{
            type: 'post',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
      }
    )
    })

    observer.observe(targets, {
      childList: true
    })

})();

