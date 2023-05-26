const request = require("request");
const bodyParser = require("body-parser");
const xml2js = require('xml2js');


async function getCompanyDetails() {
    return new Promise((resolve, reject) => {
      const requestXml = `<ENVELOPE>
      <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>EXPORT</TALLYREQUEST>
      <TYPE>OBJECT</TYPE> <SUBTYPE>Company</SUBTYPE> <ID TYPE="Name">Shreeji Ingredients Pvt.Ltd.</ID>
      </HEADER>
      <BODY>
      <DESC>
      <STATICVARIABLES><SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT></STATICVARIABLES>
      <FETCHLIST>
      <FETCH>Name</FETCH>
      <FETCH>Address</FETCH>
      <FETCH>IncomeTaxNumber</FETCH>
      <FETCH>PartyGSTIN</FETCH>
      <FETCH>EMAIL</FETCH>
      <FETCH>STATENAME</FETCH>
      <FETCH>PINCODE</FETCH>
      </FETCHLIST>
      <TDL>
      <TDLMESSAGE>
      <OBJECT NAME="Company" ISINITIALIZE="Yes">
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
            
    const company = result.ENVELOPE.BODY[0].DATA[0].TALLYMESSAGE[0].COMPANY[0];
    const address = company['ADDRESS.LIST'][0].ADDRESS;
    // let gstin = ledger && ledger.PARTYGSTIN ? ledger.PARTYGSTIN[0]._ : undefined ;
    // if(gstin === undefined)
    // {
    //   gstin='';
    // }
    const name = company.$.NAME;
    const email = company.EMAIL[0]._;
    const state = company.STATENAME[0]._;
    const pincode = company.PINCODE[0]._;
    let incometaxno = company && company.INCOMETAXNUMBER ? company.INCOMETAXNUMBER[0]._ : undefined ;
    if(incometaxno === undefined)
    {
      incometaxno='';
    }
    const companydetails = { Name : name, address : address, incometaxno : incometaxno, email : email, state : state, pincode : pincode};
    resolve (companydetails);
          });
      });
    });
  
  }

  module.exports=getCompanyDetails;

  async function n2()
  {
    const h = await getCompanyDetails();
    console.log(h.address[1]);
  }
//   n2();