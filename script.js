// for (key in countryList){
//     console.log(key, countryList[key]);
// }
const baseURL = 'https://v6.exchangerate-api.com/v6/3c4b46a76efcd74bebcb2cc7/latest';

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.To select');
const msg = document.querySelector('.msg');
const arrowBtn = document.querySelector('form i');
const flag1 = document.getElementById('flag_1');
const flag2 = document.getElementById('flag_2');



// console.log(dropdowns);

for (let select of dropdowns){
    for (currCode in countryList ){
        
        let newOption = document.createElement('option');
        console.log(newOption);
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name == 'from' && currCode == 'USD'){
            newOption.selected = true;
        }else if (select.name == 'To' && currCode == 'INR'){
            newOption .selected =true;
        }
        select.append(newOption);

        // newOption.setAttribute('data-image',`https://flagsapi.com/${countryList[currCode]}/shiny/64.png`);
        // let cImg = document.createElement('img');
        // cImg.src = `https://flagsapi.com/${countryList[currCode]}/shiny/64.png`;
        // select.append(cImg);
    }

    select.addEventListener('change', (e)=>{
        updateFlag(e.target)
    })
}

const updateFlag = (element) => {

    //  console.log(element, element.value);
     let currCode = element.value;
     let countryCode = countryList[currCode];

     let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;

     let img = element.parentElement.querySelector('img');
     img.src = newSrc;

}

const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal == '' || amtVal < 1){
        amtVal = 1;
        amount.value = '1';
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL = `${baseURL}/${fromCurr.value}`
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data.conversion_rates[toCurr.value]);

    let exRate = data.conversion_rates[toCurr.value];

    let finalAmt = amtVal * exRate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    
}

btn.addEventListener('click', (event)=>{
    event.preventDefault();
    updateExchangeRate();
})


window.addEventListener('load',()=>{
    updateExchangeRate();
})

arrowBtn.addEventListener('click',()=>{
    let tempVal = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempVal;
    updateExchangeRate();

    const tempSrc = flag1.src;
    flag1.src = flag2.src;
    flag2.src = tempSrc;
    
})

