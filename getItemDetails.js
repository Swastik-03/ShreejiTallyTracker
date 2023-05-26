const request = require("request");
const bodyParser = require("body-parser");
const xml2js = require('xml2js');


async function getItemDetails(Itemname) {
    return new Promise((resolve, reject) => {
      const requestXml = `<ENVELOPE>
      <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>EXPORT</TALLYREQUEST>
      <TYPE>OBJECT</TYPE> <SUBTYPE>StockItems</SUBTYPE> <ID TYPE="Name">${Itemname}</ID>
      </HEADER>
      <BODY>
      <DESC>
      <STATICVARIABLES><SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT></STATICVARIABLES>
      <FETCHLIST>
      <FETCH>_HSNCode</FETCH>
      </FETCHLIST>
      <TDL>
      <TDLMESSAGE>
      <OBJECT NAME="StockItems" ISINITIALIZE="Yes">
      </OBJECT>
      </TDLMESSAGE>
      </TDL>
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
            
    const StockItem = result.ENVELOPE.BODY[0].DATA[0].TALLYMESSAGE[0].STOCKITEM[0];
 
   
    const name = StockItem.$.NAME;
    const unit = StockItem.BASEUNITS[0]._;
    let HSN = StockItem && StockItem._HSNCODE ? StockItem._HSNCODE[0]._ : undefined ;
    if(HSN === undefined)
    {
      HSN='';
    }
    const itemdetails = { Name : name, HSN : HSN , unit : unit};
    resolve (itemdetails);
          });
      });
    });
  
  }

module.exports=getItemDetails;

// async function f1()
// {
//   const s = await getItemDetails('MAIZE BRAN (CATTLE FEED)');
//   console.log(s.HSN);
// }

// f1();