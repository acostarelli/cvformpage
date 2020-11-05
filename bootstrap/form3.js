const form = document.forms[0];

form["midi-choice"].addEventListener("change", () => {
    switch(form["midi-choice"].value) {
        case "Custom":
            form["stock-midi"].style.display = "none";
            form.getElementsByClassName("custom-file")[0].style.display = "";
            break;
        case "Stock":
            form["stock-midi"].style.display = "";
            form.getElementsByClassName("custom-file")[0].style.display = "none";
            break;
    }
});