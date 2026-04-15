


(function inintPage(){
    const signInbtn = document.querySelector(".openDialog")
    const submitBtn = document.querySelector(".formSubmitBTn")
    const userSignInDialog = document.getElementById("userSignInDialog")
    const closeSignInDialog = document.getElementById("closeModal")
    signInbtn.addEventListener('click', ()=>{
        userSignInDialog.showModal()
    })

    closeSignInDialog.addEventListener('click', ()=>{
        userSignInDialog.close();
    })

    const countryDrop = document.getElementById("country-select")
    applyCountryDropState(countryDrop)
    submitBtn.addEventListener('click', (event)=>{
        if(!checkIfAllValid(invalidBoxes)){
            console.log(invalidBoxes);
        }else{
            
        }
        
        
    })





})();

function applyCountryDropState(countryDrop) {
    countryDrop.addEventListener("change", () => {
        const isInvalid = countryDrop.value === "default";
        countryDrop.classList.toggle("invalid", isInvalid);
        countryDrop.classList.toggle("valid", !isInvalid);
        
    });
}
    



function checkIfAllValid(invalidBoxes){
    const allHelperParas = document.getElementsByClassName("userHelp");
    allValid = true;
    if(countryDrop.value == ""){
            return false
    }else{
       for(let i = 0 ; i < allHelperParas.length; i++){
        if(allHelperParas[i].value != ""){
           return false
            }
        }
    }
    return true;
}
(function validateinput(){
    userSignInDialog.addEventListener('input', (event)=>{
        let elementHit = event.target;
        let helperPara = document.querySelector(`#${elementHit.id} + .userHelp`)
        if(helperPara != null ){
            
            if(elementHit.id =="postalId"){
                checkPostal(helperPara, elementHit)
               
            }else if(elementHit.id == "emailUser"){
                checkEmail(helperPara, elementHit)
            }else if (elementHit.id == "passwordUser"){
                checkPassword(helperPara, elementHit)
            }
        }
    })
})();


function checkPassword(helperPara, elementHit){
    const paasswordCheckRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    toggleError(helperPara, true)
    toggleError(elementHit, true)
    setHelperPara(helperPara, "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:", elementHit)
    if(paasswordCheckRegex.test(elementHit.value)){
            toggleError(elementHit, false)
            toggleError(helperPara, false)
            setHelperPara(helperPara, "", elementHit)

    }
}


function checkEmail(helperPara, elementHit){
    toggleError(helperPara, true)
    if (elementHit.validity.valueMissing) {
        setHelperPara(helperPara, "You need to enter an email address.", elementHit);
  } else if (elementHit.validity.typeMismatch) {
        // If it's not an email address,
        setHelperPara(helperPara, "I am expecting an email address darling!", elementHit);
  } else if (elementHit.validity.tooShort) {
        // If the value is too short,
        setHelperPara(helperPara,  `Email should be at least ${elementHit.minLength} characters; you entered ${elementHit.value.length}.`, elementHit);
  }else if (elementHit.validity.valid){
    setHelperPara(helperPara, "", elementHit)
    toggleError(helperPara, false)
  }
  
}

function checkPostal(helperPara, elementHit){
    const postalRegex = /^[0-9]*$/;
                if(postalRegex.test(elementHit.value)){
                    if(elementHit.validity.tooShort || elementHit.value.length ===0){
                           setHelperPara(helperPara, " atleast 5 charachters long", elementHit)
                            toggleError(helperPara, true)
                            toggleError(elementHit, true)
                        }
                    else{
                         setHelperPara(helperPara, "", elementHit)
                        toggleError(helperPara, false)
                        toggleError(elementHit, false)

                    }

                }else{
                    setHelperPara(helperPara, "zip code has to be a number", elementHit)
                    toggleError(elementHit, true)
                    toggleError(helperPara, true)

                }
}


function toggleError(element, turnErrorState){
    if(turnErrorState){
        element.classList.add("errorPara")

    }else{
        element.classList.remove("errorPara")

    }
}


function setHelperPara(helperPara, givenText, element){


    element.classList.toggle("invalid", givenText!= "")
    element.classList.toggle("valid",givenText === "" )
    helperPara.textContent = givenText;
}

