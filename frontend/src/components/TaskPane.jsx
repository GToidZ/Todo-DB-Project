import { useCallback, useState } from "react"
import axios from "axios"
import moment from "moment/moment"
import api from "../constants/API"

const TaskPane = ({ currentTask, closeHandler, paneHandler }) => {

    let task = currentTask || {
        name: "",
        description: "",
        priority: 0,
        tags: []
    }

    const [taskName, setTaskName] = useState(task.name)
    const [taskDescription, setTaskDescription] = useState(task.description)
    const [taskPriority, setTaskPriority] = useState(task.priority)
    const [taskReminder, setTaskReminder] = useState(task.reminder)

    const saveTask = useCallback(() => {
        if (!taskName) return

        task.name = taskName
        task.description = taskDescription
        task.priority = taskPriority

        if (taskReminder) {
            if (!task.reminder) task.reminder = {}
            task.reminder.at = taskReminder
        }

        if (!task._id) { // POST /todo/add
            axios.post(`${api.API_URL}/todo/add`, task)
            closeHandler(false)
            paneHandler(null)
            return
        }

        axios.put(`${api.API_URL}/todo/update/${task._id}`, task)
        closeHandler(false)
        paneHandler(null)
    })

    const deleteTask = useCallback(() => {
        axios.delete(`${api.API_URL}/todo/delete/${task._id}`)
        closeHandler(false)
        paneHandler(null)
    })

    const [settingReminder, toggleReminder] = useState(false)

    return (
        <div flex="~ col" basis="1/3" mr="4" p="5" bg="neutral-100" rounded="xl">
            <div flex="~ col" overflow-y="auto">
                <div flex="~ row" justify="between" text="2xl" mb="8" w="full">
                    <input type="text" placeholder="Todo name"
                        font="bold" w="5/6"
                        border="solid 0 b-1" defaultValue={task.name}
                        onChange={(e) => { setTaskName(e.target.value) }} />
                    <div i-carbon="close" cursor="pointer" onClick={() => { closeHandler(false); paneHandler(null); }}></div>
                </div>
                <div flex="~ col" gap-y="1" mb="4">
                    Description
                    <textarea placeholder="Write your description..."
                        border="solid 1 neutral-200" bg="white" resize="none" h="60"
                        rounded="xl" p="5" defaultValue={task.description}
                        onChange={(e) => { setTaskDescription(e.target.value) }}></textarea>
                </div>
                <div flex="~ row" items="center" justify="between" gap-x="8" mb="4">
                    Tags
                    <div className="group" flex="~ row" grow="~" border="solid 1 neutral-200" resize="none"
                        bg="white hover:neutral-100 active:neutral-200" rounded="xl" p="5"
                        cursor="pointer" justify="between">
                        <div flex="~ row" items="center" gap-x="2">
                            { /* TODO: Container showing current tags */}
                            {
                                task &&
                                task.tags.map((t) => {
                                    return <div key={t} bg="neutral-500" text="white" p-x="2" rounded="xl">{t}</div>
                                })
                            }
                        </div>
                        <div i-carbon="chevron-right" h="7" w="7" text="transparent group-hover:neutral-500"></div>
                    </div>
                </div>
                <div flex="~ row" items="center" justify="between" gap-x="8" mb="4">
                    <span>Priority <div i-carbon="help"
                        title="Higher number means higher priority,
if a tag in this task has higher priority number than this task,
this priority is superceeded by the tag."
                    ></div>
                    </span>
                    <input type="number" text="right" border="solid 0 b-1"
                        defaultValue={task.priority || 0} min={0}
                        onChange={(e) => { setTaskPriority(e.target.value) }} />
                </div>
                <div flex="~ col" gap-x="8" mb="4">
                    <span flex="~ row" items="center" gap-x="2">
                        <div i-carbon={settingReminder ? "chevron-down" : "chevron-right"} cursor="pointer"
                            onClick={() => { toggleReminder(!settingReminder) }}></div>
                        Reminder
                    </span>
                    {
                        settingReminder &&
                        <div flex="~ col" items="end">
                            Due at
                            <span bg="white" rounded="lg">
                                <input type="datetime-local" border="solid 1 neutral-200"
                                    rounded="lg" p-y="1" p-x="2" defaultValue={(task.reminder?.at && moment(task.reminder?.at).format("YYYY-MM-DDTkk:mm"))}
                                    onChange={(e) => { setTaskReminder(moment(e.target.value, "YYYY-MM-DDTkk:mm").toDate()) }}></input>
                            </span>
                        </div>
                    }
                </div>
            </div>
            {(() => {
                if (currentTask) {
                    return (
                        <div flex="~ row" justify="evenly" items="center" mt="auto">
                            <button flex="~ col" items="center" border="none"
                                cursor="pointer" onClick={() => { closeHandler(false); paneHandler(null); }}>
                                <div i-carbon="close-outline" text="3xl"></div>
                                Cancel
                            </button>
                            <button flex="~ col" items="center" border="none"
                                cursor="pointer" onClick={() => { saveTask(); }}>
                                <div i-carbon="save" text="3xl"></div>
                                Save
                            </button>
                            <button flex="~ col" items="center" border="none"
                                cursor="pointer" onClick={() => { deleteTask(); }}>
                                <div i-carbon="trash-can" text="3xl"></div>
                                Delete
                            </button>
                        </div>
                    )
                } else {
                    return (
                        <div flex="~ row" justify="evenly" items="center" mt="auto">
                            <button flex="~ col" items="center" border="none"
                                cursor="pointer" onClick={() => { closeHandler(false); paneHandler(null); }}>
                                <div i-carbon="close-outline" text="3xl"></div>
                                Cancel
                            </button>
                            <button flex="~ col" items="center" border="none"
                                cursor="pointer" onClick={() => { saveTask(); }}>
                                <div i-carbon="save" text="3xl"></div>
                                Save
                            </button>
                        </div>
                    )
                }
            })()
            }
        </div>
    )

}

export default TaskPane
