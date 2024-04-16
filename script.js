//Элементы со страницы
const form = document.querySelector('#form') //форма
const taskInput = document.querySelector('#taskInput') //инпут
const tasksList = document.querySelector('#tasksList') // юэлька
const emptyList = document.querySelector('#emptyList') //лишка, в которой написано что задач нет


let tasks = []

if(localStorage.getItem('tasks')){
   tasks = JSON.parse(localStorage.getItem('tasks'))
   tasks.forEach((task) => renderTask(task))
}


checkEmptyList()

let timeAddDelTask = 


//Добавление задачи
form.addEventListener('submit', addTask)


//Удаление задачи
tasksList.addEventListener('click', deleteTask)

//Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)

//Функции

//Добавляем таски
function addTask(event){
    event.preventDefault()  //Глянуть что это - отменяем отправку формы?
    
    
    //Текст из инпута
    const taskText = taskInput.value

    //Объект содержащий все таски - лишки (описываем задачу)
    const newTask = {
        id: Date.now(), //??? время в милисекундах для создания уникального айди
        text: taskText,
        done: false //на старте задача еще не выполнена - фолс
    }

    //Добавляю задачу в массив с задачами
    tasks.push(newTask)

    renderTask(newTask)

    //Очищаем поле ввода инпута 
    taskInput.value = ''     //малец не понял, спросить у никиты
    taskInput.focus()


    checkEmptyList()
    // if(tasksList.children.length > 1){
    //     emptyList.classList.add('none')  //если в списке элементов больше одного элиента добавляем класс со свойством ноун
    // } 
    // saveHTMLtoLs() сохранение всей разметки (хуевый способ)
    saveToLocalStorage()
}


//По какой кнопке кликнули, дата атрибут дэлит
function deleteTask(event){
   
    //Проверяем если клик был НЕ на кнопке "удалить задачу"
    
    if(event.target.dataset.action !== 'delete') return
    const parentNode = event.target.closest('li')
    
    //Определяем ID задачи
    const id = Number(parentNode.id)

    // //Найдем индекс задачи в массиве
    // const index = tasks.findIndex(function(task){                //Первый способ
    //     return task.id === id
    // })
    
    // //Удаляем задачу из массива 
    // tasks.splice(index, 1)


    //Удаляем задачу через фильтрацию массива
    tasks = tasks.filter(function(task){                           //Второй способ
        if(task.id === id){
            return false
        }else{
            return true
        }
    })
    saveToLocalStorage()

    //Удаляем задачу из разметки
    parentNode.remove()
    //Проверка если в списке задач 1 элем, показываем блок список задач пуст
    // if(tasksList.children.length === 1){
    //     emptyList.classList.remove('none')
    // }

    checkEmptyList()
}

function doneTask(event){
    //Проверяем что клик на кнопке есс
    if(event.target.dataset.action === 'done'){
        const parentNode = event.target.closest('li')
        //Определяем айди задачи
        const id = +parentNode.id
        
        const task = tasks.find((task) => task.id === id)  // ОБСУДИТЬ
        
        task.done = !task.done

        saveToLocalStorage()
        

        const taskTitle = parentNode.querySelector('span')   //Хуя
        taskTitle.classList.toggle('task-title--done')   //Хуя 2
    }
    // saveHTMLtoLs() сохранение всей разметки (хуевый способ)
}

function checkEmptyList(){
    if(tasks.length === 0){
        const emptyListHTML = `<li id="emptyList">
        Список дел пуст
    </li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }
    if(tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null    // Еще раз с условием разобраться
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task){
    //формируем CSS класс
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

    //Разметка лишек для добавления задач
    const taskHTML = `<li id='${task.id}' class="list-group">
    <span class='${cssClass}'>${task.text}</span>
    <button type='button' class="yes" alt='Yes'>
        <img data-action="done"  class = 'yesNo' src="/img/yes.svg" alt="Yes">
    </button>
    <button type='button'  class="no" alt='No'>
        <img data-action="delete" class = 'yesNo' src="/img/no.svg" alt="No">
    </button>
    <hr>
</li>`

    //Теперь добавим новую разметку, которую выше сформировал
     
        tasksList.insertAdjacentHTML('beforeend', taskHTML)    //Прочитать про метод. Первый параметр куда добавлем(в конец), второй какую переменную
}









//localStorage.setItem('name', 'Alex') - ключ значение 
//localStorage.getItem('name') - передаю ключ чтобы получить значение

// if(localStorage.getItem('tasksHTML')){
//     tasksList.innerHTML = localStorage.getItem('tasksHTML')
// }    сохранение всей разметки (хуевый способ)

// function saveHTMLtoLs(){
//     localStorage.setItem('tasksHTML', tasksList.innerHTML)
// }  сохранение всей разметки (хуевый способ)



