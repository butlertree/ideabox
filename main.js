/* Query Selectors */
var saveButton = document.querySelector(".save-btn");
var titleText = document.querySelector("#title");
var bodyText = document.querySelector("#body");
var outputContainer = document.querySelector(".output-container");

/* Data Model */
var currentIdeas = {
  ideas: []
}

/* Event Listeners */
titleText.addEventListener('input', toggleSaveButton);
bodyText.addEventListener('input', toggleSaveButton);
saveButton.addEventListener('click', function() {
  saveIdea();
  showIdea();
})

/* Functions */
function createIdea(){
  var idea = {
      title: titleText.value, 
      body: bodyText.value, 
      id: Date.now(),
      isFave: false
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
  var newIdeaFaveFalse = document.createElement("img");
  var newIdeaFaveTrue = document.createElement("img");
  var deleteContainer = document.createElement("section");
  var deleteNewIdea = document.createElement("img");

  newIdea.className = "new-idea";
  newIdeaTitle.className = "new-idea-title";
  newIdeaBody.className = "new-idea-body";
  newIdeaFaveFalse.className = "new-idea-fave-btn";
  newIdeaFaveTrue.className = "new-idea-fave-btn";
  deleteContainer.className = "delete-container";
  deleteNewIdea.className = "delete-new-idea-img";

  for (var i = 0; i < currentIdeas.ideas.length; i++) {
    newIdeaTitle.innerHTML = currentIdeas.ideas[i].title;
    newIdeaBody.innerHTML = currentIdeas.ideas[i].body;
    newIdeaFaveFalse.setAttribute("src", "assets/star.svg");
    newIdeaFaveFalse.setAttribute("alt", "a white star-shaped button");
    newIdeaFaveTrue.setAttribute("src", "assets/star-active.svg");
    newIdeaFaveTrue.setAttribute("alt", "an orange star-shaped button");
    newIdeaFaveTrue.classList.add("hidden");
    deleteNewIdea.setAttribute("src", "assets/delete.svg");
    deleteNewIdea.setAttribute("alt", "a white colored icon that looks like an x");

    newIdea.innerHTML = "";

    outputContainer.appendChild(newIdea);
    newIdea.appendChild(deleteContainer);
    newIdea.appendChild(newIdeaTitle);
    newIdea.appendChild(newIdeaBody);
    deleteContainer.appendChild(newIdeaFaveFalse);
    deleteContainer.appendChild(newIdeaFaveTrue);
    deleteContainer.appendChild(deleteNewIdea);
  }
  titleText.value = "";
  bodyText.value = "";
}