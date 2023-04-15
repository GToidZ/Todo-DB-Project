import TaskEntry from './TaskEntry'
import actions from '../constants/Actions'

const TaskList = ({ listing }) => {
    return (
        <div flex="~ col" grow="~" gap-y="2" m="4">
            <span text="3xl" ml="6" mb="2" font="bold">
                {
                    (() => {
                        if (listing === actions.LIST_ACTIVE) return "Active list"
                        if (listing === actions.LIST_DUE_SOON) return "Due soon"
                        if (listing === actions.LIST_COMPLETED) return "Completed"
                    })()
                }
            </span>

            { /* TODO: Generate task list from backend */}
            <TaskEntry></TaskEntry>
            <TaskEntry></TaskEntry>
            <TaskEntry></TaskEntry>
            <TaskEntry></TaskEntry>
        </div>
    )
}

export default TaskList