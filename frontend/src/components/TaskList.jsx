import TaskEntry from './TaskEntry'
import actions from '../constants/Actions'
import mocks from '../constants/Mocks'
import { useEffect, useState } from 'react'

const TaskList = ({ listing, searchTerm, sorting, sortDirection, taskHandler, openHandler }) => {

    const tasks = [
        mocks.tasks.baseCase,
        mocks.tasks.withDescription,
        mocks.tasks.completed,
        mocks.tasks.higherPriority,
        mocks.tasks.withDueDate
    ]

    const [changed, setChanged] = useState(false)

    /**
     * Returns sorted tasks with option
     * @param {Object[]} tasks 
     * @param {String} sortOption 
     * @returns {Object[]}
     */
    const sortTasks = (tasks, sortOption, sortDirection) => {
        let sorted
        if (sortOption === "Priority") {
            sorted = tasks.sort((t, T) => {
                return T.priority - t.priority
            })
        }
        if (sortOption === "Alphabetical") {
            sorted = tasks.sort((t, T) => {
                if (t.name < T.name) return -1;
                else if (t.name > T.name) return 1;
                return 0
            })
        }
        if (sortOption === "Due Date") {
            sorted = tasks.sort((t, T) => {
                if (t.reminder || T.reminder) {
                    if (!t.reminder) return 1;
                    if (!T.reminder) return -1;
                    return t.reminder?.at - T.reminder?.at
                }
                return 0
            })
        }
        if (sortDirection) return sorted.reverse()
        return sorted
    }

    useEffect(() => {
        if (!changed) return
        setChanged(false)
    }, [changed])

    return (
        <div flex="~ col" grow="~" gap-y="2" m="4" h="full">
            <span text="3xl" ml="6" mb="2" font="bold">
                {
                    (() => {
                        if (listing === actions.LIST_ACTIVE) return "Active list"
                        if (listing === actions.LIST_DUE_SOON) return "Due soon"
                        if (listing === actions.LIST_COMPLETED) return "Completed"
                    })()
                }
            </span>

            { /* TODO: Make a self contained scrolling view of tasks. */}
            <div grow="~" h="full" overflow="y-auto">
                <div flex="~ col" grow="~" gap-y="2" sticky="~">
                    { /* TODO: Generate task list from backend */}
                    { /* TODO: Filter by search */}

                    { /* Filtering by categories */}
                    {
                        sortTasks(tasks, sorting, sortDirection).map((t) => {
                            if (listing === actions.LIST_ACTIVE && !t.completed) {
                                return <TaskEntry changeHandler={setChanged} openHandler={openHandler} taskHandler={taskHandler}
                                    key={t._id} task={t}></TaskEntry>
                            }
                            if (listing === actions.LIST_DUE_SOON && !t.completed
                                && t.reminder && Math.ceil((t.reminder.at - t.pub_date) / (1000 * 3600 * 24)) <= 7) {
                                return <TaskEntry changeHandler={setChanged} openHandler={openHandler} taskHandler={taskHandler}
                                    key={t._id} task={t}></TaskEntry>
                            }
                            else if (listing === actions.LIST_COMPLETED && t.completed) {
                                return <TaskEntry changeHandler={setChanged} openHandler={openHandler} taskHandler={taskHandler}
                                    key={t._id} task={t}></TaskEntry>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskList