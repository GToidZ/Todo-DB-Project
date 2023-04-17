import TaskEntry from './TaskEntry'
import actions from '../constants/Actions'
import { useEffect, useState } from 'react'
import moment from 'moment'

const TaskList = ({ listing, searchTerm, sorting, sortDirection, taskHandler, openHandler, tagsLoaded, tasks }) => {

    const [changed, setChanged] = useState(false)

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
                return getPriority(T) - getPriority(t)
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

    async function fetch() {
        const tasksResponse = await axios.get(`${api.API_URL}/todo`)
        const tagsResponse = await axios.get(`${api.API_URL}/tag/getTag`)
        setTasks(tasksResponse.data)
        setLoadedTags(tagsResponse.data)
    }

    useEffect(() => {
        if (!changed) return
        setChanged(false)
    }, [changed])

    return (
        <div flex="~ col" grow="~" gap-y="2" m="4" h="full">
            <span text="3xl #515153" ml="6" mb="2" font="bold">
                {
                    (() => {
                        if (listing === actions.LIST_ACTIVE) return "Active list"
                        if (listing === actions.LIST_DUE_SOON) return "Due soon"
                        if (listing === actions.LIST_COMPLETED) return "Completed"
                    })()
                }
            </span>

            <div grow="~" h="full" overflow="y-auto">
                <div flex="~ col" grow="~" gap-y="2" sticky="~">
                    { /* TODO: Generate task list from backend */}
                    { /* TODO: Filter by search */}

                    { /* Filtering by categories */}
                    {
                        tasks &&
                        sortTasks(tasks, sorting, sortDirection).map((t) => {
                            if (listing === actions.LIST_ACTIVE && !t.completed) {
                                return <TaskEntry changeHandler={setChanged} openHandler={openHandler} taskHandler={taskHandler}
                                    key={t._id} task={t} tagsLoaded={tagsLoaded}></TaskEntry>
                            }
                            if (listing === actions.LIST_DUE_SOON && !t.completed
                                && t.reminder && Math.ceil((moment(t.reminder.at).toDate() - new Date()) / (1000 * 3600 * 24)) <= 7) {
                                return <TaskEntry changeHandler={setChanged} openHandler={openHandler} taskHandler={taskHandler}
                                    key={t._id} task={t} tagsLoaded={tagsLoaded}></TaskEntry>
                            }
                            else if (listing === actions.LIST_COMPLETED && t.completed) {
                                return <TaskEntry changeHandler={setChanged} openHandler={openHandler} taskHandler={taskHandler}
                                    key={t._id} task={t} tagsLoaded={tagsLoaded}></TaskEntry>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskList