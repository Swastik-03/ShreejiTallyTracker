// Function to get the state code from state name
function getStateCode(stateName) {
    const stateCodes = {
      'Jammu & Kashmir': '01',
      'West Bengal': '19',
      'Himachal Pradesh': '02',
      'Jharkhand': '20',
      'Punjab': '03',
      'Chandigarh': '04',
      'Uttarakhand': '05',
      'Haryana': '06',
      'Delhi': '07',
      'Rajasthan': '08',
      'Uttar Pradesh': '09',
      'Bihar': '10',
      'Sikkim': '11',
      'Arunachal Pradesh': '12',
      'Nagaland': '13',
      'Manipur': '14',
      'Mizoram': '15',
      'Tripura': '16',
      'Meghalaya': '17',
      'Assam': '18',
      'Orissa': '21',
      'Chhattisgarh': '22',
      'Madhya Pradesh': '23',
      'Gujarat': '24',
      'Daman & Diu': '25',
      'Dadra & Nagar Haveli': '26',
      'Maharashtra': '27',
      'Andhra Pradesh (Old)': '28',
      'Karnataka': '29',
      'Goa': '30',
      'Lakshadweep': '31',
      'Kerala': '32',
      'Tamil Nadu': '33',
      'Puducherry': '34',
      'Andaman & Nicobar Islands': '35',
      'Telengana': '36',
      'Andhra Pradesh': '37'
    };
  
    return stateCodes[stateName] || null;
  }

  module.exports = getStateCode;

//   console.log(getStateCode('Uttar Pradesh'))
  
  // Usage example
//   const stateName = 'Maharashtra';
//   const stateCode = getStateCode(stateName);
  
//   if (stateCode) {
//     console.log(`State Name: ${stateName}, State Code: ${stateCode}`);
//   } else {
//     console.log('Invalid state name.');
//   }
  