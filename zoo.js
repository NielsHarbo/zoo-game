//DOM elementer
const scene = document.querySelector(".scene")
const createForm = document.querySelector("#create-animal")
const selectedAnimal = document.querySelector("#selected-animal")

//Vi vil gerne have access til musens kordinater
//i det globale scope, men vi har endnu ingen værdier til dem.
//Derfor deklarerer vi to variabler uden værdier
let topCord
let leftCord

//Vi deklarerer også lige en global variabel der kommer til
//at indeholde en sti til en lydfil 
let animalSound = ""

scene.addEventListener("click", function(event){
        //event.target er det element som der er klikket på
    if(event.target == scene){
            //Form skal poppe op der hvor musen er
        topCord = event.clientY / window.innerHeight * 100  +"%"
        leftCord = event.clientX / window.innerWidth * 100 +"%"
            //Vi har jo lavet formen i HTML, så nu skal vi bare
            //gøre den synlig og placere den der hvor brugeren har klikket
        createForm.style.display = "block"
        createForm.style.top = topCord
        createForm.style.left = leftCord
    }
})

createForm.addEventListener("change", function(){
        //Change eventen forekommer hver gang der
        //sker en ænding i formen. Så behøver den ikke at submittes
    
        //Logik
    let favoFood = ""
    if (selectedAnimal.value == "🐒" || selectedAnimal.value =="🦍"){
        favoFood = "fruit"
    }
    else if (selectedAnimal.value == "🐅" || selectedAnimal.value == "🐊"){
        favoFood = "meat"
    }
    else {
        favoFood = "grass"
    }

    if (selectedAnimal.value == "🐅"){
        animalSound = "assets/tiger.mp3"
    }
    else if (selectedAnimal.value == "🐊"){
        animalSound = "assets/lion.mp3"
    }
    else if (selectedAnimal.value == "🐒"){
        animalSound = "assets/chimp.mp3"
    }
    else if (selectedAnimal.value == "🦍"){
        animalSound = "assets/gorilla.mp3"
    }
    else if (selectedAnimal.value == "🐪"){
        animalSound = "assets/camel.mp3"
    }
    else{
        animalSound = "assets/frog.mp3"
    }

    let animationSpeed = (Math.random() * 10) + 4
    animationSpeed = Math.floor(animationSpeed)
    animationSpeed = animationSpeed.toString() + "s"

    //Nu har vi al hvad der skal til for at oprette
    //html til det valgte dyr
    let burHTML = `<div class="bur animal" data-food="${favoFood}" data-sound="${animalSound}" style="top:${topCord}; left:${leftCord};">`
    burHTML +=      `<p class="emoji" style="animation-duration: ${animationSpeed};">`
    burHTML +=          selectedAnimal.value
    burHTML +=      '</p>'
    burHTML +=      '<img src="assets/bur.png" alt="">'
    burHTML +=     '</div>'
    
    scene.innerHTML += burHTML
    let animals = document.querySelectorAll(".animal")
    console.log(animals)

    animals.forEach(function(element){
        element.addEventListener("dragover", cancelDefault)
        element.addEventListener("drop", dropped)
    })
    createForm.style.display ="none"
    sourceDiv.style.display ="block";
    createForm.reset()
})