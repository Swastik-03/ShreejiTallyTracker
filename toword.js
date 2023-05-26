const { ToWords } = require('to-words');
const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: true,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: { // can be used to override defaults for the selected locale
        name: '',
        plural: '',
        symbol: '₹',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        },
      }
    }
  })

  function toword(amount){
    amountwords = toWords.convert(amount);
    return amountwords;
  }
 
module.exports = toword;
//   console.log(words);