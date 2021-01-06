// Resolve conflict in jQuery UI tooltip with Bootstrap tooltip
$.widget.bridge('uibutton', $.ui.button);

/**
 * Init ajax request with method GET
 * @param {string} apiUrl Url for request data
 * @return {object}
 */
async function ajaxGet(apiUrl) {
    let result = {};

    try {
        await $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            complete: (response, textStatus) => {
                result.responseJson = response.responseJSON;
                result.statusCode = response.status;
                result.statusText = response.statusText;
            }
        });
    } catch (error) {
        
    }

    return result;
}

function randomHexColor() {
    return Math
        .floor(Math.random()*16777215)
        .toString(16);
}

/**
 * Escape value to string
 */
String.prototype.escape = function() {
    let tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

/**
 * Checking Page with Component Id
 * @param {string} idName 
 * @returns {boolean}
 */
function checkPage(idName) {
    if ($(`#${idName}`).length > 0) {
        return true;
    }

    return false;
}

/**
 * Check local storage available
 * @returns {boolean}
 */
function lsTest(){
    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

/**
 * Get local storage size used
 * @returns {boolean}
 */
function getLsSize(){
    var x, xLen, log=[],total=0;for (x in localStorage){if(!localStorage.hasOwnProperty(x)){continue;} xLen =  ((localStorage[x].length * 2 + x.length * 2)/1024); log.push(x.substr(0,30) + " = " +  xLen.toFixed(2) + " KB"); total+= xLen}; if (total > 1024){log.unshift({"total": `${(total/1024).toFixed(2)}`})}else{log.unshift({"total": `${total.toFixed(2)}`});};

    return log; 
}

/* Fungsi formatRupiah */
function formatRupiah(angka, prefix = ''){
    angka = angka.toString();
    let number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? rupiah : '');
}

const BASE_URL = $('meta[name="url"]').attr('content'),
    LS_PURCHASE_NAME = `${window.location.hostname}_purchase`,
    LS_ORDER_NAME = `${window.location.hostname}_order`,
    DASHBOARD_PAGE = checkPage('dashboard-content'),
    ADD_PURCHASE_PAGE = checkPage('purchase-add-content'),
    ADD_ORDER_PAGE = checkPage('order-add-content'),
    PRELOAD_CSS = $('link[rel="preload"]');

function loadPreloadStyles() {
    $.each(PRELOAD_CSS, (key, value) => {
        PRELOAD_CSS.eq(key).attr('rel', 'stylesheet');
    });
}

$(document).ready(() => {
    
    if ($('.static-datatable').length > 0) {
        $('.static-datatable').DataTable();
    }

    //Initialize Select2 Elements
    if ($('.select2bs4').length > 0) {

        $('.select2bs4').select2({
            theme: 'bootstrap4'
        });

    }

    if (!ADD_PURCHASE_PAGE) {
        localStorage.removeItem(LS_PURCHASE_NAME);
    }

    if (!ADD_ORDER_PAGE) {
        localStorage.removeItem(LS_ORDER_NAME);
    }

    loadPreloadStyles();

});