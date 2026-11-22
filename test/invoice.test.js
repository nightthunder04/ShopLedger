var assert = require('node:assert/strict');
var test = require('node:test');

var invoice = require('../lib/invoice');
var pricing = require('../lib/pricing');

test('invoice totals and GST breakdown match the amount billed for an HSN-rated discounted order', function () {
  var items = [{
    id: 5,
    sku: 'OIL-002',
    name: 'Cold-Pressed Groundnut Oil 5L',
    hsn: '1508',
    price: 1120,
    qty: 2
  }];
  var billed = pricing.computeTotals(items, 'SAVE10');
  var order = {
    id: 1004,
    items: items,
    coupon: 'SAVE10',
    subtotal: billed.subtotal,
    discount: billed.discount,
    tax: billed.tax,
    total: billed.total
  };

  var actual = invoice.computeInvoiceFigures(order);

  assert.deepEqual({
    subtotal: actual.subtotal,
    discount: actual.discount,
    tax: actual.tax,
    cgst: actual.cgst,
    sgst: actual.sgst,
    total: actual.total,
    rows: actual.rows.map(function (row) {
      return { gstPercent: row.gstPercent, line: row.line, lineTax: row.lineTax };
    })
  }, {
    subtotal: billed.subtotal,
    discount: billed.discount,
    tax: billed.tax,
    cgst: billed.cgst,
    sgst: billed.sgst,
    total: billed.total,
    rows: billed.lines.map(function (line) {
      return { gstPercent: line.gstPercent, line: line.gross, lineTax: line.tax };
    })
  });
});
