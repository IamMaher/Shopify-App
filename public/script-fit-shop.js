const header = $('head')
header.prepend('<link href="https://app.fitandshop.me/fit/styling" rel="stylesheet">')
header.prepend('<script  src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>')

let payload = null;

function showFitNShop() {
    console.log("showFitNShop");
    // window.open(`${this.base_site}/fit/${sku}:${this.payload.api_key}`, "Fit And Shop", "width=1080px,height=1920px");
    var x = document.getElementById("fit_and_shop_frame");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

function resizeIframe(iframe) {
    $(iframe).width("100%");
    var iframeIsReady = false;
    do {
        if ($(iframe.contentDocument).ready) // added 'iframe.contentDocument' instead of iframe
        {
            var iframeHeight = iframe.contentDocument.body.scrollHeight;
            $(iframe).height(iframeHeight);
            var iframeContentHeight = $(iframe).children("#DivInPage").height();
            $(iframe).height(iframeContentHeight);
            iframeIsReady = true;
        }
        else {
            setTimeout(resizeIframe(iframe), 1000);
        }
    } while (!iframeIsReady);
}


console.log("INIT: Fit and Shop");

// {{product.variants[0].sku | slice: 0, 3}} #Shopify
function init_fit(payload) {
    let base_site =  'https://app.fitandshop.me';
    let SESSION_ID = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        SESSION_ID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let session_id = localStorage.getItem('FIT_SESSION_ID');
    if (session_id == null) {
        localStorage.setItem('FIT_SESSION_ID', SESSION_ID)
    }
    console.log(payload);
    this.payload = payload;
    if (payload.sku == null)
        return false;
    if (payload.api_key == null)
        return false;
    // if (!payload.debug)
    //     this.base_site = "https://app.fitandshop.me";
    // else
    //     this.base_site = "http://localhost:5000";
    console.log("Checking... ", payload.sku);
    let fitNewBtn = `<a id="fitandshop" class="fit-button" onclick="showFitNShop('${payload.sku}')">
                    <img src="${base_site}/fit/logo"" alt="img" width="50px">
                    <p class="fit-button-text">FIT PRODUCT</p></a>`;
    this.payload = payload;
    let iFrame =
        `<div class="all" id="fit_and_shop_frame" style="display: none;">
            <div id="pop" class="pop main-container ">
                <iframe id="fitandshop_frame" src="${base_site}/fit/${payload.sku}:${payload.api_key}"
                 frameborder="0" scrolling="yes" ></iframe>
            </div>
        </div>`;
    $(`body`).prepend(iFrame);
    $.ajax({
        url: `${base_site}/api/General/check_sku_shop?SKU=${payload.sku}&API_KEY=${payload.api_key}`,
        // url: `${base_site}/api/General/check_sku_shop?SKU=${payload.sku}`,
    }).done(function (res) {
        if (!res.error) {
            if (res.is_found) {
                console.log("showing fit and shop button");
                $(`#${payload.button_selector}`).append(fitNewBtn);
                $('#fitandshop').show();
            } else {
                console.log(`FIT AND SHOP - ERROR ${res.message_code}:${res.message}`)
            }
        }
    });
}


// Create IE + others compatible event handler
let eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
let eventer = window[eventMethod];
let messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent, function (e) {
    // console.log('parent received message!:  ', e.data);
    if (e.data === 'closed')
        showFitNShop();
}, false);

$(document).ready(function () {
    var payload = {
        sku: 'ME1',
        button_selector: `ProductInfo-template--14843789738162__main`,
        api_key: 'BA2BD0E7D432FF21F34A54A21B9291F29126211F896BD663A60EEF38'
    };
    init_fit(payload)
});

// ShopifyAnalytics.meta.product.variants[0].sku  TODO use this SKU