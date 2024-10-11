import { useEffect, useRef, useState } from "react"
//import { getDiskROM } from "../utilities/commands"
import { useDDstore } from "../store"

const DiskList = (props) => {
    const ref = useRef(null)

    const [openList, setOpenList] = useState(false)
    const [diskList, setDiskList] = useState([])
    const setInput = useDDstore((s) => s.setInput)
    const setOutput = useDDstore((s) => s.setOutput)
    const disk = useDDstore((s) => s.disk)

    const outsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpenList(false)
        }
    }

    document.addEventListener('mousedown', outsideClick)

    useEffect(() => {
        /*
        getDiskROM(disk)
            .then(res => setDiskList(res))
            .catch(error => {
                console.error(error)
                setDiskList([`Error: ${error}`])
            })
                */
    }, [disk])

    const handleListClick = (val) => {
        props.type === 'input' ? setInput(val.substring(0, val.indexOf(' '))) : setOutput(val.substring(0, val.indexOf(' ')))
        setOpenList(!openList)
    }

    return(
        <div className="disk-list" ref={ref} >
            <img src="icons/down-arrow-svgrepo.svg" onClick={() => setOpenList(!openList)} />
            {openList && (
                <ul className="disk-rom-list">
                    {
                        diskList.map((val, index) => (
                            <li key={index} onClick={() => handleListClick(val)}>{val}</li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}

export default DiskList