document.addEventListener('DOMContentLoaded', function() {
 
    const desktop = document.querySelector(".desktop");
    const hello = document.querySelector(".hello-section");
    const namePlace = document.querySelector("#namePlace")

    if(localStorage.getItem("name") == null) {
        hello.style.display = "block";
        desktop.style.display = "none";
    }
    else {
        hello.style.display = "none";
        desktop.style.display = "block";
        const name = localStorage.getItem("name");
        namePlace.innerHTML = `${name.toString()}`; 
    }
    
    
    
    document.addEventListener("submit", function(event) {
        event.preventDefault()
        const nameValue = document.querySelector("#nameInput").value;
        localStorage.setItem("name", nameValue);
        const name = localStorage.getItem("name");
        namePlace.innerHTML = `${name.toString()}`; 

        hello.style.display = "none";
        desktop.style.display = "block";

    })

});