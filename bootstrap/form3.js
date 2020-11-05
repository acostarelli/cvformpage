const form = document.forms[0];

const toggle = (el) => {
    if(el.style.display === "none") {
        el.style.display = "";
    } else {
        el.style.display = "none";
    }
}

form["midi-choice"].addEventListener("change", () => {
    toggle(form["stock-midi"]);
    toggle(form.getElementsByClassName("custom-file")[0])
});

form["parsing"].addEventListener("change", (e) => {
    Array.from(form.getElementsByClassName("chunk-input")).map(toggle);
    console.log(e);
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
                break;
            case "rn":
                document.getElementById("ref-note-container").style.display = "";
                break;
            case "iv":
                document.getElementById("interval-container").style.display = "";
                break;
            case "tr":
                document.getElementById("trans-match-container").style.display = "";
                document.getElementById("trans-only-container").style.display = "";
                break;
        }
    }
});
form["method"].dispatchEvent(new Event("change"));