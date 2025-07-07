const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");



for(const card of cards){
    card.addEventListener("dragstart",dragStart)
    card.addEventListener("dragend",dragEnd)





}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}


function dragStart(e) {
    console.log("for dragstart",this.id)
    e.dataTransfer.setData("text/plain",this.id)
}

function dragEnd() {
    console.log("for dragend",this)
  console.log("Drag ended");
}
function dragOver(e) {
  // this line is important because by default, browsers don't allow you to drop elements onto other elements.
  e.preventDefault();
}

function dragEnter(e){
    console.log("for dragEnter",this)
    e.preventDefault()

    this.classList.add("over")

}
function dragLeave(e){
    console.log("for dragLeave",this)
    e.preventDefault()

    this.classList.remove("over")

}

function dragDrop(e) {
    console.log("for dragdriop",this)
    const id = e.dataTransfer.getData("text/plain")

    const card = document.getElementById(id)
    this.appendChild(card)

}
