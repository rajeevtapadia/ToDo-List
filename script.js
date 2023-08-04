const input = document.getElementById('input');
const list = document.getElementById('list-container');

// function to add task
const addTask = () => {
    let task = input.value;
    if(task === '')
        input.placeholder = 'Please Enter Some Text'
    else{
        list.innerHTML += `<li>${task} <span>\u00d7</span></li>`;
        input.value = '';
        input.placeholder = 'What needs to be done';
        save();
    }
}

input.addEventListener('keydown', event => {
    if(event.key === 'Enter')
        addTask();
});

list.addEventListener('click', event => {
    console.log(event.target);
    if(event.target.tagName === 'LI'){
        event.target.classList.toggle('checked');
        shuffle(event);
        save();
    }
    else if(event.target.tagName == 'SPAN'){
        event.target.parentElement.remove();
        save();
    }
})

// function to show task from local storage on page load
const display = () => {
    let data = localStorage.getItem('taskList');
    list.innerHTML = data;
}

// function to save task in localstorage
const save = () => {
    localStorage.setItem('taskList', list.innerHTML);
}

// function to append completed tasks at bottom
const shuffle = (event) => {
    console.log(event.target.classList);
    let checkedTask = event.target.outerHTML;
    if('checked' === event.target.classList[0]){
        // shift down
        event.target.remove();
        list.innerHTML += checkedTask
    }
    else{
        // shift up
        event.target.remove();
        list.innerHTML = checkedTask + list.innerHTML;
    }
}

display();
