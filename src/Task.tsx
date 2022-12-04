import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}


export const Task = memo((
    {task, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {

    const onClickHandler = () => {
        removeTask(task.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }

    return (
        <div key={task.id}
             className={task.isDone ? "is-done" : ""}>
            <Checkbox checked={task.isDone}
                      color="primary"
                      onChange={onChangeHandler}/>
            <EditableSpan value={task.title}
                          onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})


