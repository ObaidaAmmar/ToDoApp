//Model
let todos;

const savedToDos = JSON.parse(localStorage.getItem("todos"));

if(Array.isArray(savedToDos))
{   
    todos = savedToDos;
    
}
else
{
    todos = [{
        title: "Get Groceries",
        dueDate: "2022-11-25",
        id : "id1"
    },{
        title: "Wash Car",
        dueDate: "2022-12-08",
        id : "id2"
    },{
        title: "Make Dinner",
        dueDate: "2023-01-01",
        id: "id3"
    }];
}


render();

//Create ToDo
const createToDo = (title, dueDate) => 
{
    const id = "" + new Date().getTime();

    todos.push({title: title,
                dueDate: dueDate,
                id: id});

    save();			
};

//Delete ToDo
const deleteToDo = todoId =>
{
    todos = todos.filter(function(todo){
        return todo.id !== todoId; 
    });

    save();
};

const changeToDo = todoId =>
{   
    const todoTitle = document.getElementById("input-"+todoId);
    const datePicker = document.getElementById("date-"+todoId);
    for(let todo of todos)
     {   if(todo.id == todoId)
        { todo.title = todoTitle.value;
          todo.dueDate = datePicker.value;
        }  
    
    };
    save();
}

const save = () => localStorage.setItem("todos", JSON.stringify(todos));



//View
function render()
{
    //reset the todoList
    document.getElementById("todo-list").innerHTML = "";
    document.getElementById("todo-list").innerHTML = 
    `<tr class="table-header">
        <td>ToDo Title</td>
        <td>ToDo DueDate</td>
        <td>Edit ToDo</td>
        <td>Remove ToDo</td>
     </tr>`

    todos.forEach(todo =>
    {   
        const todoList = document.getElementById("todo-list");
        const template = `<tr class="todos">
                            <td><input type="text" id="input-${todo.id}" value="${todo.title}"/></td>
                            <td><input type="date" id="date-${todo.id}" value="${todo.dueDate}" /></td>
                            <td><button class="edit-button" id="edit-${todo.id}" onclick="editToDo(event)">Edit</button></td>
                            <td><button class="remove-button" id="${todo.id}" onclick="removeToDo(event)">Remove</button></td>
                          </tr>`;
        
        
        todoList.innerHTML += template;
        
    });
};

//Controller
const addToDo = () =>
{	
    const textbox = document.getElementById("todo-title");
    const todoTitle = textbox.value;

    const datePicker = document.getElementById("date-picker");
    const dueDate = datePicker.value;

    createToDo(todoTitle, dueDate);
    render();
    location.reload();
};

function editToDo(event)
{
    const editButton = event.target;
    const buttonId = editButton.id.slice(5);
    changeToDo(buttonId);
    render();
    location.reload();
}

function removeToDo(event)
{ 
    const deleteButton = event.target;
    const buttonId = deleteButton.id; 	
    deleteToDo(buttonId);
    render();
};