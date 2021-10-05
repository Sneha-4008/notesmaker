//adding variables

let addBtn = document.getElementById("add_btn");
let addTitle = document.getElementById("title")
let addDescription = document.getElementById("description")


//adding event-listener to btn
addBtn.addEventListener("click", function(e) {
    if (addTitle.value == "" || addDescription.value == "") {  //check if anything inside the title or description area
        return alert("Add Title and Description");
    }
//storing items in local storage in form of string i.e., notes
    let notes = localStorage.getItem("notes");
    if (notes == null) {  // if notes is null
        notesObj = [];

    }else {
        notesObj = JSON.parse(notes); //saving notes in local storage and for that we use JSON.parse

    }

     //creating notes Object

    let myObj = {
        title: addTitle.value,
        dscription: addDescription.value

    }
    notesObj.push(myObj);//push objects in locl storgae
    localStorage.setItem("notes", JSON.stringify(notesObj)); //setting items in local storage
    addTitle.value = ""; //remove the values from the forms
    addDescription.value = "";

    showNotes();  //calling function to show notes
})

//show notes on the page
function showNotes() {
    let notes = localStorage.getItem("notes"); //defining the notes
    if (notes == null) {
        notesObj = [];

    }else {
        notesObj = JSON.parse(notes);
    }
//creating variable to displace notes in page
    let html = "" ;
    notesObj.forEach(function(element, index) {
        html += `

        <div id="note">
        <p class= "note-counter"> ${index + 1}</p> 
        <h3 class="title">${element.title}</h3>
        <p class="description">${element.description}</p>
        <button  id="${index}"  onclick="deleteNote(this.id)" class="dlt-btn">Delete</button>
        <button id="${index}" onclick="editNote(this.id)" class="edit-btn">Edit</button>
      </div> 
        `;
        
        
 });
  let noteElm = document.getElementById("notes");
  if(notesObj.length != 0) { // if notes object is not eqaul to 0
      noteElm.innerHTML = html; //setting element in html
  }else {
      noteElm.innerHTML = "You don't have Notes Yet";
  }
}
// function to delete notes
function deleteNote(index){
    let confirmDel = confirm("Are you Deleting this note!!");//confirming if really want to delete the note
    
    if (confirmDel == true) {//if user confirm
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
    
        }else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1); //deleting a item in array which is clicked
        localStorage.setItem("notes" , JSON.stringify(notesObj));//sent back item to the local storage
        showNotes();//calling shownotes function
    }
}

// function to edit the notes
function editNote(index) {
    let notes = localStorage.getItem("notes");//calling notes from local storage
    if (addTitle.value !== "" || addDescription.value !== "") {
        return alert("Please clear the notes before editing");
        }
        if (notes == null) {
            notesObj = [];
    
        }else {
            notesObj = JSON.parse(notes);
        }

        notesObj.findIndex((element, index) => { //getting item
            addTitle.value =element.title;//assigning values to text field
            addDescription.value =element.description;
        })

        notesObj.splice(index,1);//deleteing item
        localStorage.setItem("notes", JSON.stringify(notesObj));//pushing edited items showNotes();
        showNotes();
    }



showNotes();
