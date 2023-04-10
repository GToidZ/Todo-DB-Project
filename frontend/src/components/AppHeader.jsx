import { useRef, forwardRef, useImperativeHandle } from 'react';

const AppHeader = forwardRef(({
    // Universal onChange event (search and sort)
    onChange,

    // Dock related items
    dockOpen,
    onDockButtonClick,

    // Sort related items
    sortDirection,
    onSortButtonClick,

    // Notification related items
    onNotificationButtonClick
  }, ref) => {
  const searchRef = useRef(null)
  const sortRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getSearchTerm: () => { return searchRef.current.value }, 
    getSortOption: () => { return sortRef.current.value }
  }))

  return (
    <div ref={ref} flex="~ row" justify="between" items="center" m="4" mt="6">
      <div flex="~ row" text="3xl black" items="center" gap="4">
        <div i-carbon={dockOpen ? "chevron-left" : "menu"} cursor="pointer" onClick={onDockButtonClick} />
        <span select="none">Goodo</span>
      </div>

      <div flex="~ row" text="lg" items="center" gap="4">
        <div flex="~ row" items="center" grow="~"
          border="solid 1 gray-300" bg="gray-100"
          drop-shadow="sm hover:~" transition="all" rounded="3xl" p="2" px="4">
          <div i-carbon="search" />
          <input grow="~" pl="2" type="text"
              border="none"
              placeholder="Search todo"
              onChange={onChange}
              ref={searchRef}
          />
        </div>
        <span>Sort by</span>
        <div border="solid 1 gray-300" bg="gray-100"
          drop-shadow="sm hover:~" transition="all" rounded="3xl" p="2" px="4">
          <select id="sortBy" border="none"
            pr="[1.25rem]" mr="[-1.25rem]"
            onChange={onChange} ref={sortRef}>
            <option>Priority</option>
            <option>Alphabetical</option>
            <option>Due Date</option>
          </select>
          <div className="pointer-events-none" i-carbon="chevron-down" />
        </div>
        <div text="3xl" i-carbon={sortDirection ? "sort-descending" : "sort-ascending"}
          cursor="pointer" onClick={onSortButtonClick}
          title={sortDirection ? "Sort Descending" : "Sort Ascending"} />
        <div text="3xl" i-carbon="notification" cursor="pointer" />
      </div>
    </div>
  )
})

export default AppHeader
