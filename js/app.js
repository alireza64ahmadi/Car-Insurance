// varibales
const form = document.querySelector("#request-quote");



// event
document.addEventListener("DOMContentLoaded", afterLoad);
form.addEventListener("submit", checkSubmit);


// functions

// for loading the page 
function afterLoad() {
    displayYears()
}

function displayYears() {
    let minYear = maxYear() - 20

    const selectYear = document.querySelector('#year')

    // defult year
    defaultYear(selectYear)
    // 20 years ago
    years(selectYear, minYear)
}
// defult year
function defaultYear(selectYear) {
    // creat optin for select
    let creartOption = document.createElement('option')
    // pass empty value to option
    creartOption.value = ""
    // pass defult text to option
    creartOption.innerText = `- انتخاب کن-`
    // send option to select
    selectYear.appendChild(creartOption)
}

// years for pass to DOM
function years(selectYear, min) {
    for (let i = maxYear(); i >= min; i--) {
        // create option element
        let creartOption = document.createElement('option')
        // pass value to option
        creartOption.value = i
        // pass text to option element
        creartOption.innerText = `سال ${i}`
        // send option to select element
        selectYear.appendChild(creartOption)
    }
}

// find now year
function maxYear() {
    // new date
    let now = new Date().toLocaleDateString('fa-IR')
    // get full persion year
    now.slice(0, 4)
    // change persion string to english number
    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str) {
            if (typeof str === 'string') {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return str;
        };
    // max year
    let maxYear = parseInt(fixNumbers(now))
    return maxYear

}
// validation for checking form
function checkSubmit(e) {
    // not load when submit form
    e.preventDefault();
    // select values
    const make = document.querySelector("#make").value
    const year = document.querySelector("#year").value
    const level = document.querySelector("input[name='level']:checked").value

    // check form validity
    validaition(make, year, level)
}

// checking form
function validaition(make, year, level) {
    if (make === "" || year === "" || level === "") {
        displayError("لطفا فرم را کامل پر کنید")
    } else {
        // function for form value
        insuranceCase(make, year, level)
    }
}

// error function
function displayError(msg) {
    // creat div
    const errorDiv = document.createElement("div")
    // add class to div
    errorDiv.classList = "error"
    // pass massage to div
    errorDiv.innerText = msg
    // pass div to DOM
    form.insertBefore(errorDiv, document.querySelector(".form-group"))
    // after 5sec remove class 
    setTimeout(() => {
        // remov class from error div
        document.querySelector(".error").remove()
    }, 5000);
}

// value of form
function insuranceCase(inCarMake, inYear, inLevel) {
    let info = {
        carMake: inCarMake,
        carYear: inYear,
        level: inLevel
    }
    calculatePrice(info)
}

// price of insurance
function calculatePrice(info) {
    let price = 0,
        base = 2000000

    // price
    price = CalculateCar(price, base, info) - ((diffrence(info) * 3) / 100) * CalculateCar(price, base, info)
    console.log(price);
}

// price of car
function CalculateCar(price, base, info) {
    // + Calculate Make 
    /* 
    make:1      =>      1.15
    make:2      =>      1.30
    make:3      =>      1.80
    */

    switch (info.carMake) {
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
    return price
}

// price of year
function diffrence(info) {
    let year = info.carYear
    year = maxYear() - year
    return year
}