const request = require("request");
const bodyParser = require("body-parser");
const xml2js = require('xml2js');


function getReport(format,Order)
{

return new Promise((resolve, reject)=>
{
  var options = { method: 'POST',
  url: 'http://localhost:9000',
  headers: 
  { 'cache-control': 'no-cache',
    'Content-Type': 'text/xml' },
  body:
 ` <ENVELOPE>
<HEADER>
<TALLYREQUEST>Export Data</TALLYREQUEST>
</HEADER>
<BODY>
<EXPORTDATA>
<REQUESTDESC>
<STATICVARIABLES>

<!--Specify the Voucher Type here-->
<VOUCHERTYPENAME>${Order}</VOUCHERTYPENAME>

<!--Specify the Export format here  HTML or XML or SDF-->
<SVEXPORTFORMAT>$$SysName:${format}</SVEXPORTFORMAT>

<!--Set the Columnar format variable here -->
<COLUMNARDAYBOOK>Yes</COLUMNARDAYBOOK>

<!--Set the SVColumntype variable here -->
<SVCOLUMNTYPE>$$SysName:AllItems</SVCOLUMNTYPE>

</STATICVARIABLES>

<!--Specify the Report Name here-->
<REPORTNAME>Voucher Register</REPORTNAME>

</REQUESTDESC>
</EXPORTDATA>
</BODY>
</ENVELOPE>`

 };
  request(options, function (error, response, body) {
    if(error){
      reject(error);
    }
    else {
      resolve(body)
    }
  });
});
}   
module.exports = getReport;