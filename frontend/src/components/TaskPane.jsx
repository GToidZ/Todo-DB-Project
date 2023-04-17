import { useState } from "react"
import moment from "moment/moment"

const TaskPane = ({ currentTask, closeHandler, paneHandler }) => {

    const task = currentTask || {
        name: "",
        description: "",
        priority: 0,
        completed: false,
        tags: []
    }

    // TODO: Make a handler that saves the task

    const [settingReminder, toggleReminder] = useState(false)

    return (
        <div flex="~ col" basis="1/3" mr="4" p="5" bg="neutral-100" rounded="xl">
            <span text="2xl" mb="8" w="full">
                <input type="text" placeholder="Todo name"
                    font="bold" w="5/6"
                    border="solid 0 b-1" value={currentTask?.name || ""}
                    onChange={() => { }} />
            </span>
            <div flex="~ col" gap-y="1" mb="4">
                Description
                <textarea placeholder="Write your description..."
                    border="solid 1 neutral-200" bg="white" resize="none" h="60"
                    rounded="xl" p="5" value={currentTask?.description || ""}
                    onChange={() => { }}></textarea>
            </div>
            <div flex="~ row" items="center" justify="between" gap-x="8" mb="4">
                Tags
                <div grow="~" border="solid 1 neutral-200" resize="none"
                    bg="white hover:neutral-100 active:neutral-200" rounded="xl" p="5"
                    cursor="pointer">
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
                    value={currentTask?.priority || 0} min={0}
                    onChange={() => { }} />
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
                                rounded="lg" p-y="1" p-x="2" value={(currentTask?.reminder?.at && moment(currentTask?.reminder?.at).format("YYYY-MM-DDTkk:mm")) || ""}
                                onChange={() => { }}></input>
                        </span>
                    </div>
                }
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
                                cursor="pointer">
                                <div i-carbon="save" text="3xl"></div>
                                Save
                            </button>
                            <button flex="~ col" items="center" border="none"
                                cursor="pointer">
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
                                cursor="pointer">
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