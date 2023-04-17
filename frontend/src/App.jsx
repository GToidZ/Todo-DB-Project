import { useState, useRef, useEffect } from 'react'
import './App.css'
import actions from './constants/Actions'
import AppHeader from './components/AppHeader'
import AppMenu from './components/AppMenu'
import TaskList from './components/TaskList'
import TaskPane from './components/TaskPane'
import axios from 'axios'
import api from "./constants/API"

const App = () => {

  const appHeaderRef = useRef(null)

  const [dockStatus, setDockStatus] = useState(false)
  const [sortDirection, setSortDirection] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("Priority")

  const [action, newAction] = useState(null)
  const [listingAction, setListingAction] = useState(actions.LIST_ACTIVE)

  const [paneOpen, setPaneOpen] = useState(false)
  const [paneTask, setPaneTask] = useState(null)

  const [tasks, setTasks] = useState(null)
  const [loadedTags, setLoadedTags] = useState(null)

  async function fetch() {
    const tasksResponse = await axios.get(`${api.API_URL}/todo`)
    const tagsResponse = await axios.get(`${api.API_URL}/tag/getTag`)
    setTasks(tasksResponse.data)
    setLoadedTags(tagsResponse.data)
  }

  const handleAppHeaderChange = () => {
    setSearchTerm(appHeaderRef.current?.getSearchTerm())
    setSortOption(appHeaderRef.current?.getSortOption())
  }

  const handleDockButtonToggle = () => {
    setDockStatus(!dockStatus);
  }

  const handleSortButtonToggle = () => {
    setSortDirection(!sortDirection);
  }

  useEffect(() => {
    const localSearch = localStorage.getItem("searchTerm") || ""
    if (localSearch) {
      setSearchTerm(localSearch)
      appHeaderRef.current?.setSearchTerm(localSearch)
    }
  }, [])

  useEffect(() => {
    if (appHeaderRef.current) {
      localStorage.setItem("searchTerm", searchTerm)
    }
  }, [searchTerm])

  useEffect(() => {
    if (action === actions.ADD_TODO) {
      setPaneOpen(true)
      setPaneTask(null)
    }
    if ([actions.LIST_ACTIVE, actions.LIST_DUE_SOON, actions.LIST_COMPLETED].includes(action)) {
      if (!(listingAction && listingAction === action)) {
        setListingAction(action)
      }
    }
    newAction(null)
  }, [action, listingAction])

  useEffect(() => {
    fetch()
  }, [paneOpen, tasks])

  return (
    <div flex="~ col" h="full">
      <AppHeader ref={appHeaderRef}
        dockOpen={dockStatus}
        onDockButtonClick={handleDockButtonToggle}
        sortDirection={sortDirection}
        onSortButtonClick={handleSortButtonToggle}
        onChange={handleAppHeaderChange}></AppHeader>
      <div flex="~ row" h="full">
        <AppMenu collapsed={!dockStatus} select={listingAction} actionHandler={newAction}></AppMenu>
        <TaskList listing={listingAction}
          searchTerm={searchTerm}
          sorting={sortOption}
          sortDirection={sortDirection}
          openHandler={setPaneOpen}
          taskHandler={setPaneTask}
          tasks={tasks}
          tagsLoaded={loadedTags}
        ></TaskList>
        {paneOpen && <TaskPane currentTask={paneTask} paneHandler={setPaneTask} closeHandler={setPaneOpen}></TaskPane>}
      </div>
    </div>
  )
}

export default App
