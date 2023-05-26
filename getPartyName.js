const request = require("request");
const bodyParser = require("body-parser");
const xml2js = require('xml2js');

async function getPartyName() {
    return new Promise((resolve, reject) => {
      const requestXml = `<ENVELOPE>
      <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>EXPORT</TALLYREQUEST>
      <TYPE>Collection</TYPE>
      <ID>Ledger</ID>
      </HEADER>
      <BODY>
      <DESC>
      <STATICVARIABLES><SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT></STATICVARIABLES>
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
    
      request(options, async (error, response, body) => {
          if (error) {
              console.error(error);
          }
          // console.log(body);
    
           xml2js.parseString(body, (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            const ledgerNames = [];
            const collection = result.ENVELOPE.BODY[0].DATA[0].COLLECTION[0];
            
            for (const ledger of collection.LEDGER) {
              ledgerNames.push(ledger.$.NAME);
            }
            resolve (ledgerNames);
          });
      });
    });
  
  }
  
  module.exports=getPartyName;