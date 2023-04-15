import { useState, useEffect } from 'react'
import actions from '../constants/Actions'

const CollapsibleButton = ({ icon, label, collapsed, action = {}, actionHandler = {}, attr }) => {
    return (
        <button flex={`${collapsed ? "" : "~"} row`} items="center" rounded="lg" border="none" p="1" px="2"
            onClick={() => {
                if (!action || !actionHandler) return
                actionHandler(action)
            }}
            {...attr}>
            <div content="center" text="xl" className={`i-carbon-${icon}`}></div>
            {
                collapsed || <span content="center" ml="2">{collapsed || label}</span>
            }
        </button>
    )
}

const AppMenu = (
    { collapsed, actionHandler }
) => {

    const [action, setAction] = useState()

    useEffect(() => {
        if (!action) return
        actionHandler(action)
    }, [action])

    return (
        <div flex="~ col" ml="4" p="5" bg="neutral-200" rounded="xl">
            {/*<span className="i-carbon-add i-carbon-list i-carbon-hourglass i-carbon-star
            i-carbon-checkbox-checked"
            bg="red-500 hover:neutral-300" drop-shadow="sm hover:~" cursor="pointer"
            text="white" hidden="~"></span>*/}

            <span text="2xl" mb="4">{collapsed || "Menu"}</span>
            <CollapsibleButton attr={{
                bg: "red-500",
                text: "white",
                mb: "4",
                cursor: "pointer",
                "drop-shadow": "sm hover:~"
            }} action={actions.ADD_TODO} actionHandler={setAction} icon="add" label="Add a new todo" collapsed={collapsed}></CollapsibleButton>
            <CollapsibleButton attr={{
                bg: "hover:neutral-300",
                cursor: "pointer"
            }} action={actions.LIST_ACTIVE} actionHandler={setAction} icon="list" label="Active list" collapsed={collapsed}>
            </CollapsibleButton>
            <CollapsibleButton attr={{
                bg: "hover:neutral-300",
                cursor: "pointer"
            }} action={actions.LIST_DUE_SOON} actionHandler={setAction} icon="hourglass" label="Due soon" collapsed={collapsed}>
            </CollapsibleButton>
            <CollapsibleButton attr={{
                bg: "hover:neutral-300",
                cursor: "pointer"
            }} action={actions.LIST_COMPLETED} actionHandler={setAction} icon="checkbox-checked" label="Completed" collapsed={collapsed}>
            </CollapsibleButton>
        </div>
    )
}

export default AppMenu