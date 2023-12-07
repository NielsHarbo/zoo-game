//DOM REFERENCER
const sourceDiv = document.querySelector("#source") //mad container
const targetDiv = document.querySelectorAll(".animal") //alle dyr
const dragBoxes = document.querySelectorAll("#source div") //hver enkelt mad-ret
const pointNumber = document.querySelector("#point-number") //point tavle
const audio = document.querySelector("#audio")

//EVENTS
dragBoxes.forEach(function(element){
    element.addEventListener("dragstart", startDrag)
})

targetDiv.forEach(function(element){
    element.addEventListener("dragover", cancelDefault)
    element.addEventListener("drop", dropped)
})

//FUNKTIONER

function startDrag(event){
    event.dataTransfer.setData("elmId", this.id)
    event.dataTransfer.setData("elmFood", this.dataset.food)
}

function cancelDefault (event){
    event.preventDefault();
}

function dropped (event){
    topCord = event.clientY / window.innerHeight * 100  +"%"
    leftCord = event.clientX / window.innerWidth * 100 +"%"
    audio.setAttribute("src", this.dataset.sound)
    audio.play()
    let sourceId = event.dataTransfer.getData("elmId")
    let sourceFood = event.dataTransfer.getData("elmFood")
    let messageBox = document.querySelector("#message-box")
    if (sourceFood == this.dataset.food){
        let heart = "❤"
        messageBox.innerHTML = heart
        messageBox.style.top = topCord
        messageBox.style.left = leftCord
        messageBox.style.display = "block"
        pointNumber.innerHTML = pointNumber.innerHTML + "❤" 
    }
    else{
        let fail = "Bvadr!"
        messageBox.innerHTML = fail
        messageBox.style.top = topCord
        messageBox.style.left = leftCord
        messageBox.style.display = "block"
        sourceDiv.removeChild(document.getElementById(sourceId))
    }
    setTimeout(function(){
        messageBox.style.display = "none"
    }, 2500)
}