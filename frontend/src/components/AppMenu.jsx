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
    { collapsed, actionHandler, select }
) => {
    const [action, setAction] = useState()

    useEffect(() => {
        if (!action) return
        actionHandler(action)
        if (action === actions.ADD_TODO) setAction(null)
    }, [action])

    return (
        <div flex="~ col" ml="4" p="5" bg="neutral-100" rounded="xl" gap-y="2"
            className={`${collapsed && "pt-13"}`}>

            {
                // For preprocessing UnoCSS
                /*<span className="i-carbon-add i-carbon-list i-carbon-hourglass i-carbon-star
                i-carbon-checkbox-checked"
                bg="red-500 active:red-600 neutral-200 hover:neutral-200 active:neutral-300"
                drop-shadow="sm hover:~" cursor="pointer"
                text="white" font="bold" hidden="~"></span>*/
            }

            <span text="2xl #353535" mb="5">{collapsed || "Menu"}</span>
            <CollapsibleButton attr={{
                bg: "red-500 active:red-600",
                text: "white",
                mb: "3",
                cursor: "pointer",
                "drop-shadow": "sm hover:~"
            }} action={actions.ADD_TODO} actionHandler={setAction} icon="add" label="Add a new todo" collapsed={collapsed}></CollapsibleButton>
            <CollapsibleButton attr={{
                bg: `hover:neutral-200 active:neutral-300 ${select === actions.LIST_ACTIVE && "neutral-200"}`,
                font: `${select === actions.LIST_ACTIVE && "bold"}`,
                text: "#353535",
                cursor: "pointer"
            }} action={actions.LIST_ACTIVE} actionHandler={setAction} icon="list" label="Active list" collapsed={collapsed}>
            </CollapsibleButton>
            <CollapsibleButton attr={{
                bg: `hover:neutral-200 active:neutral-300 ${select === actions.LIST_DUE_SOON && "neutral-200"}`,
                font: `${select === actions.LIST_DUE_SOON && "bold"}`,
                text: "#353535",
                cursor: "pointer"
            }} action={actions.LIST_DUE_SOON} actionHandler={setAction} icon="hourglass" label="Due soon" collapsed={collapsed}>
            </CollapsibleButton>
            <CollapsibleButton attr={{
                bg: `hover:neutral-200 active:neutral-300 ${select === actions.LIST_COMPLETED && "neutral-200"}`,
                font: `${select === actions.LIST_COMPLETED && "bold"}`,
                text: "#353535",
                cursor: "pointer"
            }} action={actions.LIST_COMPLETED} actionHandler={setAction} icon="checkbox-checked" label="Completed" collapsed={collapsed}>
            </CollapsibleButton>
        </div>
    )
}

export default AppMenu