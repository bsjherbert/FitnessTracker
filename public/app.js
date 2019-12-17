const actionBtn = document.getElementById("action-button");
// new item
const makeNote = document.getElementById("make-new");
// clear all items
const clear = document.getElementById("clear-all");
// delete an item
const results = document.getElementById("results");

const status = document.getElementById("status");

function getResults() {
  clearTodos();
  fetch("/all")
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function(data) {
        console.log(data.data);
        newTodoSnippet(data.data);
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

function newTodoSnippet(res) {
  console.log(res);
  for (var i = 0; i < res.length; i++) {
    let data_id = res[i]["_id"];
    let name = res[i]["name"];
    let todoList = document.getElementById("results");
    snippet = `
      <p class="data-entry">
      <span class="dataTitle" data-id=${data_id}>${name}</span>
      <span onClick="delete" class="delete" data-id=${data_id}>x</span>;
      </p>`;
    todoList.insertAdjacentHTML("beforeend", snippet);
  }
}

function clearTodos() {
  const todoList = document.getElementById("results");
  todoList.innerHTML = "";
}

function resetTitleAndNote() {
  const type = document.getElementById("type");
  type.value = "";
  const name = document.getElementById("name");
  name.value = "";
}

function updateTitleAndNote(data) {
  console.log(data);
  const type = document.getElementById("type");
  type.value = data.type;
  const name = document.getElementById("name");
  name.value = data.name;
}

getResults();

clear.addEventListener("click", function(e) {
  if (e.target.matches("#clear-all")) {
    element = e.target;
    data_id = element.getAttribute("data-id");
    fetch("/clearall", {
      method: "delete"
    })
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        clearTodos();
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }
});

results.addEventListener("click", function(e) {
  if (e.target.matches(".delete")) {
    element = e.target;
    data_id = element.getAttribute("data-id");
    fetch("/delete/" + data_id, {
      method: "delete"
    })
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        element.parentNode.remove();
        resetTitleAndNote();
        let newButton = `
      <button id='make-new'>Submit</button>`;
        actionBtn.innerHTML = newButton;
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  } else if (e.target.matches(".dataTitle")) {
    element = e.target;
    data_id = element.getAttribute("data-id");
    status.innerText = "Editing";

    fetch("/api/exercise/" + data_id, { method: "get" })
      .then(response => response.json())
      .then(function(data) {
        updateTitleAndNote(data.data);
        let newButton = `<button id='updater' data-id=${data_id}>Update</button>`;
        actionBtn.innerHTML = newButton;
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }
});

actionBtn.addEventListener("click", function(e) {
  if (e.target.matches("#updater")) {
    updateBtnEl = e.target;
    data_id = updateBtnEl.getAttribute("data-id");
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    fetch("/api/exercise/" + data_id, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        type
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        element.innerText = name;
        resetTitleAndNote();
        let newButton = `<button id='make-new'>Submit</button>`;
        actionBtn.innerHTML = newButton;
        status.innerText = "Creating";
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  } else if (e.target.matches("#make-new")) {
    element = e.target;
    data_id = element.getAttribute("data-id");
    fetch("/submit", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: document.getElementById("type").value,
        name: document.getElementById("name").value,
        created: Date.now()
      })
    })
      .then(res => res.json())
      .then(res => newTodoSnippet([res]));
    resetTitleAndNote();
  }
});
