import { useState, useRef, useEffect } from 'react'
import './App.css'
import actions from './constants/Actions'
import AppHeader from './components/AppHeader'
import AppMenu from './components/AppMenu'
import TaskList from './components/TaskList'

const App = () => {

  const appHeaderRef = useRef(null)

  const [dockStatus, setDockStatus] = useState(false)
  const [sortDirection, setSortDirection] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("Priority")

  const [action, newAction] = useState(null)
  const [listingAction, setListingAction] = useState(actions.LIST_ACTIVE)

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
      /* TODO: Open editor pane in add mode. */
    }
    if ([actions.LIST_ACTIVE, actions.LIST_DUE_SOON, actions.LIST_COMPLETED].includes(action)) {
      if (!(listingAction && listingAction === action)) {
        setListingAction(action)
      }
    }
    newAction(null)
  }, [action, listingAction])

  return (
    <div flex="~ col">
      <AppHeader ref={appHeaderRef}
        dockOpen={dockStatus}
        onDockButtonClick={handleDockButtonToggle}
        sortDirection={sortDirection}
        onSortButtonClick={handleSortButtonToggle}
        onChange={handleAppHeaderChange}></AppHeader>
      <div flex="~ row">
        <AppMenu collapsed={!dockStatus} select={listingAction} actionHandler={newAction}></AppMenu>
        <TaskList listing={listingAction}></TaskList>
      </div>
    </div>
  )
}

export default App
