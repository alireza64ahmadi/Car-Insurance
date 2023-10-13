// Variables
const form = document.querySelector('#request-quote')


// Events
document.addEventListener('DOMContentLoaded', afterLoad)
document.addEventListener('submit', submitForm)


// Functions
function afterLoad() {
    displayYears()
}
// submit form
function submitForm(e) {
    e.preventDefault();

    // read value from the form
    const make = document.querySelector('#make').value
    const year = document.querySelector('#year').value
    const level = document.querySelector('input[name="level"]:checked').value

    // check the value of fileds are correct
    if (make === "" || year === "" || level === "") {
        displayMsg('لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر')
    } else {
        // STEP1: get info
        let insuranceCase = {
            make: make,
            year: year,
            level: level
        }

        // STEP2: calculate
        calculatePrice(insuranceCase)

        // STEP3: show result message box
    }
}

function calculatePrice(info) {
    let price = 0, base = 2000000

    // + Calculate Make 
    /* 
    make:1      =>      1.15
    make:2      =>      1.30
    make:3      =>      1.80
    */
    const make = info.make
    switch (make) {
        case "1":
            price = base * 1.15
            break;
        case "2":
            price = base * 1.30
            break;
        case "3":
            price = base * 1.80
            break;
    }
    
    const year = info.year


    // + Calculate Year
    // get the year

    // 3% cheaper for each year
    price = price - ((findYear(year) * 3) / 100) * price
    console.log(price);


    // + get the level
    const level = info.level
    price = calculateLevel(level , price)
}
// find now year 
function findYear(year){
    

    // get max year
    const now = new Date().toLocaleDateString('fa-IR')
    let nowYear = now.slice(0, 4)
    let max = fixNumbers(nowYear)
    year = max - year
    return year
}

function calculateLevel(level , price){
    /*
        basic   =>  increase 30%
        complete=>  increase 50%
    */

    if (level == 'basic'){
        // price = price + (price * 0.30) (bara mehrdad)
        price = price * 1.3
    }else{
        price = price * 1.5
    }

    return price
}


// User Interface (UI) Functions
// Display message box
function displayMsg(msg) {
    // create message box
    const messageBox = document.createElement('div');
    messageBox.classList = 'error'
    messageBox.innerText = msg

    // show message
    form.insertBefore(messageBox, document.querySelector('.form-group'))

    // remove message box
    setTimeout(() => {
        document.querySelector('.error').remove()
    }, 5000)
}

// Show Years
function displayYears() {
    // Convert to number
 
    // get now years
    let curentYear = new Date().toLocaleDateString('fa-IR')

    // Slice date
    curentYear = curentYear.slice(0, 4)

    // get max year
    let maxYear = fixNumbers(curentYear)

    // get min year
    let minYear = maxYear - 20

    // access to the select tag
    const selectYear = document.querySelector('#year')

    // create first option tag for title
    // create option tag
    const optionTag = document.createElement('option')
    optionTag.innerText = `- انتخاب -`;
    // optionTag.value = ''
    // append option to the selectYear
    selectYear.appendChild(optionTag)

    // create for loop for making option tag
    for (let i = maxYear; i >= minYear; i--) {
        // create option tag
        const optionTag = document.createElement('option')
        optionTag.value = i;
        optionTag.innerText = `سال ${i}`;

        // append option to the selectYear
        selectYear.appendChild(optionTag)
    }
}
