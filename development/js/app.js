document.addEventListener('DOMContentLoaded', function () {

    const dsktBtn = document.querySelector(".desktop-btn");
    const recpBtn = document.querySelector(".recipes-btn");
    const plansBtn = document.querySelector(".plans-btn");

    const desktop = document.querySelector(".desktop");
    const recipes = document.querySelector(".recipes");
    const plans = document.querySelector(".plans");
    const hello = document.querySelector(".hello-section");
    




    dsktBtn.addEventListener("click", function () {
        desktop.style.display = "block";
        recipes.style.display = "none";
        plans.style.display = "none";
        hello.style.display = "none";
    });

    recpBtn.addEventListener("click", function () {
        desktop.style.display = "none";
        recipes.style.display = "block";
        plans.style.display = "none";
        hello.style.display = "none";
    });

    plansBtn.addEventListener("click", function () {
        desktop.style.display = "none";
        recipes.style.display = "none";
        plans.style.display = "block";
        hello.style.display = "none";
    });


    //---------------------------------------------

    const buttons = document.querySelectorAll(".app-button");

    for (const el of buttons) {
        el.addEventListener("click", function () {
            for (const il of buttons) {
                il.classList.remove("choosen-button");
            }
            el.classList.add("choosen-button");

        });
    }


    //------------------------------------widgety - nowy przepis -------------------//

    const newRecipeBtn = document.querySelector(".add-recipe");
    const newRecipeWindow = document.querySelector(".new-recipe-window");
    const closeRecipe = document.querySelector(".close-recipe");
    const widgets = document.querySelector(".widgets");

    newRecipeBtn.addEventListener("click", function () {
        newRecipeWindow.style.display = "block";
        widgets.style.display = "none"
    });

    closeRecipe.addEventListener("click", function () {
        newRecipeWindow.style.display = "none";
        widgets.style.display = "flex"
    })

});
//------------------------------------widgety - nowy plan -------------------//
const newPlanBtn = document.querySelector(".add-plan");
const newPlanWindow = document.querySelector(".new-plan-window");
const closePlan = document.querySelector(".close-plan");
const widgets = document.querySelector(".widgets");
const table = document.querySelector(".new-plan-table");
const select_dish = table.querySelectorAll("td");
const planName = newPlanWindow.querySelector(".input-name");
const planDesc = newPlanWindow.querySelector("textarea");
const weeks = newPlanWindow.querySelector(".week-input");
const weekNr = document.querySelector("#week_nr");
newPlanBtn.addEventListener("click", function () {
    widgets.style.display = "none"
    newPlanWindow.style.display = "block";
});

const newPlan = {
    plan_title: "",
    plan_description: "",
    plan_weeks: "",
    plan_dishes: [],
};
let dishes = [];
for (const el of select_dish) {
    dishes.push(el.innerText);
}

let planCounter = 1

function datas(allTogether) {
    const dishesPlan = [];
    // dishesPlan.push(allTogether);   /*zakomentowałem kod Daniela, wprowadziłem zmianę, żeby do każdego planu przykleić etykiete plan {nr planu} ...Łukasz*/
    // localStorage.setItem(weeks.value, JSON.stringify(dishesPlan));
    dishesPlan.push(allTogether);
    localStorage.setItem(`plan ${planCounter}` , JSON.stringify(dishesPlan));
    planCounter++;
}
// Łuki START ------------------
//naprawienie nadpisywania się planu:

if (Object.entries(localStorage)[0] != undefined) {
    for (const el of Object.entries(localStorage)) {
        if (el[0].includes("plan")) {
            planCounter++;
        }
    } 
}
else {
    planCounter = 1;
}

const lsKeys = Object.entries(localStorage); 
const planTabBody = document.querySelector("#planTabBody");
let i = 0;

for(const el of lsKeys) {

    if (el[0].includes("plan")) {
        const parsedRec = JSON.parse(el[1]);
        // JSON.parse(lsKeys[0][1][0].title) = odczytuje sparsowane, wyciągnięte z tablicy atrybuty obiektu pierwszego przepisu
        // JSON.parse(Object.entries(localStorage)[0][1][0].title)
        i++;
        const newTr = document.createElement("tr");
        newTr.classList = "trPlan";
        newTr.innerHTML = `
        <td>${i}</td>
        <td>${parsedRec[0].plan_title}</td>
        <td>${parsedRec[0].plan_description}</td>
        <td>${parsedRec[0].plan_weeks}</td>
        <td class="action-btns">
            <div class="edit-btn action-btn"></div>
            <div class="remove-btn action-btn"></div>
        </td>
        `
        planTabBody.appendChild(newTr);
    }
}

//feature z aktualnym tygodniem
function getWeekNumber(d) {

    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}

const actualWeek = getWeekNumber(new Date());

console.log(actualWeek);

let weeksArray = [];
for(const el of lsKeys) {

    if (el[0].includes("plan")) {
        const parsedPlan = JSON.parse(el[1]);
        console.log(parsedPlan[0].plan_weeks); // test
        if (parsedPlan[0].plan_weeks >= actualWeek) {
            weeksArray.push(parsedPlan[0].plan_weeks);
        }  
    }
}
weeksArray.sort((a, b) => a - b)
let firstWeek = weeksArray[0];

weekNr.innerHTML = `${firstWeek}`

console.log(firstWeek);

//wyświetlanie w widgecie/powiadomieniu ilosć przepisów


const allBreakfastOpt = document.querySelectorAll(".dishTime");

if (Object.entries(localStorage)[0] != undefined) {
    for (const el of Object.entries(localStorage)) {
        if (el[0].includes("recipe")) {

            for (const il of allBreakfastOpt) {
                const newRecOpt = document.createElement("option");
                
                newRecOpt.innerHTML = `${JSON.parse(el[1])[0].title}`
                
                il.appendChild(newRecOpt);
            }
        }
    } 
}



// for(const el of lsKeys) {
//     if (el[0].includes("plan")) {
//         const parsedRec = JSON.parse(el[1]);
//         // JSON.parse(lsKeys[0][1][0].title) = odczytuje sparsowane, wyciągnięte z tablicy atrybuty obiektu pierwszego przepisu
//         // JSON.parse(Object.entries(localStorage)[0][1][0].title)
//         i++;
//         const newTr = document.createElement("tr");
//         newTr.classList = "trPlan";
//         newTr.innerHTML = `
//         <td>${i}</td>
//         <td>${parsedRec[0].plan_title}</td>
//         <td>${parsedRec[0].plan_description}</td>
//         <td>${parsedRec[0].plan_weeks}</td>
//         <td class="action-btns">
//             <div class="edit-btn action-btn"></div>
//             <div class="remove-btn action-btn"></div>
//         </td>
//         `
//         planTabBody.appendChild(newTr);
//     }
// }

// łuki koniec ------------------------

closePlan.addEventListener("click", function () {
    if(weeks.value!=null&&planName.value!=null&&planDesc.value!=null){
        newPlanWindow.style.display = "none";
        widgets.style.display = "flex";
        newPlan.plan_title = planName.value;
        newPlan.plan_description = planDesc.value;
        newPlan.plan_weeks = weeks.value;
        newPlan.plan_dishes = dishes
        datas(newPlan);
        weeks.value = "";
        planDesc.value = "";
        planName.value = "";
    }else{
        newPlanWindow.style.display = "none";
        widgets.style.display = "flex";
        weeks.value = "";
        planDesc.value = "";
        planName.value = "";
    }

    window.location.reload();
// --
    
// JSON.parse(lsKeys[0][1][0].title) = odczytuje sparsowane, wyciągnięte z tablicy atrybuty obiektu pierwszego przepisu
// JSON.parse(Object.entries(localStorage)[0][1][0].title)

    // ------------------------------------KONIEC widgety - nowy plan -------------------//

// dopisek Daniela z ttypem dania

// ---------------------------------------------------------------------------------------------------------------//
const breakfast = document.querySelectorAll(".breakfast");
const brunch = document.querySelectorAll(".brunch");
const soup = document.querySelectorAll(".soup");
const lunch = document.querySelectorAll(".lunch");
const dinner = document.querySelectorAll(".dinner");
const all_dishes = JSON.parse(localStorage.getItem("dishes"));
const all_titles = all_dishes.title;
const all_types = all_dishes.type;
for (const el of breakfast) {
    for (let i = 0; i < all_types.length; i++) {
        if (all_types[i] === "breakfast") {
            el.insertAdjacentHTML("afterbegin", "<option></option>");
            el.firstElementChild.innerText = all_titles[i];
        }
    }
}
for (const el of brunch) {
    for (let i = 0; i < all_types.length; i++) {
        if (all_types[i] === "brunch") {
            el.insertAdjacentHTML("afterbegin", "<option></option>");
            el.firstElementChild.innerText = all_titles[i];
        }
    }
}
for (const el of soup) {
    for (let i = 0; i < all_types.length; i++) {
        if (all_types[i] === "soup") {
            el.insertAdjacentHTML("afterbegin", "<option></option>");
            el.firstElementChild.innerText = all_titles[i];
        }
    }
}
for (const el of lunch) {
    for (let i = 0; i < all_types.length; i++) {
        if (all_types[i] === "lunch") {
            el.insertAdjacentHTML("afterbegin", "<option></option>");
            el.firstElementChild.innerText = all_titles[i];
        }
    }
}
for (const el of dinner) {
    for (let i = 0; i < all_types.length; i++) {
        if (all_types[i] === "dinner") {
            el.insertAdjacentHTML("afterbegin", "<option></option>");
            el.firstElementChild.innerText = all_titles[i];
        }
    }
}

});
