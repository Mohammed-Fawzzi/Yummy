let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;


/******************************Loading*********************************/
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
    })
})


/*********************************Sidebar*****************************/
function openSideBar() {
    $(".sidebar").animate({
        left: 0
    }, 500)

    $(".open-close-icon").removeClass("fa-align-justify"); 
    $(".open-close-icon").addClass("fa-x"); 

    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideBar() {
    let boxWidth = $(".sidebar .nav-tab").outerWidth()
    $(".sidebar").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify"); 
    $(".open-close-icon").removeClass("fa-x"); 

    $(".links li").animate({
        top: 300
    }, 500)
}
closeSideBar()


$(".sidebar i.open-close-icon").click(() => {
    if ($(".sidebar").css("left") == "0px") {
        closeSideBar()
    } else {
        openSideBar()
    }
})


/***************************main page************************************/
async function getMeals() { 
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    respone = await respone.json()
    console.log(respone.meals);
    displayMeals(respone.meals)
    $(".inner-loading-screen").fadeOut(300)
}
getMeals()

function displayMeals(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" role="button" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}



/********************************Categories page******************************/
async function getCategories() { 
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)
}

async function getCategoryMeals(term) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`)
    response = await response.json()
    displayMeals(response.meals)
    $(".inner-loading-screen").fadeOut(300)
}

function displayCategories(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" role="button" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <!-- categoryDescriptionDiv -->
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}


/**************************Area page*******************************/
async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayArea(respone.meals) 
    $(".inner-loading-screen").fadeOut(300)
}

async function getAreaMeals(term) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`)
    response = await response.json()
    displayMeals(response.meals)
    $(".inner-loading-screen").fadeOut(300)
}

function displayArea(arr) { 
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" role="button"  class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}



/************************Ingredients page*******************************/
async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getIngredientsMeals(term) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
    response = await response.json()
    displayMeals(response.meals)
    $(".inner-loading-screen").fadeOut(300)
}

function displayIngredients(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" role="button" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}


/******************************Search page****************************/
async function searchByName(term) {
    closeSideBar()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

async function searchByFLetter(term) {
    closeSideBar()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    rowData.innerHTML = ""
}


/**************************Details page***************************/
async function getMealDetails(mealID) {
    closeSideBar()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)
}

function displayMealDetails(meal) {
    searchContainer.innerHTML = "";

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}


/***************************Contacts page*************************/
function showContacts() {
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" onkeyup="CheckValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameError" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>

            <div class="col-md-6">
                <input id="email" onkeyup="CheckValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailError" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>

            <div class="col-md-6">
                <input id="phone" onkeyup="CheckValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>

            <div class="col-md-6">
                <input id="age" onkeyup="CheckValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>

            <div class="col-md-6">
                <input  id="password" onkeyup="CheckValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>

            <div class="col-md-6">
                <input  id="repassword" onkeyup="CheckValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>

        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> 
`

    submitBtn = document.getElementById("submitBtn")

    searchContainer.innerHTML = ""

    document.getElementById("name").addEventListener("focus", () => {
        nameFocus = true
    })

    document.getElementById("email").addEventListener("focus", () => {
        emailFocus = true
    })

    document.getElementById("phone").addEventListener("focus", () => {
        phoneFocus = true
    })

    document.getElementById("age").addEventListener("focus", () => {
        ageFocus = true
    })

    document.getElementById("password").addEventListener("focus", () => {
        passwordFocus = true
    })

    document.getElementById("repassword").addEventListener("focus", () => {
        repasswordFocus = true
    })
}

let nameFocus = false;
let emailFocus = false;
let phoneFocus = false;
let ageFocus = false;
let passwordFocus = false;
let repasswordFocus = false;



/* Validate */

//Name Validation
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("name").value))
}

//Email Validation
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value))
}

//Phone Validation
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone").value))
}

// Age Validation
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
}

// Password Validation
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

// Repassword Validation
function repasswordValidation() {
    return document.getElementById("repassword").value == document.getElementById("password").value
}

function CheckValidation() {
    if (nameFocus) 
    {
        if (nameValidation()) 
        {
            document.getElementById("nameError").classList.replace("d-block", "d-none")
        } 
        else 
        {
            document.getElementById("nameError").classList.replace("d-none", "d-block")

        }
    }

    if (emailFocus) 
    {
        if (emailValidation()) 
        {
            document.getElementById("emailError").classList.replace("d-block", "d-none")
        } 
        else 
        {

            document.getElementById("emailError").classList.replace("d-none", "d-block")
        }
    }

    if (phoneFocus) 
    {
        if (phoneValidation()) 
        {
            document.getElementById("phoneError").classList.replace("d-block", "d-none")
        } 
        else 
        {
            document.getElementById("phoneError").classList.replace("d-none", "d-block")
        }
    }

    
    if (ageFocus) 
    {
        if (ageValidation()) 
        {
            document.getElementById("ageError").classList.replace("d-block", "d-none")
        } 
        else 
        {
            document.getElementById("ageError").classList.replace("d-none", "d-block")
        }
    }

    // check focus action for passwordInput is true
    if (passwordFocus) 
    {
        if (passwordValidation()) 
        {
            document.getElementById("passwordError").classList.replace("d-block", "d-none")
        } 
        else 
        {
            document.getElementById("passwordError").classList.replace("d-none", "d-block")
        }
    }

    // check focus action for repasswordInput is true
    if (repasswordFocus) 
    {
        if (repasswordValidation()) 
        {
            document.getElementById("repasswordError").classList.replace("d-block", "d-none")
        } 
        else 
        {
            document.getElementById("repasswordError").classList.replace("d-none", "d-block")

        }
    }

    // check all inputsValidation is true at the same time
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } 
    else 
    {
        submitBtn.setAttribute("disabled", true)
    }
}