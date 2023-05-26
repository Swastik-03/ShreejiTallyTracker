const request = require("request");
const getReport = require('./getReport.js');
const bodyParser = require("body-parser");
const xml2js = require('xml2js');


async function vouchNo(Order)
{
  return new Promise((resolve, reject) => {
    getReport('XML',Order).then(xml => {
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const vouchers = result.ENVELOPE.DBCVCHNO;
          const lastVoucher = vouchers[vouchers.length - 1];
          resolve(lastVoucher);
        }
    });
  }).catch(err => {
     reject(err);
  });

  });
}

module.exports = vouchNo;