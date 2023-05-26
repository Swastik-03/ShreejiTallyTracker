const request = require("request");
const bodyParser = require("body-parser");
const xml2js = require('xml2js');


async function getPartyDetails(partyname) {
    return new Promise((resolve, reject) => {
      const requestXml = `<ENVELOPE>
      <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>EXPORT</TALLYREQUEST>
      <TYPE>OBJECT</TYPE> <SUBTYPE>Ledger</SUBTYPE> <ID TYPE="Name">${partyname}</ID>
      </HEADER>
      <BODY>
      <DESC>
      <STATICVARIABLES><SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT></STATICVARIABLES>
      <FETCHLIST>
      <FETCH>Name</FETCH>
      <FETCH>Address</FETCH>
      <FETCH>IncomeTaxNumber</FETCH>
      <FETCH>PartyGSTIN</FETCH>
      <FETCH>PriorStateName</FETCH>
      <FETCH>Pincode</FETCH>
      </FETCHLIST>
      <TDL>
      <TDLMESSAGE>
      <OBJECT NAME="Ledger" ISINITIALIZE="Yes">
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
            const ledgerNames = [];
            
    const ledger = result.ENVELOPE.BODY[0].DATA[0].TALLYMESSAGE[0].LEDGER[0];
    const address = ledger['ADDRESS.LIST'][0].ADDRESS;
    const state = ledger.PRIORSTATENAME[0]._;
    let pincode = ledger && ledger.PINCODE ? ledger.PINCODE[0]._ : undefined ;
    if(pincode === undefined)
    {
      pincode='';
    }
    let gstin = ledger && ledger.PARTYGSTIN ? ledger.PARTYGSTIN[0]._ : undefined ;
    if(gstin === undefined)
    {
      gstin='';
    }
    const name = ledger.$.NAME;
    let incometaxno = ledger && ledger.INCOMETAXNUMBER ? ledger.INCOMETAXNUMBER[0]._ : undefined ;
    if(incometaxno === undefined)
    {
      incometaxno='';
    }
    const partydetails = { Name : name, address : address, gstin : gstin , incometaxno : incometaxno, state : state, pincode : pincode};
    resolve (partydetails);
          });
      });
    });
  
  }

  async function n()
  {
  const neaw= await getPartyDetails('Aashirwad Traders,Vinchiya');
  let h=`hello this is xml my <address.list>`;
  for(let i=0; i<neaw.address.length;i++)
  {
    h+=`<address> ${neaw.address[i]} </address>`;
  }
  h+=`</address.list> the xml is complete`;
  console.log(h);
  console.log(neaw);
  // console.log(neaw);
  }
  module.exports= getPartyDetails;
  // n();