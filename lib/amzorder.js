var cheerio = require('cheerio');

var amzorder = module.exports = function (html) {

    var subtotalSelector = 'body > table tr > td > table:nth-child(5) tr > td > table tr:nth-child(2) > td > table  tr > td > table  tr > td > table  tr:nth-child(1) > td:nth-child(2)';
    var shipHandleSelector = 'body > table  tr > td > table:nth-child(5)  tr > td > table  tr:nth-child(2) > td > table  tr > td > table  tr > td > table  tr:nth-child(2) > td:nth-child(2)';
    var totalPreTaxSelector = 'body > table  tr > td > table:nth-child(5)  tr > td > table  tr:nth-child(2) > td > table  tr > td > table  tr > td > table  tr:nth-child(4) > td:nth-child(2)';
    var taxSelector = 'body > table  tr > td > table:nth-child(5)  tr > td > table  tr:nth-child(2) > td > table  tr > td > table  tr > td > table  tr:nth-child(5) > td:nth-child(2)';
    var totalSelector = 'body > table  tr > td > table:nth-child(5)  tr > td > table  tr:nth-child(2) > td > table  tr > td > table  tr > td > table  tr:nth-child(7) > td:nth-child(2) > b';
    var $ = cheerio.load(html);

    // get currency amount
    function getCurrencyAmount(selector) {
        var amount = $(selector).text()
        return new Number(amount.replace("$", "").replace(",", ""));
    }
    
    var order = {
        subtotal: getCurrencyAmount(subtotalSelector),
        shippingAndHandling: getCurrencyAmount(shipHandleSelector),
        totalPreTax: getCurrencyAmount(totalPreTaxSelector),
        tax: getCurrencyAmount(taxSelector),
        grandTotal: getCurrencyAmount(totalSelector),
    };

    return order;
};
