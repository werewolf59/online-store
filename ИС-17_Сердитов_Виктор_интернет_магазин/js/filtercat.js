'use strict';
function selectcat(a, b) {

    let elementsa = document.querySelectorAll('#category a');

    for (let elema of elementsa) {
        elema.classList.remove("active");
    }
    elementsa[b].classList.add("active");
    
    if(a == "cat0"){
        let elementsx = document.querySelectorAll('.si');

        for (let elemx of elementsx) {
            elemx.classList.remove("setdisp0");
            elemx.classList.add("slider__item");
        }
        
    }
    else {
        let elements = document.querySelectorAll('.si');

        for (let elem of elements) {
            if(elem.classList.contains(a)){
                elem.classList.remove("setdisp0");
                elem.classList.add("slider__item");
            }
            else {
                elem.classList.add("setdisp0");
                elem.classList.remove("slider__item");
            }
            
        }

    }
    
    
    //var slider = multiItemSlider2('#list_shop .slider');
    var slider = multiItemSlider('#list_shop .slider');

}