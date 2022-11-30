let userInput = document.querySelector('.user-input');
let addBtn = document.querySelector('.add-btn');
let taskList = [];
let tabs = document.querySelectorAll('.task-tabs div');
let mode = "all";
let filterList = [];
let underLine = document.querySelector('.under-line');

addBtn.addEventListener('click', addList);
userInput.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        addList(event);
    }
})
for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener('click', function(event){filter(event)});
}

function addList(){
    let task = {
        content : userInput.value,
        id : randomId(),
        marking : false
    }
    taskList.push(task);
    userInput.value = '';
    render();
};

function render(){
    let list = [];
    if(mode == "all"){
        list = taskList;
    } else {
        list = filterList;
    }
    let result = '';
    for(let i=0; i<list.length; i++){
        if(list[i].marking == true){
            result+=`<div class="task-wrap">
                <div class="task-txt">
                    <p class="line">${list[i].content}</p>
                </div>
                <div class="btn-box">
                    <button onclick="checked('${list[i].id}')">Check</button>
                    <button onclick="deleted('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        } else{
            result+=`<div class="task-wrap">
                <div class="task-txt">
                    <p>${list[i].content}</p>
                </div>
                <div class="btn-box">
                    <button onclick="checked('${list[i].id}')">Check</button>
                    <button onclick="deleted('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        }
    }
    document.querySelector('.task-box').innerHTML = result;
};
checked = (id)=>{
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].marking = !taskList[i].marking;
            break
        }
    }
    render();
}
deleted = (id)=>{
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break
        }
    }
    render();
}
filter = (event)=>{
    mode = event.target.id;
    if(event){
        underLine.style.width = event.target.offsetWidth + 'px';
        underLine.style.left = event.target.offsetLeft + 'px';
        underLine.style.top = (event.target.offsetTop + (event.target.Height - 4) + 'px');
    }
    filterList = [];
    if(mode == "going"){
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].marking == false){
                filterList.push(taskList[i]);
            }
        }
    } else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].marking == true){
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}
randomId = ()=>{
    return Math.random().toString(36).substr(2, 8);
}