

// cashe the DOM

const total_calories_daily_div = document.getElementById("total_calories_daily");
const total_carbs_daily_div = document.getElementById("total_carbs_daily");
const total_fats_daily_div = document.getElementById("total_fats_daily");
const total_protein_daily_div = document.getElementById("total_protein_daily");

const barcode_div = document.getElementById('new_food_barcode');
const foodName_div = document.getElementById('new_food_name');
const calories_div = document.getElementById('new_food_calories');
const fat_div =  document.getElementById('new_food_fat');
const protein_div = document.getElementById('new_food_protein');
const carbs_div = document.getElementById('new_food_carbs');

const foodIngested_div = document.getElementById('food_ingested');
const quanityIngested_div = document.getElementById('quanity_ingested');
const timeIngested_div = document.getElementById('time_ingested');
const dateIngested_div = document.getElementById('date_ingested');

const last_gki_reading_div= document.getElementById('gki_reading')
const last_gki_date_div= document.getElementById('gki_reading_date')
const last_gki_time_div= document.getElementById('gki_reading_time')




const currentMeal = {barcode:"",foodName:"",foodQuanity:0,timeConsumed:"",dateConsumed:"",}

let totalDailyCalories=0;
let totalDailyFat=0;
let totalDailyProtien=0;
let totalDailyCarbs=0;

let foodLogCounterid = '000000000000'

let foodLog = [
    {
        id: "000000000000",
        currentUserid : 00000,
        foodName: '',
        foodIntakeTime: '',
        foodIntakeDate: '',

    }
]
// foods added to this come from all useser serving a collective database that can be accessed by any useser when adding food
let foodList = [];

// this section holds user data
let currentActiveUser= ''
let currentActiveUserId= ''
let user = [
    { id: '00001',name: "Sam"},
    {id: '00002',name: "Holden"},
    {id: '00003',name: "Bella"}
]

//get current date
let currentDate= () =>{
    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    let d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
    console.log( m + "/" + d + "/" + y)
}
currentDate();

//get currentUSer at login - currenlty just assiging an id to the function call staticly so variables can be tested in the DOM

let getCurrentUser = (login) => {

    for (let i = 0; i < user.length; i++){
        
        if (user[i].id === login){
            currentActiveUser = user[i].name;
            currentActiveUserId = user[i].id;
            console.log(currentActiveUser)
            document.getElementById("nav_header").innerHTML = `${currentActiveUser}'s Food Intake`;
            return
        }
        else{
        const userNotFound = 'User could not be found';
        document.getElementById("nav_header").innerHTML = `${userNotFound}`;
        }
    }
}

getCurrentUser('00001');

// this function adds a new food to the foodList array once the user has hit the submit button
const food ={};

const addNEwFood = () => {
   const food = {
        barcode: barcode_div.value,
        foodName: foodName_div.value,
        calories: calories_div.value,
        fat: fat_div.value,
        protein: protein_div.value,
        carbs: carbs_div.value,
        userId: currentActiveUserId,
        userName: currentActiveUser
   }
   console.log(food)    
   foodList.push(food)
   console.log(foodList)

  

   const createNewFood =async () => {
    // e.preventDefault();

   await fetch('http://localhost:3000/post', {
        method: 'POST',
        body: JSON.stringify(food),
        headers: {'Content-Type': 'application/json'}
        })

}
    createNewFood();

//  Clear fields once form has been submited

        barcode_div.value='';
        foodName_div.value='';
        calories_div.value='';
        fat_div.value='';
        protein_div.value='';
        carbs_div.value='';
        
//    localStorage.setItem('Food List', JSON.stringify(foodList));
}

document.getElementById('add_new_food_button').addEventListener('click', addNEwFood)


// Get list of food to populate the log meal food dropdown

// const logMealList = () => {for (let i =0; i < foodList.length; i++){
//     return foodList.foodName;
  
    
// }
// }
// logMealList();
// console.log(foodList.foodName)

// Get the current input of Log Meal and store in array
const mealLog = [];
const newMeal = {};

const logMeal = () => {

    if (quanityIngested_div.value <= 0){
       alert ('Please enter a valid quanity!')
    }
    else {

    let newMeal = {
        food: foodIngested_div.value,
        quanity: quanityIngested_div.value,
        time: timeIngested_div.value,
        date: dateIngested_div.value,
        userId: currentActiveUserId,
        userName: currentActiveUser
    }
    console.log(newMeal);
    mealLog.push(newMeal);
    console.log(mealLog);

    foodIngested_div.value=''
    quanityIngested_div.value=''
    timeIngested_div.value=''
    dateIngested_div.value=''
   
}
}

const test = ()=>{
console.log(foodIngested_div.value);

        
}
document.getElementById('meal_log_submit').addEventListener('click',logMeal);


//get latest GKI reading and send current values to GKI Readings Array

const gkiReadings =[ ];
const latestGkiReading = {};

const getLatestGki = () => {
    let latestGkiReading = {
        reading: last_gki_reading_div.value,
        date: last_gki_date_div.value,
        time: last_gki_time_div.value,
        userId: currentActiveUserId,
        userName: currentActiveUser
    }

    console.log(latestGkiReading);
    gkiReadings.push(latestGkiReading);
    console.log(gkiReadings);

    last_gki_reading_div.value='';
    last_gki_date_div.value='';
    last_gki_time_div.value='';


}
document.getElementById('add_new_gki_button').addEventListener('click',getLatestGki);



//Store Data externally for later use  - Log Meals
//Store Data externally for later use  - New Food
//Store Data externally for later use  - GKI


// const renderPost = async () => {
//     let uri = 'http://localhost:3000/post';
//     const res = await fetch(uri);
//     const posts = await res.json();
//     console.log(posts);
// }
// window.addEventListener('DOMContentLoaded', renderPost());


// const form = document.querySelector('form');

// const createNewFood =async (e) => {
//     e.preventDefault();

//     await fetch('http://localhost:3000/post', {
//         method: 'POST',
//         body: JSON.stringify(food)
//         })

// }
// form.addEventListener('click', createNewFood);
