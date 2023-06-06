const request = require("request");
const xml2js = require('xml2js');

function CreateSalesOrder(Address,BOT,Date,PGST,POS,PName,Sby,BOR,Vslno,DueD,BuyPin,Rate,Quantity,Amount,Godown,vouchN,guid,Item,companydetails,state,pincode){
return new Promise((resolve, reject)=>{
    let bodyX=`<ENVELOPE>
    <HEADER>
     <TALLYREQUEST>Import Data</TALLYREQUEST>
    </HEADER>
    <BODY>
     <IMPORTDATA>
      <REQUESTDESC>
       <REPORTNAME>Vouchers</REPORTNAME>
       <STATICVARIABLES>
        <SVCURRENTCOMPANY>${companydetails.Name}</SVCURRENTCOMPANY>
       </STATICVARIABLES>
      </REQUESTDESC>
      <REQUESTDATA>
       <TALLYMESSAGE xmlns:UDF="TallyUDF">
        <VOUCHER REMOTEID="${guid}" VCHKEY="${guid}-0000aff7:00000038" VCHTYPE="Sales Order" ACTION="Create" OBJVIEW="Invoice Voucher View">
         <ADDRESS.LIST TYPE="String">
          <ADDRESS>${Address}</ADDRESS>
         </ADDRESS.LIST>
         <BASICBUYERADDRESS.LIST TYPE="String">
          <BASICBUYERADDRESS>${Address}</BASICBUYERADDRESS>
         </BASICBUYERADDRESS.LIST>
         <BASICORDERTERMS.LIST TYPE="String">
          <BASICORDERTERMS>${BOT}</BASICORDERTERMS>
         </BASICORDERTERMS.LIST>
         <OLDAUDITENTRYIDS.LIST TYPE="Number">
          <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
         </OLDAUDITENTRYIDS.LIST>
         <DATE>${Date}</DATE>
         <GUID>${guid}</GUID>
         <GSTREGISTRATIONTYPE>Regular</GSTREGISTRATIONTYPE>
         <VATDEALERTYPE>Regular</VATDEALERTYPE>
         <STATENAME>${state}</STATENAME>
         <VOUCHERTYPENAME>Sales Order</VOUCHERTYPENAME>
         <COUNTRYOFRESIDENCE>India</COUNTRYOFRESIDENCE>
         <PARTYGSTIN>${PGST}</PARTYGSTIN>
         <PLACEOFSUPPLY>${state}</PLACEOFSUPPLY>
         <TAXUNITNAME>Default Tax Unit</TAXUNITNAME>
         <PARTYNAME>${PName}</PARTYNAME>
         <PARTYLEDGERNAME>${PName}</PARTYLEDGERNAME>
         <REFERENCE>${vouchN}</REFERENCE>
         <PARTYMAILINGNAME>${PName}</PARTYMAILINGNAME>
         <PARTYPINCODE>${pincode}</PARTYPINCODE>
         <CONSIGNEEGSTIN>${PGST}</CONSIGNEEGSTIN>
         <CONSIGNEEMAILINGNAME>${PName}</CONSIGNEEMAILINGNAME>
         <CONSIGNEEPINCODE>${pincode}</CONSIGNEEPINCODE>
         <CONSIGNEESTATENAME>${state}</CONSIGNEESTATENAME>
         <VOUCHERNUMBER>${vouchN}</VOUCHERNUMBER>
         <BASICBASEPARTYNAME>${PName}</BASICBASEPARTYNAME>
         <CSTFORMISSUETYPE/>
         <CSTFORMRECVTYPE/>
         <FBTPAYMENTTYPE>Default</FBTPAYMENTTYPE>
         <PERSISTEDVIEW>Invoice Voucher View</PERSISTEDVIEW>
         <BASICSHIPPEDBY>${Sby}</BASICSHIPPEDBY>
         <BASICBUYERNAME>${PName}</BASICBUYERNAME>
         <BASICFINALDESTINATION>${state}</BASICFINALDESTINATION>
         <BASICORDERREF>${BOR}</BASICORDERREF>
         <BASICSHIPVESSELNO>${Vslno}</BASICSHIPVESSELNO>
         <BASICDUEDATEOFPYMT>${DueD} Days</BASICDUEDATEOFPYMT>
         <CONSIGNEECOUNTRYNAME>India</CONSIGNEECOUNTRYNAME>
         <VCHGSTCLASS/>
         <BUYERPINNUMBER>${BuyPin}</BUYERPINNUMBER>
         <CONSIGNEEPINNUMBER>${BuyPin}</CONSIGNEEPINNUMBER>
         <DIFFACTUALQTY>No</DIFFACTUALQTY>
         <ISMSTFROMSYNC>No</ISMSTFROMSYNC>
         <ISDELETED>No</ISDELETED>
         <ISSECURITYONWHENENTERED>No</ISSECURITYONWHENENTERED>
         <ASORIGINAL>No</ASORIGINAL>
         <AUDITED>No</AUDITED>
         <FORJOBCOSTING>No</FORJOBCOSTING>
         <ISOPTIONAL>No</ISOPTIONAL>
         <EFFECTIVEDATE>${Date}</EFFECTIVEDATE>
         <USEFOREXCISE>No</USEFOREXCISE>
         <ISFORJOBWORKIN>No</ISFORJOBWORKIN>
         <ALLOWCONSUMPTION>No</ALLOWCONSUMPTION>
         <USEFORINTEREST>No</USEFORINTEREST>
         <USEFORGAINLOSS>No</USEFORGAINLOSS>
         <USEFORGODOWNTRANSFER>No</USEFORGODOWNTRANSFER>
         <USEFORCOMPOUND>No</USEFORCOMPOUND>
         <USEFORSERVICETAX>No</USEFORSERVICETAX>
         <ISONHOLD>No</ISONHOLD>
         <ISBOENOTAPPLICABLE>No</ISBOENOTAPPLICABLE>
         <ISGSTSECSEVENAPPLICABLE>No</ISGSTSECSEVENAPPLICABLE>
         <ISEXCISEVOUCHER>No</ISEXCISEVOUCHER>
         <EXCISETAXOVERRIDE>No</EXCISETAXOVERRIDE>
         <USEFORTAXUNITTRANSFER>No</USEFORTAXUNITTRANSFER>
         <IGNOREPOSVALIDATION>No</IGNOREPOSVALIDATION>
         <EXCISEOPENING>No</EXCISEOPENING>
         <USEFORFINALPRODUCTION>No</USEFORFINALPRODUCTION>
         <ISTDSOVERRIDDEN>No</ISTDSOVERRIDDEN>
         <ISTCSOVERRIDDEN>No</ISTCSOVERRIDDEN>
         <ISTDSTCSCASHVCH>No</ISTDSTCSCASHVCH>
         <INCLUDEADVPYMTVCH>No</INCLUDEADVPYMTVCH>
         <ISSUBWORKSCONTRACT>No</ISSUBWORKSCONTRACT>
         <ISVATOVERRIDDEN>No</ISVATOVERRIDDEN>
         <IGNOREORIGVCHDATE>No</IGNOREORIGVCHDATE>
         <ISVATPAIDATCUSTOMS>No</ISVATPAIDATCUSTOMS>
         <ISDECLAREDTOCUSTOMS>No</ISDECLAREDTOCUSTOMS>
         <ISSERVICETAXOVERRIDDEN>No</ISSERVICETAXOVERRIDDEN>
         <ISISDVOUCHER>No</ISISDVOUCHER>
         <ISEXCISEOVERRIDDEN>No</ISEXCISEOVERRIDDEN>
         <ISEXCISESUPPLYVCH>No</ISEXCISESUPPLYVCH>
         <ISGSTOVERRIDDEN>No</ISGSTOVERRIDDEN>
         <GSTNOTEXPORTED>No</GSTNOTEXPORTED>
         <IGNOREGSTINVALIDATION>No</IGNOREGSTINVALIDATION>
         <ISGSTREFUND>No</ISGSTREFUND>
         <OVRDNEWAYBILLAPPLICABILITY>No</OVRDNEWAYBILLAPPLICABILITY>
         <ISVATPRINCIPALACCOUNT>No</ISVATPRINCIPALACCOUNT>
         <IGNOREEINVVALIDATION>No</IGNOREEINVVALIDATION>
         <IRNJSONEXPORTED>No</IRNJSONEXPORTED>
         <IRNCANCELLED>No</IRNCANCELLED>
         <ISSHIPPINGWITHINSTATE>No</ISSHIPPINGWITHINSTATE>
         <ISOVERSEASTOURISTTRANS>No</ISOVERSEASTOURISTTRANS>
         <ISDESIGNATEDZONEPARTY>No</ISDESIGNATEDZONEPARTY>
         <ISCANCELLED>No</ISCANCELLED>
         <HASCASHFLOW>No</HASCASHFLOW>
         <ISPOSTDATED>No</ISPOSTDATED>
         <USETRACKINGNUMBER>No</USETRACKINGNUMBER>
         <ISINVOICE>No</ISINVOICE>
         <MFGJOURNAL>No</MFGJOURNAL>
         <HASDISCOUNTS>No</HASDISCOUNTS>
         <ASPAYSLIP>No</ASPAYSLIP>
         <ISCOSTCENTRE>No</ISCOSTCENTRE>
         <ISSTXNONREALIZEDVCH>No</ISSTXNONREALIZEDVCH>
         <ISEXCISEMANUFACTURERON>No</ISEXCISEMANUFACTURERON>
         <ISBLANKCHEQUE>No</ISBLANKCHEQUE>
         <ISVOID>No</ISVOID>
         <ORDERLINESTATUS>No</ORDERLINESTATUS>
         <VATISAGNSTCANCSALES>No</VATISAGNSTCANCSALES>
         <VATISPURCEXEMPTED>No</VATISPURCEXEMPTED>
         <ISVATRESTAXINVOICE>No</ISVATRESTAXINVOICE>
         <VATISASSESABLECALCVCH>No</VATISASSESABLECALCVCH>
         <ISVATDUTYPAID>Yes</ISVATDUTYPAID>
         <ISDELIVERYSAMEASCONSIGNEE>No</ISDELIVERYSAMEASCONSIGNEE>
         <ISDISPATCHSAMEASCONSIGNOR>No</ISDISPATCHSAMEASCONSIGNOR>
         <ISDELETEDVCHRETAINED>No</ISDELETEDVCHRETAINED>
         <CHANGEVCHMODE>No</CHANGEVCHMODE>
         <RESETIRNQRCODE>No</RESETIRNQRCODE>
         <EWAYBILLDETAILS.LIST>      </EWAYBILLDETAILS.LIST>
         <EXCLUDEDTAXATIONS.LIST>      </EXCLUDEDTAXATIONS.LIST>
         <OLDAUDITENTRIES.LIST>      </OLDAUDITENTRIES.LIST>
         <ACCOUNTAUDITENTRIES.LIST>      </ACCOUNTAUDITENTRIES.LIST>
         <AUDITENTRIES.LIST>      </AUDITENTRIES.LIST>
         <DUTYHEADDETAILS.LIST>      </DUTYHEADDETAILS.LIST>
         <ALLINVENTORYENTRIES.LIST>
          <STOCKITEMNAME>${Item.Name}</STOCKITEMNAME>
          <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
          <ISLASTDEEMEDPOSITIVE>No</ISLASTDEEMEDPOSITIVE>
          <ISAUTONEGATE>No</ISAUTONEGATE>
          <ISCUSTOMSCLEARANCE>No</ISCUSTOMSCLEARANCE>
          <ISTRACKCOMPONENT>No</ISTRACKCOMPONENT>
          <ISTRACKPRODUCTION>No</ISTRACKPRODUCTION>
          <ISPRIMARYITEM>No</ISPRIMARYITEM>
          <ISSCRAP>No</ISSCRAP>
          <RATE>${Rate}/MT</RATE>
          <AMOUNT>${Amount}</AMOUNT>
          <ACTUALQTY> ${Quantity} MT</ACTUALQTY>
          <BILLEDQTY> ${Quantity} MT</BILLEDQTY>
          <BATCHALLOCATIONS.LIST>
           <GODOWNNAME>${Godown}</GODOWNNAME>
           <BATCHNAME>Primary Batch</BATCHNAME>
           <DESTINATIONGODOWNNAME>${Godown}</DESTINATIONGODOWNNAME>
           <INDENTNO/>
           <ORDERNO>${vouchN}</ORDERNO>
           <TRACKINGNUMBER/>
           <DYNAMICCSTISCLEARED>No</DYNAMICCSTISCLEARED>
           <AMOUNT>${Amount}</AMOUNT>
           <ACTUALQTY> ${Quantity} MT</ACTUALQTY>
           <BILLEDQTY> ${Quantity} MT</BILLEDQTY>
           <ORDERDUEDATE JD="45047" P="${DueD} Days">${DueD} Days</ORDERDUEDATE>
           <ADDITIONALDETAILS.LIST>        </ADDITIONALDETAILS.LIST>
           <VOUCHERCOMPONENTLIST.LIST>        </VOUCHERCOMPONENTLIST.LIST>
          </BATCHALLOCATIONS.LIST>
          <ACCOUNTINGALLOCATIONS.LIST>
           <OLDAUDITENTRYIDS.LIST TYPE="Number">
            <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
           </OLDAUDITENTRYIDS.LIST>
           <LEDGERNAME>SALES</LEDGERNAME>
           <GSTCLASS/>
           <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
           <LEDGERFROMITEM>No</LEDGERFROMITEM>
           <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
           <ISPARTYLEDGER>No</ISPARTYLEDGER>
           <ISLASTDEEMEDPOSITIVE>No</ISLASTDEEMEDPOSITIVE>
           <ISCAPVATTAXALTERED>No</ISCAPVATTAXALTERED>
           <ISCAPVATNOTCLAIMED>No</ISCAPVATNOTCLAIMED>
           <AMOUNT>${Amount}</AMOUNT>
           <SERVICETAXDETAILS.LIST>        </SERVICETAXDETAILS.LIST>
           <BANKALLOCATIONS.LIST>        </BANKALLOCATIONS.LIST>
           <BILLALLOCATIONS.LIST>        </BILLALLOCATIONS.LIST>
           <INTERESTCOLLECTION.LIST>        </INTERESTCOLLECTION.LIST>
           <OLDAUDITENTRIES.LIST>        </OLDAUDITENTRIES.LIST>
           <ACCOUNTAUDITENTRIES.LIST>        </ACCOUNTAUDITENTRIES.LIST>
           <AUDITENTRIES.LIST>        </AUDITENTRIES.LIST>
           <INPUTCRALLOCS.LIST>        </INPUTCRALLOCS.LIST>
           <DUTYHEADDETAILS.LIST>        </DUTYHEADDETAILS.LIST>
           <EXCISEDUTYHEADDETAILS.LIST>        </EXCISEDUTYHEADDETAILS.LIST>
           <RATEDETAILS.LIST>        </RATEDETAILS.LIST>
           <SUMMARYALLOCS.LIST>        </SUMMARYALLOCS.LIST>
           <STPYMTDETAILS.LIST>        </STPYMTDETAILS.LIST>
           <EXCISEPAYMENTALLOCATIONS.LIST>        </EXCISEPAYMENTALLOCATIONS.LIST>
           <TAXBILLALLOCATIONS.LIST>        </TAXBILLALLOCATIONS.LIST>
           <TAXOBJECTALLOCATIONS.LIST>        </TAXOBJECTALLOCATIONS.LIST>
           <TDSEXPENSEALLOCATIONS.LIST>        </TDSEXPENSEALLOCATIONS.LIST>
           <VATSTATUTORYDETAILS.LIST>        </VATSTATUTORYDETAILS.LIST>
           <COSTTRACKALLOCATIONS.LIST>        </COSTTRACKALLOCATIONS.LIST>
           <REFVOUCHERDETAILS.LIST>        </REFVOUCHERDETAILS.LIST>
           <INVOICEWISEDETAILS.LIST>        </INVOICEWISEDETAILS.LIST>
           <VATITCDETAILS.LIST>        </VATITCDETAILS.LIST>
           <ADVANCETAXDETAILS.LIST>        </ADVANCETAXDETAILS.LIST>
          </ACCOUNTINGALLOCATIONS.LIST>
          <DUTYHEADDETAILS.LIST>       </DUTYHEADDETAILS.LIST>
          <SUPPLEMENTARYDUTYHEADDETAILS.LIST>       </SUPPLEMENTARYDUTYHEADDETAILS.LIST>
          <TAXOBJECTALLOCATIONS.LIST>       </TAXOBJECTALLOCATIONS.LIST>
          <REFVOUCHERDETAILS.LIST>       </REFVOUCHERDETAILS.LIST>
          <EXCISEALLOCATIONS.LIST>       </EXCISEALLOCATIONS.LIST>
          <EXPENSEALLOCATIONS.LIST>       </EXPENSEALLOCATIONS.LIST>
         </ALLINVENTORYENTRIES.LIST>
         <SUPPLEMENTARYDUTYHEADDETAILS.LIST>      </SUPPLEMENTARYDUTYHEADDETAILS.LIST>
         <EWAYBILLERRORLIST.LIST>      </EWAYBILLERRORLIST.LIST>
         <IRNERRORLIST.LIST>      </IRNERRORLIST.LIST>
         <INVOICEDELNOTES.LIST>      </INVOICEDELNOTES.LIST>
         <INVOICEORDERLIST.LIST>      </INVOICEORDERLIST.LIST>
         <INVOICEINDENTLIST.LIST>      </INVOICEINDENTLIST.LIST>
         <ATTENDANCEENTRIES.LIST>      </ATTENDANCEENTRIES.LIST>
         <ORIGINVOICEDETAILS.LIST>      </ORIGINVOICEDETAILS.LIST>
         <INVOICEEXPORTLIST.LIST>      </INVOICEEXPORTLIST.LIST>
         <LEDGERENTRIES.LIST>
          <OLDAUDITENTRYIDS.LIST TYPE="Number">
           <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
          </OLDAUDITENTRYIDS.LIST>
          <LEDGERNAME>${PName}</LEDGERNAME>
          <GSTCLASS/>
          <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
          <LEDGERFROMITEM>No</LEDGERFROMITEM>
          <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
          <ISPARTYLEDGER>Yes</ISPARTYLEDGER>
          <ISLASTDEEMEDPOSITIVE>Yes</ISLASTDEEMEDPOSITIVE>
          <ISCAPVATTAXALTERED>No</ISCAPVATTAXALTERED>
          <ISCAPVATNOTCLAIMED>No</ISCAPVATNOTCLAIMED>
          <AMOUNT>-${Amount}</AMOUNT>
          <SERVICETAXDETAILS.LIST>       </SERVICETAXDETAILS.LIST>
          <BANKALLOCATIONS.LIST>       </BANKALLOCATIONS.LIST>
          <BILLALLOCATIONS.LIST>       </BILLALLOCATIONS.LIST>
          <INTERESTCOLLECTION.LIST>       </INTERESTCOLLECTION.LIST>
          <OLDAUDITENTRIES.LIST>       </OLDAUDITENTRIES.LIST>
          <ACCOUNTAUDITENTRIES.LIST>       </ACCOUNTAUDITENTRIES.LIST>
          <AUDITENTRIES.LIST>       </AUDITENTRIES.LIST>
          <INPUTCRALLOCS.LIST>       </INPUTCRALLOCS.LIST>
          <DUTYHEADDETAILS.LIST>       </DUTYHEADDETAILS.LIST>
          <EXCISEDUTYHEADDETAILS.LIST>       </EXCISEDUTYHEADDETAILS.LIST>
          <RATEDETAILS.LIST>       </RATEDETAILS.LIST>
          <SUMMARYALLOCS.LIST>       </SUMMARYALLOCS.LIST>
          <STPYMTDETAILS.LIST>       </STPYMTDETAILS.LIST>
          <EXCISEPAYMENTALLOCATIONS.LIST>       </EXCISEPAYMENTALLOCATIONS.LIST>
          <TAXBILLALLOCATIONS.LIST>       </TAXBILLALLOCATIONS.LIST>
          <TAXOBJECTALLOCATIONS.LIST>       </TAXOBJECTALLOCATIONS.LIST>
          <TDSEXPENSEALLOCATIONS.LIST>       </TDSEXPENSEALLOCATIONS.LIST>
          <VATSTATUTORYDETAILS.LIST>       </VATSTATUTORYDETAILS.LIST>
          <COSTTRACKALLOCATIONS.LIST>       </COSTTRACKALLOCATIONS.LIST>
          <REFVOUCHERDETAILS.LIST>       </REFVOUCHERDETAILS.LIST>
          <INVOICEWISEDETAILS.LIST>       </INVOICEWISEDETAILS.LIST>
          <VATITCDETAILS.LIST>       </VATITCDETAILS.LIST>
          <ADVANCETAXDETAILS.LIST>       </ADVANCETAXDETAILS.LIST>
         </LEDGERENTRIES.LIST>
         <PAYROLLMODEOFPAYMENT.LIST>      </PAYROLLMODEOFPAYMENT.LIST>
         <ATTDRECORDS.LIST>      </ATTDRECORDS.LIST>
         <GSTEWAYCONSIGNORADDRESS.LIST>      </GSTEWAYCONSIGNORADDRESS.LIST>
         <GSTEWAYCONSIGNEEADDRESS.LIST>      </GSTEWAYCONSIGNEEADDRESS.LIST>
         <TEMPGSTRATEDETAILS.LIST>      </TEMPGSTRATEDETAILS.LIST>
        </VOUCHER>
       </TALLYMESSAGE>
       <TALLYMESSAGE xmlns:UDF="TallyUDF">
        <COMPANY>
         <REMOTECMPINFO.LIST MERGE="Yes">
          <NAME>e91833a1-99ea-4521-8bca-97c2badfb939</NAME>
          <REMOTECMPNAME>Shreeji Ingredients Pvt.Ltd.</REMOTECMPNAME>
          <REMOTECMPSTATE>Madhya Pradesh</REMOTECMPSTATE>
         </REMOTECMPINFO.LIST>
        </COMPANY>
       </TALLYMESSAGE>
       <TALLYMESSAGE xmlns:UDF="TallyUDF">
        <COMPANY>
         <REMOTECMPINFO.LIST MERGE="Yes">
          <NAME>e91833a1-99ea-4521-8bca-97c2badfb939</NAME>
          <REMOTECMPNAME>Shreeji Ingredients Pvt.Ltd.</REMOTECMPNAME>
          <REMOTECMPSTATE>Madhya Pradesh</REMOTECMPSTATE>
         </REMOTECMPINFO.LIST>
        </COMPANY>
       </TALLYMESSAGE>
      </REQUESTDATA>
     </IMPORTDATA>
    </BODY>
   </ENVELOPE>
   `;
    var options = { method: 'POST',
    url: 'http://localhost:9000',
    headers: 
    { 'cache-control': 'no-cache',
      'Content-Type': 'text/xml' },
    body: bodyX};
   try {
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    //   console.log(body);
    xml2js.parseString(body, (err, result)=>{
        if(err){
            console.error(err);
            return;
        }
        const response=result.RESPONSE;
        // console.log(response);
        resolve(response);

    })
    });
  } catch (err) {
    console.log('Error: ', err.message);
  }
});
  }

  module.exports=CreateSalesOrder;