const baseCurrency = document.getElementById('base-currency');
const targetCurrency = document.getElementById('target-currency');
const baseAmount = document.getElementById('base-amount');
const targetAmount = document.getElementById('target-amount');
const exchangeRate = document.getElementById('xrate');
const flipBtn = document.getElementById('flip');

function calculate(){

    const baseCode = baseCurrency.value;
    const targetCode  = targetCurrency.value;
    // console.log(baseCode,targetCode);
    fetch(`https://v6.exchangerate-api.com/v6/a43d02c063c1303f1c06c071/latest/${baseCode}`)
    .then(res => res.json())
    .then( data =>{
        const rate = data.conversion_rates[targetCode];
        exchangeRate.innerText= `1 ${baseCode} = ${rate} ${targetCode}`;
        targetAmount.value = (baseAmount.value * rate).toFixed(2);
    })
};
baseCurrency.addEventListener('change', calculate);
baseAmount.addEventListener('input',calculate);
targetCurrency.addEventListener('change', calculate);
targetAmount.addEventListener('input', calculate);


flipBtn.addEventListener('click', ()=>{
    const temp = baseCurrency.value;
    baseCurrency.value = targetCurrency.value;
    targetCurrency.value = temp;
    calculate();

})



calculate();


