import { useRef, useCallback } from "react"
import api from "../constants/API"
import axios from "axios"

const TaskEntry = ({ task, changeHandler, taskHandler, openHandler, tagsLoaded }) => {

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

    const getPriority = (task) => {
        let priority = 0
        if (task.tags) {
            /* TODO: Check priority from tags, with backend */
            task.tags.forEach((t) => {
                // Mock data only
                tagsLoaded.forEach((T) => {
                    if (t === T.name && T.priority > priority) {
                        priority = T.priority
                    }
                })
            })
        }
        if (task.priority > priority) {
            priority = task.priority
        }
        return priority
    }

    return (
        <div className="group"
            flex="~ row" justify="between" items="center"
            p="4"
            border="solid 1 neutral-200"
            bg="hover:neutral-100 active:neutral-200" rounded="xl"
            cursor="pointer" transition="all"
            onClick={() => {
                openHandler(false)
                taskHandler(task)
                openHandler(true)
            }}>
            <div flex="~ row" items="center" gap-x="2" text="#707070">
                <input type="checkbox" ref={completionRef} onClick={(e) => { e.stopPropagation() }} onChange={handleCompleteCheck}
                    border="solid 1" w="5" h="5" rounded="sm" accent="red-500" checked={task.completed}></input>
                <span text="sm center neutral-400" font="bold" w="5" h="5" border="solid 2 neutral-400" rounded="xl">
                    {getPriority(task)}
                </span>
                <span>{task?.name}</span>
            </div>
            <div flex="~ row">
                <div i-carbon="edit" w="0 group-hover:6" h="0 group-hover:6" text="neutral-500"></div>
            </div>
        </div>
    )
}

export default TaskEntry