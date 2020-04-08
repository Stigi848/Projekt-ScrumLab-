document.addEventListener('DOMContentLoaded', function() {



    //------------------ tutaj będzie logika zapisania nowego przepisu-------//

    //podstawowe przycisku uruchamiania okna do dodania przepisów//
    const newRecipeBtn = document.querySelector(".add-recipe");
    const newRecipeWindow = document.querySelector(".new-recipe-window");
    const closeRecipe = document.querySelector(".close-recipe");
    const widgets = document.querySelector(".widgets");
    const dish_type = document.querySelector("#dish_type");
    const recipeTitle = document.querySelector("#recipe-title");
    // input z nazwą przepisu //
    const recipeDescr = document.querySelector("#recipe-descr");
    //input z opisem przepisu //
    const recipeInst =document.querySelector("#recipe-instructions");
    //input z intrukcją do przepisu //
    const recipeIngredient = document.querySelector("#recipe-ingredient");
    //input z składnikami //

    const addInstruction = document.querySelector(".add-instruction-btn");
    //przycisk z dodaniem instrukcji//
    const addIngredient =document.querySelector(".add-ingredient-btn");
    //przycisk z dodaniem składnika//


    const instructionsList = document.querySelector(".recipe-ol");
    //lista instrukcji//
    const ingredientsList = document.querySelector(".recipe-ul");
    //lista skłądników //

    //licznik ilości dodanych przepisóœ//
    let recipeCounter = 1;

    //Ł naprawienie błędy z nadpisywaniem przepisów po przeładowaniu strony

    if (Object.entries(localStorage)[0] !== undefined) {
        for (const el of Object.entries(localStorage)) {
            if (el[0].includes("recipe")) {
                recipeCounter++;
            }
        } 
    }
    else {
        recipeCounter = 1;
    }

    //obiekt nowego przepisu do przechowywania danych//
    const newRecipe = {
        title: "",
        description: "",
        type: "",
        instructions: [],
        ingredients: [],
    };

    //funckja dodająca każdy element do localStorage
    function datas(newObject) {
        const dataLocal = [];
        dataLocal.push(newObject);
        localStorage.setItem(`recipe ${recipeCounter}`, JSON.stringify(dataLocal));
    }

    //funkcja otwierania i zamykania okna przepisóœ
    newRecipeBtn.addEventListener("click", function () {
        newRecipeWindow.style.display = "block";
        widgets.style.display = "none"
    });

    //funkcja otwierania i zamykania okna przepisóœ z sekcji przepisy

    const desktop = document.querySelector(".desktop");
    const recipes = document.querySelector(".recipes");
    const plans = document.querySelector(".plans");
    const hello = document.querySelector(".hello-section");
    const addNewRec = document.querySelector(".add-btn");

    addNewRec.addEventListener("click", function () {
        newRecipeWindow.style.display = "block";
        widgets.style.display = "none"
        desktop.style.display = "block";
        recipes.style.display = "none";
        plans.style.display = "none";
        hello.style.display = "none";
    });

    //funkcja zamieniająca listy html na tablice JS //
    function getInst(list) {
        const elements = list.querySelectorAll("li");
        let table = [];
        for(const el of elements) {
            table.push(el.innerText);
        }
        return table;
    }

    //główna funkcja zamknięcia okno i zapisania danych w Local Storage //
    //Ł odpowiednie aktualizowanie tabeli "przepisy" po zamknięciu okna dodawania przepisu
    closeRecipe.addEventListener("click", function () {

        newRecipeWindow.style.display = "none";
        widgets.style.display = "flex";
        newRecipe.title = recipeTitle.value;
        newRecipe.description = recipeDescr.value;
        newRecipe.type = dish_type.value;
        newRecipe.instructions = getInst(instructionsList);
        newRecipe.ingredients = getInst(ingredientsList);
        datas(newRecipe);
        console.log(localStorage);
        recipeCounter += 1;
        window.location.reload();




// 
        // console.log(Object.keys(localStorage).sort());
        // console.log(Object.keys(localStorage));
// 
        // 
        // console.log((Object.entries(localStorage)[Object.entries(localStorage).length-1]));
        // 
        // JSON.parse(Object.entries(localStorage)[0][1][0].title)
    //     const newTr = document.createElement("tr");
    //     newTr.classList = "trRecipe";
    //     newTr.innerHTML = `
    //     <td>nrFix</td>
    //     <td>${parsedRec[0].title}</td>
    //     <td>${parsedRec[0].description}</td>
    //     <td class="action-btns">
    //         <div class="edit-btn action-btn"></div>
    //         <div class="remove-btn action-btn"></div>
    //     </td>
    // `
    // recipeTabBody.appendChild(newTr);
    });


    //pokazanie w widgecie ile masz przepisów

    const qRec = document.querySelector("#qRec");
    qRec.innerHTML = `${recipeCounter - 1}`;


    //funkcja dodająca nowy element do instrukcji//
    addInstruction.addEventListener("click", function () {
        const newInst = document.createElement('li');
        newInst.innerText = recipeInst.value;
        instructionsList.appendChild(newInst);
        recipeInst.value ="";
        const removeElBtn = document.createElement("button");
        const editElBtn = document.createElement("button");
        editElBtn.classList.add("edit-el-btn");
        newInst.appendChild(editElBtn);
        removeElBtn.classList.add("remove-el-btn");
        newInst.appendChild(removeElBtn);
        //funckja usuwająca element z lity
        const allRemove = document.querySelectorAll(".remove-el-btn");
        for(const el of allRemove) {
            el.addEventListener("click", function () {
                this.parentElement.parentElement.removeChild(this.parentElement);
            })
        }

    });
    //funkcja dodajaca nowy element do składników//
    addIngredient.addEventListener("click", function () {
        const newIng = document.createElement('li');
        newIng.innerText = recipeIngredient.value;
        ingredientsList.appendChild(newIng);
        recipeIngredient.value = "";
        const removeElBtn = document.createElement("button");
        const editElBtn = document.createElement("button");
        editElBtn.classList.add("edit-el-btn");
        newIng.appendChild(editElBtn)
        removeElBtn.classList.add("remove-el-btn");
        newIng.appendChild(removeElBtn);
        const allRemove = document.querySelectorAll(".remove-el-btn");
        for(const el of allRemove) {
            el.addEventListener("click", function () {
                this.parentElement.parentElement.removeChild(this.parentElement);
            })
        }

    });

    //łuki robota -----------------------------------------------------------------------------------



});