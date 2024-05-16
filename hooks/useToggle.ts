import { useState } from "react"

const useToggle = (initialState: boolean = false) => {
    const [show, setShow] = useState(initialState)

    const showComponent = () => {
        setShow(true)
    }

    const hideComponent = () => {
        setShow(false)
    }

    const handleToggle = () => {
        setShow((prev) => !prev)
    }

    return {
        show,
        showComponent,
        hideComponent,
        handleToggle
    }
}

export default useToggle