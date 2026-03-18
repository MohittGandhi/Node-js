const fs = require("fs")
const filePath = "./task.json";

const loadtask = () =>{
    try {
        const databuffer =  fs.readFileSync(filePath)
        const datajson = databuffer.toString()
        return JSON.parse(datajson)
    } catch (error) {
        return[]   
    }
}
const addTask = (task) =>{
    const tasks = loadtask()
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task added",task);
}

const removeTask = (task) =>{
    const tasks = loadtask();
    if (task > tasks.length){
      console.log("invalid index")
      return
    }
    tasks.splice(task-1,1);
    saveTasks(tasks);
    console.log("task removed", task);
}

const saveTasks = (tasks) =>{
    const datajson = JSON.stringify(tasks)
    fs.writeFileSync(filePath,datajson);
}

const updateTask = (index, newTask) => {
    const tasks = loadtask();
    if (index < 1 || index > tasks.length) {
        console.log("Invalid index");
        return;
    }
    tasks[index - 1] = { task: newTask };
    saveTasks(tasks);
    console.log("Task updated:", newTask);
}

const listTask = () =>{
   const tasks = loadtask();
  /*  const lists = fs.readFileSync(filePath,"utf-8")
   const tasks = JSON.parse(lists)
   console.log(tasks) */
   tasks.forEach((tasks,index)=> console.log(`${index+1} - ${tasks.task}`));
}

const command = process.argv[2]
const argument = process.argv[3]
const extraArg = process.argv[4]

if(command === 'add'){
    addTask(argument)
}else if(command === 'list'){
    listTask()
}else if(command === 'remove'){
    removeTask(argument)
}else if(command === 'update'){
    updateTask(argument, extraArg)
}else {
    console.log("command not found !");
}