const form = document.forms[0];

const toggle = (el) => {
    if(el.style.display === "none") {
        el.style.display = "";
    } else {
        el.style.display = "none";
    }
}

form["midi-choice"].addEventListener("change", () => {
    switch(form["midi-choice"].value) {
        case "Custom":
            document.getElementById("custom-midi-container").style.display = "";
            document.getElementById("stock-midi-container").style.display = "none";
            break;
        case "Stock":
            document.getElementById("custom-midi-container").style.display = "none";
            document.getElementById("stock-midi-container").style.display = "";
            break;
    }
});

form["parsing"].addEventListener("change", (e) => {
    switch(form["parsing"].value) {
        case "by pitch/chord":
            document.getElementById("chunks-container").style.display = "none";
            break;
        case "n-beat chunks":
            document.getElementById("chunks-container").style.display = "";
            break;
    }
});

form["method"].addEventListener("change", () => {
    form["parsing"].value = "n-beat chunks";
    form["parsing"].dispatchEvent(new Event("change"));
    form["parsing"].disabled = true;

    Array.from(form.getElementsByClassName("algo-opt")).map(e => e.style.display = "none");

    const parts = form["method"].value.split(",");
    const algo = parts[0];
    const tags = parts.slice(1);

    for(const tag of tags) {
        switch(tag) {
            case "pc":
                form["parsing"].disabled = false;
                document.getElementById("parsing-container").style.display = "";
                break;
            case "rn":
                document.getElementById("ref-note-container").style.display = "";
                break;
            case "iv":
                document.getElementById("interval-container").style.display = "";
                break;
            case "tr":
                document.getElementById("trans-container").style.display = "";
                break;
        }
    }
});

form["midi-choice"].dispatchEvent(new Event("change"));
form["method"].dispatchEvent(new Event("change"));