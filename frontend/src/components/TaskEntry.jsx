import { useRef, useCallback } from "react"
import api from "../constants/API"
import axios from "axios"

const TaskEntry = ({ task, changeHandler, taskHandler, openHandler }) => {

    const completionRef = useRef(null)

    const handleCompleteCheck = useCallback(() => {
        task.completed = completionRef.current.checked
        try {
            axios.put(`${api.API_URL}/todo/update/${task._id}`, task)
        } catch (e) {
            alert("Cannot resolve PUT /update")
        } finally {
            changeHandler(true)
        }
    }, [completionRef])

    return (
        <div className="group"
            flex="~ row" justify="between" items="center"
            p="4"
            border="solid 1 neutral-200"
            bg="hover:neutral-100 active:neutral-200" rounded="xl"
            cursor="pointer" transition="all"
            onClick={() => {
                taskHandler(task)
                openHandler(true)
            }}>
            <div flex="~ row" items="center" gap-x="2">
                <input type="checkbox" ref={completionRef} onChange={handleCompleteCheck}
                    border="solid 1" w="5" h="5" rounded="sm" accent="red-500" checked={task.completed}></input>
                <span text="sm center neutral-400" font="bold" w="5" h="5" border="solid 2 neutral-400" rounded="xl">
                    {task?.priority}
                </span>
                <span>{task?.name}</span>
            </div>
            <div flex="~ row">
                <div i-carbon="edit" w="0 group-hover:6" h="0 group-hover:6" text="neutral-700"></div>
            </div>
        </div>
    )
}

export default TaskEntry