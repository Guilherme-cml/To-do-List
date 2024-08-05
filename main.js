const button = document.querySelector('.button');
const input = document.querySelector('.input');
const list = document.querySelector('.list');

function createLi(){
    const li = document.createElement('li');
    return li;
}

button.addEventListener('click', () => {
    if(input.value === ''){
        alert('Por favor, insira uma tarefa');
        return;} 
    createTask(input.value);
});

document.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        if(input.value === ''){
            alert('Por favor, insira uma tarefa');
            return;} 
        createTask(input.value);
    }
});

function createTask(input){
    const li = createLi();
    li.innerHTML = input;
    list.appendChild(li);
    cleanInput();
    createDeleteButton(li);
    saveTasks();
}

function cleanInput(){
    input.value = ''
    input.focus();
}

function createDeleteButton(li){
    const button = document.createElement('button');
    button.classList.add('delete');
    button.innerText = 'X';
    li.appendChild(button);
    button.addEventListener('click', (e) => {
        const target = e.target;
        if(target.classList.contains('delete')) {
        li.remove();
        saveTasks();
    }
    });
    
}


function saveTasks(){
    const tasks = list.querySelectorAll('li');
    const listItems = [];
    for(let task of tasks){
        let taskText = task.innerText;
        taskText = taskText.replace('X', '').trim();
        listItems.push(taskText);
    }
    const tasksJSON = JSON.stringify(listItems);
    localStorage.setItem('list', tasksJSON);
}

function loadTasks(){
    const tasks = localStorage.getItem('list');
    const list = JSON.parse(tasks);

    for(let tasks of list){
        createTask(tasks);}}

loadTasks();