const BY_PITCH = 0b0001;
const REF_NOTE = 0b0010;
const INTERVAL = 0b0100;
const TRANSPLT = 0b1000;

const Algo = (desc, opts=0) => {
    return {
        desc,
        byPitch: opts & BY_PITCH,
        refNote: opts & REF_NOTE,
        interval: opts & INTERVAL,
        transplt: opts & TRANSPLT
    }
};

const algos = {
    "Pitch reversal": Algo(
        "Pitch reversal",
        "Reverse pitches",
        BY_PITCH
    ),
    "Rhythm reversal": Algo(
        "Reverse rhythms",
        BY_PITCH
    ),
    "Total reversal": Algo(
        "Reverse pitches and rhythms",
        BY_PITCH
    ),
    "Inversion i4": Algo(
        "I don't know",
        BY_PITCH | REF_NOTE
    ),
    "Inversion i5": Algo(
        "I don't know",
        BY_PITCH | REF_NOTE
    ),
    "Prior event inversion i4": Algo(
        "I don't know",
        BY_PITCH | REF_NOTE
    )
}

const parsing = form["parsing"];
const updateBlocks = () => {
    if(parsing.value == "Pitch/chord") {
        $$("#beat_chunks")[0].disabled = true;
        $$("#beat_chunks_desc")[0].style.display = "none";
    } else {
        $$("#beat_chunks")[0].disabled = false;
        $$("#beat_chunks_desc")[0].style.display = "block";
    }
}

const desc = $$("#desc")[0];
const updateAlgoInfo = (algo) => {
    desc.innerText = algo.desc;

    // show/hide option + help message
    if(algo.byPitch) {
        $$("#pitch_chord")[0].disabled = false;
        $$("#pitch_chord_desc")[0].style.display = "block";

        updateBlocks();
    } else {
        $$("#pitch_chord")[0].disabled = true;
        $$("#pitch_chord_desc")[0].style.display = "none";

        $$("#beat_chunks")[0].disabled = false;
        $$("#beat_chunks_desc")[0].style.display = "block";
    }
    if(algo.refNote) {
        $$("#ref_note")[0].disabled = false;
        $$("#ref_note_desc")[0].style.display = "block";
    } else {
        $$("#ref_note")[0].disabled = true;
        $$("#ref_note_desc")[0].style.display = "none";
    }
    if(algo.interval) {
        $$("#interval")[0].disabled = false;
        $$("#interval_desc")[0].style.display = "block";
    } else {
        $$("#interval")[0].disabled = true;
        $$("#interval_desc")[0].style.display = "none";
    }
    if(algo.transplt) {
        $$("#transplant")[0].disabled = false;
        $$("#transplant_desc")[0].style.display = "block";
    } else {
        $$("#transplant")[0].disabled = true;
        $$("#transplant_desc")[0].style.display = "none";
    }
}

updateAlgoInfo(algos["Pitch reversal"]);
parsing.addEventListener("change", updateBlocks);

form["algo"].addEventListener("change", () => {
    updateAlgoInfo(algos[form["algo"].value]);
})