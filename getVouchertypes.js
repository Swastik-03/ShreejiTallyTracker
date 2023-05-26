const request = require("request");
const bodyParser = require("body-parser");
const xml2js = require('xml2js');

function getVoucherTypes() {
    const requestXml = `<ENVELOPE>
                            <HEADER>
                                <VERSION>1</VERSION>
                                <TALLYREQUEST>EXPORT</TALLYREQUEST>
                                <TYPE>COLLECTION</TYPE>
                                <ID>VoucherType</ID>
                            </HEADER>
                            <BODY>
                                <DESC>
                                    <STATICVARIABLES>
                                        <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
                                        <SVEXPORTFILTER>VoucherTypes</SVEXPORTFILTER>
                                    </STATICVARIABLES>
                                </DESC>
                            </BODY>
                        </ENVELOPE>`;
  
    const options = {
        url: 'http://localhost:9000',
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
        },
        body: requestXml,
    };
  
    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        // console.log(body);
  
        xml2js.parseString(body, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          
          const voucherTypes = result.ENVELOPE.BODY[0].DATA[0].COLLECTION[0].VOUCHERTYPE;
          
          const voucherNames = voucherTypes.map(voucher => voucher.$.NAME);
          
          console.log(voucherNames);
        });
    });
  }
//   getVoucherTypes();
module.export=getVoucherTypes;