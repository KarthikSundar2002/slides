const NewSlide = document.getElementById("NewSlide");
const Save = document.getElementById("Save");
const TitleofTheppt = document.getElementById("Title");
const SlidesBar = document.querySelector(".SideBar");

let SlideNumber = 1;
console.log(NewSlide);
function CreateSlide(){
    let slide = document.createElement("div");
    slide.classList.add("card");
    slide.classList.add("Slide-"+SlideNumber);
    slide.innerHTML = `<div class="card-body"><p class="card-text">Slide-${SlideNumber}</p></div>`
    return slide;

}

NewSlide.addEventListener("click",(e) => {
    SlidesBar.appendChild(CreateSlide());
    SlideNumber++;
})