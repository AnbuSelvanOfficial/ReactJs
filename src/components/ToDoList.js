import React, {useEffect, useState} from 'react';
import CreateTaskPopUp from '../models/CreateTaskPopUp'
import Card from './Card';
import Logo from '../Logo.png';

const ToDoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    console.log(Logo);

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }


    return (
        <>
            <div className = "header text-center">
                <img src={Logo}  width="100" height="100" alt="Logo" />
                <h1>To Do List</h1>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
                
            </div>
           
            <div className = "task-container">
                {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTaskPopUp toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default ToDoList;