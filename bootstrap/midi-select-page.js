const customSet = form["custom-set"];
const stockSet = form["stock-set"];
const midiChoice = form["midi-choice"];
const alternate = () => {
    if(midiChoice.value == "custom") {
        customSet.disabled = false;
        stockSet.disabled = true;
    } else {
        customSet.disabled = true;
        stockSet.disabled = false;
    }
}

midiChoice[0].addEventListener("change", alternate);
midiChoice[1].addEventListener("change", alternate);

const populateMetadata = () => {
    // send info to server so server can send metadata back
}
form["stock-midi"].addEventListener("input", populateMetadata);
form["custom-midi"].addEventListener("input", populateMetadata);
form["group-by"].addEventListener("input", populateMetadata);

/*const fileInput = document.querySelector('#file-js-example input[type=file]');
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
        const fileName = document.querySelector('#file-js-example .file-name');
        fileName.textContent = fileInput.files[0].name;
    }
}*/