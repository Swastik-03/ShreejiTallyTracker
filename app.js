const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const request = require("request");
const xml2js = require('xml2js');
const CreatePurchaseOrder =require('./CreatePurchaseOrder.js');
const getItems = require('./getItems.js');
const getVoucherTypes = require('./getVouchertypes.js');
const getReport = require('./getReport.js');
const vouchNo = require('./vouchNo.js');
const getPartyName = require('./getPartyName.js');
const getPartyDetails =require('./getPartyDetails.js');
const getCompanyDetails = require('./getCompanyDetail.js');
const CreateSalesOrder = require('./CreateSalesOrder.js');
const getItemDetails = require('./getItemDetails.js');
const getStateCode = require('./getStateCode.js');
const toword = require('./toword.js');
// const convert = require("xml-js");
// const parser = new convert.parser({explicitArray: false});

app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




//Complete important


 

//Sites Important

app.get('/',(req,res)=>{
  res.render('login.ejs');
})

app.get('/ViewOrder',async(req,res)=>{
  try{
    const p= await getReport('HTML','Purchase Order');
    res.end(p);
  } catch (err) {
    console.log(err.message);
  }
})


app.get('/FormP',async(req,res)=>{
  res.render('Form');
})
app.post('/FormP', async (req, res) => {
  const Address=req.body.Address;
  const BOT=req.body.BOT;
  const Date=req.body.Date.replace(/-/g, "");
  const PGST=req.body.PGST;
  const POS=req.body.POS;
  const PName=req.body.PName;
  const Sby=req.body.Sby;
  const BOR=req.body.BOR;
  const Vslno=req.body.Vslno;
  const DueD=req.body.DueD;
  const BuyPin=req.body.BuyPin;
  const Rate=req.body.Rate;
  const Quantity=req.body.Quantity;
  const Amount=req.body.Amount;
  const Godown=req.body.Godown;
  const Item = await getItemDetails(req.body.Item);
  const state=req.body.state;
  const pincode = req.body.pincode;
  console.log(pincode);
  console.log(state);
  console.log(Item);
  const guid=guidgen();
  


  let vouchN= await vouchNo('Purchase Order');
  const companydetails = await getCompanyDetails();
  companydetails.stateCode = getStateCode(companydetails.state);
  const stateCode= getStateCode(state);
  const amountwords = toword(Amount);
  console.log(vouchN);
  console.log(companydetails);

  const result = await CreatePurchaseOrder(Address,BOT,Date,PGST,POS,PName,Sby,BOR,Vslno,DueD,BuyPin,Rate,Quantity,Amount,Godown,parseInt(vouchN)+1,guid,Item,companydetails);
  console.log('Created = ' + result.CREATED[0]);
  if(result.CREATED[0]== 1){
    const partydetail={Address : Address, PGST : PGST ,PName : PName ,BuyPin : BuyPin ,state : state, pincode : pincode ,stateCode : stateCode }
    const Consigneedetail = {Address : companydetails.address , PGST : "23ABGCS3840J1ZB" ,PName : companydetails.Name , BuyPin : companydetails.incometaxno , state : companydetails.state , pincode : companydetails.pincode , stateCode : companydetails.stateCode};
    const detail={ BOT : BOT, Date : req.body.Date,  POS : POS ,  Sby : Sby , BOR : BOR , Vslno : Vslno, DueD : DueD ,  Rate : Rate , Quantity : Quantity , Amount : Amount , Godown : Godown , Item : Item ,  vouchNo : parseInt(vouchN)+1 , companydetails : companydetails ,  amountwords : amountwords, partydetail : partydetail , Consigneedetail : Consigneedetail, order : "PURCHASE ORDER" , bill : "Supplier (Bill from)"};
    res.render('SaleReciept.ejs',{detail});
  }

})

const port=3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));




// Final Important Collection to get voucher type

// getVoucherTypes();


// setPurchase();
function guidgen()
{
  const crypto = require('crypto');
  const { v4: uuidv4 } = require('uuid');
  const guid = uuidv4();
  // console.log(guid);
  return guid;
}

app.get('/partysale',async(req,res)=>{
  const datap= { ledgerNames:await getPartyName(),
                 Items: await getItems()
               };
  datap.posttype='/partysale';
  // let ledgerNames= await getPartyName();
  // let Items = await getItems();
  // console.log(ledgerNames.length);
  res.render('PartyName',{datap});
  });

  app.post('/partysale',async(req,res)=>{
    const pname=req.body.partyname;
    const pdetails = await getPartyDetails(pname);
    // console.log(req.body.Item);
    pdetails.Item= req.body.Item;
    pdetails.posttype='/FormS';
    // console.log(pdetails);
   
    res.render('Form',{pdetails});
  });

  app.post('/FormS', async (req, res) => {
    const Address=req.body.Address;
    const BOT=req.body.BOT;
    const Date=req.body.Date.replace(/-/g, "");
    const PGST=req.body.PGST;
    const POS=req.body.POS;
    const PName=req.body.PName;
    const Sby=req.body.Sby;
    const BOR=req.body.BOR;
    const Vslno=req.body.Vslno;
    const DueD=req.body.DueD;
    const BuyPin=req.body.BuyPin;
    const Rate=req.body.Rate;
    const Quantity=req.body.Quantity;
    const Amount=req.body.Amount;
    const Godown=req.body.Godown;
    const Item = await getItemDetails(req.body.Item);
    const state= req.body.state;
    const pincode = req.body.pincode;
    console.log(pincode);
    console.log(state);
    console.log(Item);
    const guid=guidgen();
    
  
  
    let vouchN= await vouchNo('Sales Order');
    const companydetails = await getCompanyDetails();
    console.log(companydetails);
    companydetails.stateCode = getStateCode(companydetails.state);
    const stateCode= getStateCode(state);
    const amountwords = toword(Amount);
    // console.log(vouchN);
   const result= await CreateSalesOrder(Address,BOT,Date,PGST,POS,PName,Sby,BOR,Vslno,DueD,BuyPin,Rate,Quantity,Amount,Godown,parseInt(vouchN)+1,guid,Item,companydetails,state,pincode);
   console.log('Created = ' + result.CREATED[0]);
   if(result.CREATED[0]== 1){
    const partydetail={Address : Address, PGST : PGST ,PName : PName ,BuyPin : BuyPin ,state : state, pincode : pincode ,stateCode : stateCode }
    
    const Consigneedetail = partydetail;
    const detail={ BOT : BOT, Date : req.body.Date,  POS : POS ,  Sby : Sby , BOR : BOR , Vslno : Vslno, DueD : DueD ,  Rate : Rate , Quantity : Quantity , Amount : Amount , Godown : Godown , Item : Item ,  vouchNo : parseInt(vouchN)+1 , companydetails : companydetails ,  amountwords : amountwords, partydetail : partydetail , Consigneedetail : Consigneedetail, order : "SALES ORDER" , bill : "Buyer (Bill to)"};
    res.render('SaleReciept.ejs',{detail});
   }
  })


app.get('/partypur',async(req,res)=>{
const datap= { ledgerNames:await getPartyName(),
               Items: await getItems()
             };
datap.posttype='/partypur';
// let ledgerNames= await getPartyName();
// let Items = await getItems();
// console.log(ledgerNames.length);
res.render('PartyName',{datap});
});

app.post('/partypur',async(req,res)=>{
  const pname=req.body.partyname;
  const pdetails = await getPartyDetails(pname);
  // console.log(req.body.Item);
  pdetails.Item= req.body.Item;
  pdetails.posttype='/FormP';
  // console.log(pdetails);

  res.render('Form',{pdetails});
})



