// https://cloudfour.com/thinks/css-circles/
// http://css3.bradshawenterprises.com/cfimg/

MicroModal.init();
window.$$ = (s) => document.querySelectorAll(s);
window.form = document.forms[0];

const order = [
    $$("#midi-select-page")[0],
    $$("#algo-select-page")[0],
    $$("#ic-select-page")[0]
];
let current = 0;
const submit = form["submit"];
const showModal = form["show-modal"];
const sections = $$(".section");
const paginator = (pNum) => {
    return () => {
        if(isNaN(pNum)) {
            current += 1;
        } else {
            current = pNum;
        }
        if(current > 2) {
            return;
        }

        for(const page of order) {
            page.className = "form-page-hidden";
        }
        order[current].className = "form-page-visible";

        for(let i = 0; i < sections.length; i++) {
            if(i < current) {
                sections[i].className = "section passed btn btn-info";
            } else if(i == current) {
                sections[i].className = "section current btn btn-info";
            } else if(i > current) {
                sections[i].className = "section yet btn btn-secondary";
            }
        }

        if(current == 2) {
            submit.style.display = "none";
            showModal.style.display = "block";
        } else {
            submit.style.display = "block";
            showModal.style.display = "none";
        }
    }
}
submit.addEventListener("click", paginator());
for(let i = 0; i < sections.length; i++) {
    sections[i].addEventListener("click", paginator(i));
}