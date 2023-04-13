import { useState, useRef, useEffect } from 'react'
import './App.css'
import AppHeader from './components/AppHeader'

function App() {

  const appHeaderRef = useRef(null)

  const [dockStatus, setDockStatus] = useState(false);
  const [sortDirection, setSortDirection] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Priority");

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
    // TODO: Being able to save sort option to localStorage
  }, [])

  useEffect(() => {
    if (appHeaderRef.current) {
      localStorage.setItem("searchTerm", searchTerm)
      localStorage.setItem("sortOption", sortOption)
    }
  }, [searchTerm, sortOption])

  return (
    <div>
      <AppHeader ref={appHeaderRef}
        dockOpen={dockStatus}
        onDockButtonClick={handleDockButtonToggle}
        sortDirection={sortDirection}
        onSortButtonClick={handleSortButtonToggle}
        onChange={handleAppHeaderChange}></AppHeader>
      <p>{searchTerm} | {sortOption}</p>
    </div>
  )
}

export default App
