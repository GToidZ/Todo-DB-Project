const TaskEntry = ({ task }) => {

    return (
        <div className="group"
            flex="~ row" justify="between" items="center"
            p="4"
            border="solid 1 neutral-200"
            bg="hover:neutral-100" rounded="xl"
            cursor="pointer" transition="all">
            <div flex="~ row" items="center" gap-x="2">
                <input type="checkbox" border="solid 1" w="4" h="4" rounded="sm" accent="red-500"></input>
                <input type="checkbox" border="solid 1" w="4" h="4" rounded="sm" accent="amber-400"></input>
                <span>Todo Title</span>
            </div>
            <div flex="~ row">
                <div i-carbon="edit" w="0 group-hover:6" h="0 group-hover:6" text="neutral-700"></div>
            </div>
        </div>
    )
}

export default TaskEntry