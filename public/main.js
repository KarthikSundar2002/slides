const NewSlide = document.getElementById("NewSlide");
const Save = document.getElementById("Save");
const TitleofTheppt = document.getElementById("Title");
const SlidesBar = document.querySelector(".SideBar");
const Mainview = document.querySelector(".Mainview");

let SideSlides = document.querySelectorAll(".SideSlides");
let MainSlides = document.querySelectorAll(".MainSlides");
let InputLength = document.querySelectorAll(".text").length;

let SlideNumber = SideSlides.length + 1;
let textnumber = InputLength + 1;
let isTyping = false;

if(SideSlides.length != 0){
    console.log(SideSlides);

    SideSlides.forEach((slide) => {
        console.log(slide.classList[2]);
        slide.addEventListener("click",(e) => {


            let mainSlide = document.getElementsByClassName("MainSlide-"+slide.classList[2].slice(10))[0];
            MainSlides = document.querySelectorAll(".MainSlides");
            MainSlides.forEach((slide) => {
                console.log(slide);
                slide.classList.add("hidden");
                let inputfields = slide.querySelectorAll(".text");
                inputfields.forEach((input) => {
                    input.classList.add("hidden");
                })
            });
            mainSlide.classList.remove("hidden");
            let inputs = mainSlide.querySelectorAll(".text");
            inputs.forEach((input) => {
                input.classList.remove("hidden");
            })
        })
    })
}

if(MainSlides.length != 0){
    console.log(MainSlides);

    MainSlides.forEach((MainSlide) => {
        let workplaces = MainSlide.querySelectorAll(".card-body");
        let SpecificSlideNumber = MainSlide.classList[2].slice(10);
        workplaces.forEach((WorkPlace) => {
            WorkPlace.addEventListener("dblclick",(e) => {

                let textbox = document.createElement("input");
                let rect = WorkPlace.getBoundingClientRect();
        
                textbox.classList.add("text");
                textbox.setAttribute("id","Slide-"+SpecificSlideNumber+"-text-"+textnumber);
                textnumber++;
        
                textbox.style.position = "absolute";
                textbox.style.left = e.clientX - rect.left + "px";
                textbox.style.top = e.clientY - rect.top + "px";
                textbox.contentEditable = true;



                WorkPlace.appendChild(textbox);
                textbox.addEventListener("mousedown",(e) => {
                    console.log(e.button);
                    if(e.button == 2){
                        WorkPlace.removeChild(textbox);
                    }
                })


            })
        })
    })
}



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
            let inputfields = slide.querySelectorAll(".text");
            inputfields.forEach((input) => {
                input.classList.add("hidden");
            })
        });
        mainSlide.classList.remove("hidden");
        let inputs = mainSlide.querySelectorAll(".text");
        inputs.forEach((input) => {
            input.classList.remove("hidden");
        })
    })
    SideSlides = document.querySelectorAll(".SideSlides");

    return slide;

}

function CreateMainSlide(){
    let slide = document.createElement("div");

    slide.classList.add("card");
    slide.classList.add("MainSlides");
    slide.classList.add("MainSlide-"+SlideNumber);
    let SpecificSlideNumber = SlideNumber;
    let WorkPlace = document.createElement("div");


    WorkPlace.classList.add("card-body");
    slide.appendChild(WorkPlace);
    WorkPlace.addEventListener("dblclick",(e) => {

        let textbox = document.createElement("input");
        let rect = slide.getBoundingClientRect();

        textbox.classList.add("text");
        textbox.setAttribute("id","Slide-"+SpecificSlideNumber+"-text-"+textnumber);
        textnumber++;

        textbox.style.position = "absolute";
        textbox.style.left = e.clientX - rect.left + "px";
        textbox.style.top = e.clientY - rect.top + "px";
        textbox.contentEditable = true;

        WorkPlace.appendChild(textbox);

        textbox.addEventListener("mousedown",(e) => {
                    console.log(e.button);
                    if(e.button == 2){
                        WorkPlace.removeChild(textbox);
                    }
                })
    })



    MainSlides = document.querySelectorAll(".MainSlides");
    return slide;

}

async function save() {
    SideSlides = document.querySelectorAll(".SideSlides");
    MainSlides = document.querySelectorAll(".MainSlides");
    let AllInputs = document.querySelectorAll(".text");
    let AllValues = [];
    let AllInputIds = [];
    let AllInputStyles = [];
    AllInputs.forEach((input) =>{
        AllValues.push(input.value);
        AllInputIds.push(input.getAttribute("id"));
        AllInputStyles.push(input.getAttribute("style"));
    });
    let title = TitleofTheppt.innerHTML;
    console.log(AllInputStyles);
    console.log(AllInputIds);
    console.log(AllInputs);
    console.log(AllValues);

    await fetch("/save",{
        method: "POST",
        body: JSON.stringify({
            title:title,
            NoOfSlides:MainSlides.length,
            AllInputIds: AllInputIds,
            AllValues:AllValues,
            AllInputStyles: AllInputStyles,

        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
        });
}

Save.addEventListener("click",save);



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