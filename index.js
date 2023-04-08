
// DOM Declarations
let textArea = document.getElementById("input-text");
let addNotes = document.getElementById("btn-1");
let deleteAll = document.getElementById("btn-2");
let noteContainer = document.getElementById("note-container");
let currentNote; // A variable to take the current note 
let notes;

shownotes();

// Add Notes Button

addNotes.addEventListener("click", () => {

    currentNote = textArea.value;
    // Here we will check whether there are any array whose key value is notes, If not then we will create it
    notes = localStorage.getItem("notes")
    if (notes === null) {
        notesArray = []
    } else {
        notesArray = JSON.parse(notes)
    }

    if (currentNote === null || currentNote == '') {
        // do nothing
    } else {
        notesArray.push(currentNote);
        // At the end the value inside the text area should be empty
        textArea.value = '';
        localStorage.setItem("notes", JSON.stringify(notesArray));
        // Will write the code to display the notes
        shownotes()
    }






})


// Delete all Button

deleteAll.addEventListener("click", () => {
    console.log("Delete all button is clicked.");
    deleteAllNotes();

})

// Function to delete all notes

function deleteAllNotes() {
    // localStorage.clear(); // => As it clears all the key value pairs so we just want to replace an empty array as value for the 'notes' key
    notesArray = []
    localStorage.setItem("notes", JSON.stringify(notesArray)); // Successfully doen.
    console.clear();
};


// Function to show the note in the display

function shownotes() {
    notes = localStorage.getItem("notes")
    if (notes == null) {
        notesArray = []
    } else {
        notesArray = JSON.parse(notes);
    }
    localStorage.setItem("notes", JSON.stringify(notesArray))
    html = '';
    notesArray.forEach((currentValue, index) => {
        // console.log(`The notes are => ${currentValue} and It's index is ${index}`);  // Working well
        html += `
        <div class="cardnotes n-bd">
            <div class="card-body">
                <h1 class="card-title t-cen">Notes ${index + 1}</h1>
                <p class="card-text t-fam f-warp">${currentValue}</p>
                

                <div class="btn-notes t-lef ">
                 <button id='${index}' onClick="deleteNote(this.id)" class="btn-1 btn">Delete Note</button>
                <button id='${index}' onClick="editNote(this.id)" class="btn-2 btn">Edit Note</button>
                </div>
               
            </div>
        </div>
        `

        if (notesArray.length != 0) {
            noteContainer.innerHTML = html;
        } else {
            noteContainer.innerHTML = `
         
            <div class="cardnotes n-bd">
            <div class="card-body">
                <h1 class="card-title t-cen">No Notes</h1>
                <p class="card-text">No notes to display ... Add one to display</p>
            </div>
        </div>
         
            `   
        }
    });
}

// Function to delete specific notes


function deleteNote(index) {
   
    notes = localStorage.getItem("notes")
    if (notes === null) {
        notesArray = []
    } else {
        notesArray = JSON.parse(notes)
    }
    notesArray.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesArray))
    shownotes()
    
    
}



// Function to edit the note

function editNote(index) {
    alert("Edit note button has been clicked.")
    notes = localStorage.getItem("notes")
    if (notes === null) {
        notesArray = []
    } else {
        notesArray = JSON.parse(notes)
    }
    textArea.value = notesArray[index];
    notesArray.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesArray))
    shownotes()
}



