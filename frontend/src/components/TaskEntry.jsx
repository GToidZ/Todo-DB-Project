import { useRef, useCallback } from "react"
import api from "../constants/API"
import axios from "axios"

const TaskEntry = ({ task }) => {

    const completionRef = useRef(null)

    const handleCompleteCheck = useCallback(() => {
        task.completed = completionRef.current.checked
        axios.post(`${api.API_URL}/todo/update/${task._id}`, task)
    }, [completionRef])

    return (
        <div className="group"
            flex="~ row" justify="between" items="center"
            p="4"
            border="solid 1 neutral-200"
            bg="hover:neutral-100 active:neutral-200" rounded="xl"
            cursor="pointer" transition="all">
            <div flex="~ row" items="center" gap-x="2" text="#707070">
                <input type="checkbox" ref={completionRef} onChange={handleCompleteCheck}
                    border="solid 1" w="4" h="4" rounded="sm" accent="red-500" checked={task.completed}></input>
                { /* TODO: Figure out where to put priority */}
                <span>{task?.name}</span>
            </div>
            <div flex="~ row">
                <div i-carbon="edit" w="0 group-hover:6" h="0 group-hover:6" text="neutral-500"></div>
            </div>
        </div>
    )
}

export default TaskEntry