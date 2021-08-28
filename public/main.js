const NewSlide = document.getElementById("NewSlide");
const Save = document.getElementById("Save");
const TitleofTheppt = document.getElementById("Title");
const SlidesBar = document.querySelector(".SideBar");
const Mainview = document.querySelector(".Mainview");

let SideSlides = document.querySelectorAll(".SideSlides");
let MainSlides = document.querySelectorAll(".MainSlides");

let SlideNumber = 1;
let textnumber = 1;
let isTyping = false;

console.log(NewSlide);
console.log(SideSlides);
console.log(MainSlides);

function CreateSideSlide(){
    let slide = document.createElement("div");
    slide.classList.add("card");
    slide.classList.add("SideSlides")
    slide.classList.add("SideSlide-"+SlideNumber);
    let SpecificSlideNumber =  SlideNumber;
    slide.innerHTML = `<div class="card-body"><p class="card-text">Slide-${SlideNumber}</p></div>`;
    slide.addEventListener("click",(e) => {


        let mainSlide = document.getElementsByClassName("MainSlide-"+SpecificSlideNumber)[0];
        MainSlides = document.querySelectorAll(".MainSlides");
        MainSlides.forEach((slide) => {
            console.log(slide);
            slide.classList.add("hidden");
        });
        mainSlide.classList.remove("hidden");
    })
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
    WorkPlace.addEventListener("dblclick",(e) => {
        isTyping = true;
        let textbox = document.createElement("input");
        let rect = slide.getBoundingClientRect();
        
        textbox.classList.add("text");
        textbox.classList.add("text-"+textnumber);
        textbox.style.position = "absolute";
        textbox.style.left = e.clientX - rect.left + "px";
        textbox.style.top = e.clientY - rect.top + "px";
        textbox.contentEditable = true;
        console.log(textbox);
        WorkPlace.appendChild(textbox);
    })


    WorkPlace.addEventListener("keydown",(e) => {
        if(e.key == "Enter"){
            isTyping = false;
        }
    })
    MainSlides = document.querySelectorAll(".MainSlides");
    return slide;

}


NewSlide.addEventListener("click",(e) => {
    SlidesBar.appendChild(CreateSideSlide());
    MainSlides = document.querySelectorAll(".MainSlides");
    if (SideSlides.length != 0) {

        MainSlides.forEach((slide) => {
            slide.classList.add("hidden");
        })
    }
    Mainview.appendChild(CreateMainSlide());
    SlideNumber++;

})