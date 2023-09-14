var saveButton = document.querySelector(".save-btn");
var titleText = document.querySelector("#title");
var bodyText = document.querySelector("#body");
var outputContainer = document.querySelector(".output-container");

var currentIdeas = {
  ideas: []
};

titleText.addEventListener('input', toggleSaveButton);
bodyText.addEventListener('input', toggleSaveButton);
toggleSaveButton();
saveButton.addEventListener("click", function() {
  saveIdea();
  showIdea();
})

function createIdea(){
  var idea = {
      title: titleText.value, 
      body: bodyText.value, 
      id: Date.now()
  };
  return idea;
}

function toggleSaveButton() {
  if (titleText.value === '' || bodyText.value === '') {
    saveButton.classList.add('disabled');
    saveButton.disabled = true;
  } else {
    saveButton.classList.remove('disabled');
    saveButton.disabled = false;
  }
}

function saveIdea() {
  currentIdeas.ideas.push(createIdea());
}

function showIdea() {
  var newIdea = document.createElement("article");
  var newIdeaTitle = document.createElement("h2");
  var newIdeaBody = document.createElement("p");
  var deleteContainer = document.createElement("section");
  var deleteNewIdea = document.createElement("img");

  newIdea.className = "new-idea";
  newIdeaTitle.className = "new-idea-title";
  newIdeaBody.className = "new-idea-body";
  deleteContainer.className = "delete-container";
  deleteNewIdea.className = "delete-new-idea-img";

  for (var i = 0; i < currentIdeas.ideas.length; i++) {
    newIdeaTitle.innerHTML = currentIdeas.ideas[i].title;
    newIdeaBody.innerHTML = currentIdeas.ideas[i].body;
    newIdea.setAttribute('data-id', currentIdeas.ideas[i].id.toString());
    deleteNewIdea.setAttribute("src", "assets/delete.svg");
    deleteNewIdea.setAttribute("alt", "a white colored icon that looks like an x");
    newIdea.innerHTML = "";
    newIdea.appendChild(deleteContainer);
    deleteContainer.appendChild(deleteNewIdea);
    newIdea.appendChild(newIdeaTitle);
    newIdea.appendChild(newIdeaBody);
    outputContainer.appendChild(newIdea);
  }
  titleText.value = "";
  bodyText.value = "";
  toggleSaveButton();
}

outputContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-new-idea-img')) { 
        var idToDelete = event.target.closest('.new-idea').getAttribute('data-id');

        var newIdeasArray = [];
        for (var i = 0; i < currentIdeas.ideas.length; i++) {
            if (currentIdeas.ideas[i].id.toString() !== idToDelete) {
                newIdeasArray.push(currentIdeas.ideas[i]);
            }
        }
        currentIdeas.ideas = newIdeasArray;

        var card = event.target.closest('.new-idea');
        if (card) {
            outputContainer.removeChild(card);
        }
    }
});