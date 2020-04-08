const editPlan = document.querySelector(".edit-plan-window");
const saveBtn = document.querySelector(".save-plan");
document.addEventListener('DOMContentLoaded', function() {

    const editBtns = document.querySelectorAll(".edit-btn");
    const removeBtns = document.querySelectorAll(".remove-btn");

    for (const el of removeBtns)
        el.addEventListener("click", function() {
            el.parentElement.parentElement.parentElement.removeChild(el.parentElement.parentElement);
            
    })
    for(const el of editBtns){
        el.addEventListener('click', function(){
            editPlan.style.display = "block";
            console.dir(el);
            
            
            
            // saveBtn.addEventListener("click", function(){
    
            // })
        })
    }
}); 
