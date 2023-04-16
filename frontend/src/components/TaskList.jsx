import TaskEntry from './TaskEntry'
import actions from '../constants/Actions'
import mocks from '../constants/Mocks'

const TaskList = ({ listing }) => {

    const tasks = [
        mocks.tasks.baseCase,
        mocks.tasks.completed,
        mocks.tasks.higherPriority,
        mocks.tasks.withDueDate
    ]

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
            { /* TODO: Filter by search */}

            { /* Filtering by categories */}
            {
                tasks.map((t) => {
                    if (listing === actions.LIST_ACTIVE && !t.completed) {
                        return <TaskEntry key={t._id} task={t}></TaskEntry>
                    }
                    if (listing === actions.LIST_DUE_SOON && !t.completed
                        && t.reminder && Math.ceil((t.reminder.at - t.pub_date) / (1000 * 3600 * 24)) <= 7) {
                        return <TaskEntry key={t._id} task={t}></TaskEntry>
                    }
                    else if (listing === actions.LIST_COMPLETED && t.completed) {
                        return <TaskEntry key={t._id} task={t}></TaskEntry>
                    }
                })
            }
        </div>
    )
}

export default TaskList