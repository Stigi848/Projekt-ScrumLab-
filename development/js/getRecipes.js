document.addEventListener('DOMContentLoaded', function() {

    const recipeTabBody = document.querySelector("#recipeTabBody");

    const lsKeys = Object.entries(localStorage); 
    //lsKeys = tablica 2d czyli: tablica (przepisy) z tablicami (nazwa obiektu, atrybuty obiektu)
    
    // JSON.parse(lsKeys[0][0]) = odczytuje nazwę pierwszego przepisu
    // JSON.parse(lsKeys[0][1]) = odczytuje atrybuty obiektu pierwszego przepisu
    
    let i = 0;
    
    for(const el of lsKeys) {

        if (el[0].includes("recipe")) {
            const parsedRec = JSON.parse(el[1]);
            // JSON.parse(lsKeys[0][1][0].title) = odczytuje sparsowane, wyciągnięte z tablicy atrybuty obiektu pierwszego przepisu
            //JSON.parse(Object.entries(localStorage)[0][1][0].title)
            i++;
            const newTr = document.createElement("tr");
            newTr.classList = "trRecipe";
            newTr.innerHTML = `
            <td>${i}</td>
            <td>${parsedRec[0].title}</td>
            <td>${parsedRec[0].description}</td>
            <td class="action-btns">
                <div class="edit-btn action-btn"></div>
                <div class="remove-btn action-btn"></div>
            </td>
            `
            recipeTabBody.appendChild(newTr);

        }

    
    }
    

});