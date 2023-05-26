const request = require("request");
const bodyParser = require("body-parser");
const xml2js = require('xml2js');

async function getItems() {
    return new Promise((resolve, reject) => {
      const requestXml = `<ENVELOPE>
      <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>EXPORT</TALLYREQUEST>
      <TYPE>Collection</TYPE>
      <ID>ListofStockItems</ID>
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
            const ItemNames = [];
            const collection = result.ENVELOPE.BODY[0].DATA[0].COLLECTION[0];
            
            for (const STOCKITEM of collection.STOCKITEM) {
              ItemNames.push(STOCKITEM.$.NAME);
            }
            resolve (ItemNames);
          });
      });
    });
  
  }
  module.exports=getItems;

  // async function f1(){
  //   const item = await getItems();
  //   console.log(item);
  // }
  // f1();