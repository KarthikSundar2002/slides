const NewSlide = document.getElementById("NewSlide");
const Save = document.getElementById("Save");
const TitleofTheppt = document.getElementById("Title");
const SlidesBar = document.querySelector(".SideBar");
const Mainview = document.querySelector(".Mainview");

let SideSlides = document.querySelectorAll(".SideSlides");
let MainSlides = document.querySelectorAll(".MainSlides");

let SlideNumber = 1;

console.log(NewSlide);
console.log(SideSlides);
console.log(MainSlides);

function CreateSideSlide(){
    let slide = document.createElement("div");
    slide.classList.add("card");
    slide.classList.add("SideSlides")
    slide.classList.add("SideSlide-"+SlideNumber);
    slide.innerHTML = `<div class="card-body"><p class="card-text">Slide-${SlideNumber}</p></div>`
    SideSlides = document.querySelectorAll(".SideSlides");
    console.log(SideSlides);
    return slide;

}

function CreateMainSlide(){
    let slide = document.createElement("div");
    slide.classList.add("card");
    slide.classList.add("MainSlides");
    slide.classList.add("MainSlide-"+SlideNumber);
    let WorkPlace = document.createElement("div");
    WorkPlace.classList.add("card-body");
    slide.appendChild(WorkPlace);
    MainSlides = document.querySelectorAll(".MainSlides");
    return slide;

}


NewSlide.addEventListener("click",(e) => {
    SlidesBar.appendChild(CreateSideSlide());
    MainSlides = document.querySelectorAll(".MainSlides");
    if (SideSlides.length != 0) {
        console.log("Go")
        console.log(MainSlides);
        MainSlides.forEach((slide) => {
            slide.classList.add("hidden");
        })
    }
    Mainview.appendChild(CreateMainSlide());
    SlideNumber++;

})