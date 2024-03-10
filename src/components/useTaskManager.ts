import { useState } from "react";
import { nanoid } from "nanoid";

interface Task {
    id: string,
    title: string;
}

const useTaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (title: string) => {
        if(title.length < 1){
            return ;
        }

        const newTask: Task = {
            id: nanoid(),
            title,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const completeTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const updateTask = (id: string, taskUpdate: Partial<Task>) => {
        setTasks((prevTasks) => 
        prevTasks.map((task) => (task.id === id? {...task, taskUpdate} : task))
        );
    };

    const filterTasks = (searchKeyword: string) => {
        return tasks.filter((task) => 
        task.title.toLowerCase().includes(searchKeyword.toLowerCase()))
    }

    return {tasks, addTask, completeTask, updateTask, filterTasks};
}

export default useTaskManager;