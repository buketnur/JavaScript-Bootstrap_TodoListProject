// Tüm elementler seçildi

const form = document.querySelector('.header');
const todoInput = document.querySelector('#task');
const todoList = document.querySelector("#list");
const todoListItem = document.querySelector('.list-group-item');

let toastTitles = document.querySelector('#toastTitle');
let toastMessages = document.querySelector('#toastMessage');
let toastBgDom = document.querySelector('#toast-Bg')
const toastLiveExample = document.getElementById('liveToast')

function toastFunc(toastTitle, toastMessage, toastBg) {

    const toast = new bootstrap.Toast(toastLiveExample)
    toastTitles.innerHTML = toastTitle;
    toastMessages.innerHTML = toastMessage;
    toastBgDom.className = toastBg;

    toast.show();

    setTimeout(function() {
        toast.hide()
    },10000);

}



// Submit
eventlisteners();

function eventlisteners(){ // tüm event listeners
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    todoList.addEventListener("click", deleteTodo);
}


function deleteTodo(e){

    if(e.target.className === "delete-item close"){
        e.target.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.firstChild.nodeValue);
        toastFunc("Sil !", "Öğeyi sildin!", "bg-info");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    console.log("deletetodo:", deletetodo);
  console.log("todos:", todos);
  
    todos.forEach(function(todo, index){

        console.log("todo:", todo.trim());

        if (todo.trim() === deletetodo.trim()){
            todos.splice(index,1);
        }
    })

    console.log("updated todos:", todos);

    localStorage.setItem("todos", JSON.stringify(todos));
}


function loadAllTodosToUI(e){
    let todos = getTodosFromStorage();

    todos.forEach(todo => {
        addTodoUI(todo);
    });
}


function addTodo(e) {
   const newTodo = todoInput.value.trim();

   //newTodo boş ise alert çıkartan fonksiyon

    if(newTodo === "") {
        toastFunc("Upss", "Bir şeyler yazmalısın!", "bg-danger");
    }
    else{
        
        addTodoUI(newTodo);
        toastFunc("İşte bu!", "Listeye Eklendi", "bg-success");
        addTodoToStorage(newTodo);
    }  
    e.preventDefault();
}



//localStorage a ekleme
function getTodosFromStorage(){ // storagedan bütün todoları alıyoruz
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
}

function addTodoToStorage(newTodo){
   let todos = getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos", JSON.stringify(todos));
}







//list item oluşturma
function addTodoUI(newTodo){ //string değeri ui a list e ekleyecek
    const listItem = document.createElement("li")
    const deletebtn = document.createElement("a");

    deletebtn.href = "#";
    deletebtn.className = "delete-item close";
    deletebtn.innerHTML = "x";

    listItem.className = "list-group-item"

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(deletebtn);

// task a list item ı ekleme

    todoList.appendChild(listItem);
    todoInput.value = "";


}








