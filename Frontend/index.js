function handleAdd() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;

    fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify({
            "title": title,
            "description": description
        }),
        headers: {
            "Content-Type": "application/json"
        }
        
    }).then(res => res.json()).then(addCallback)
}

function addCallback(data) {
    console.log(data);
    var parentElement = document.getElementById("Container");
    var todoList = document.getElementById("List");
    var childElement = document.createElement("div");
    childElement.setAttribute("class", "todoContainer");
    childElement.setAttribute("id",`todo${data[i].id}`);

    var grandChildElement1 = document.createElement("div");
    grandChildElement1.innerHTML = `Title: ${data.title}`;

    var grandChildElement2 = document.createElement("div");
    grandChildElement2.innerHTML = `Description: ${data.description}`;

    var grandChildElement3 = document.createElement("button");
    grandChildElement3.innerHTML = "DELETE";
    grandChildElement3.setAttribute("onClick", "handleDelete(" + data.id + ")");

    var grandChildElement4 = document.createElement("button");
    grandChildElement3.innerHTML = "EDIT";
    grandChildElement3.setAttribute("onClick", "handleEdit(" + data.id + ")");

    childElement.appendChild(grandChildElement1);
    childElement.appendChild(grandChildElement2);
    childElement.appendChild(grandChildElement3);
    childElement.appendChild(grandChildElement4);
    todoList.appendChild(childElement);
}

function getTodos() {
    fetch("http://localhost:3000/todos", {
        method: "GET"
    }).then(res => res.json()).then(showTodos)
}

function showTodos(data) {
    var parentElement = document.getElementById("Container");
    var todoList = document.createElement("div");
    todoList.setAttribute("id", "List");

    for(let i=0; i<data.length; i++) {
        var childElement = document.createElement("div");
        childElement.setAttribute("class", "todoContainer");
        childElement.setAttribute("id",`todo${data[i].id}`);

        var grandChildElement1 = document.createElement("div");
        grandChildElement1.innerHTML = `Title: ${data[i].title}`;

        var grandChildElement2 = document.createElement("div");
        grandChildElement2.innerHTML = `Description: ${data[i].description}`;

        var grandChildElement3 = document.createElement("button");
        grandChildElement3.innerHTML = "EDIT";
        grandChildElement3.setAttribute("onClick", "handleEdit(" + data[i].id + ")");

        var grandChildElement4 = document.createElement("button");
        grandChildElement4.innerHTML = "DELETE";
        grandChildElement4.setAttribute("onClick", "handleDelete(" + data[i].id + ")");

        childElement.appendChild(grandChildElement1);
        childElement.appendChild(grandChildElement2);
        childElement.appendChild(grandChildElement3);
        childElement.appendChild(grandChildElement4);
        todoList.appendChild(childElement);
    }

    parentElement.appendChild(todoList);
    
}

getTodos();

function handleDelete(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(deleteElement)

    function deleteElement() {
        var todoList = document.getElementById("list");
        var todo = document.getElementById(`todo${id}`);
        todoList.removeChild(todo);
        
    }
}

function handleEdit(id) {
    var todo = document.getElementById(`todo${id}`);
    todo.innerHTML = "";
    var childElement1 = document.createElement("input");
    childElement1.setAttribute("placeholder", "Title");
    childElement1.setAttribute("id", "edTitle");

    var childElement2 = document.createElement("input");
    childElement2.setAttribute("placeholder", "Description");
    childElement2.setAttribute("id", "edDesc");

    var childElement3 = document.createElement("button");
    childElement3.innerHTML = "SAVE";
    childElement3.setAttribute("onClick", "handleSave(" + id + ")");
    
    todo.appendChild(childElement1);
    todo.appendChild(childElement2);
    todo.appendChild(childElement3);
        
}

function handleSave(id) {
    const title = document.getElementById("edTitle").value;
    const description = document.getElementById("edDesc").value;

    fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
        response.json();
        })
        .then((data) => {
            var todo = document.getElementById(`todo${id}`);
            todo.innerHTML = "";
            var childElement1 = document.createElement("div");
            childElement1.innerHTML = `Title: ${title}`;

            var childElement2 = document.createElement("div");
            childElement2.innerHTML = `Description: ${description}`;

            var childElement3 = document.createElement("button");
            cildElement3.innerHTML = "EDIT";
            childElement3.setAttribute("onClick", "handleEdit(" + data.id + ")");

            var childElement4 = document.createElement("button");
            cildElement4.innerHTML = "DELETE";
            childElement4.setAttribute("onClick", "handleDelete(" + data.id + ")");

            todo.appendChild(childElement1c);
            todo.appendChild(childElement2);
            todo.appendChild(childElement3);
            todo.appendChild(childElement4);
        })
}
