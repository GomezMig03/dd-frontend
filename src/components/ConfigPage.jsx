import { Fragment } from "react"
import { Link } from "wouter"
import { useDDstore } from "../store"

const ConfigPage = () => {
    const sudo = useDDstore((s) => s.sudo)
    const setSudo = useDDstore((s) => s.setSudo)
    const disk = useDDstore((s) => s.disk)
    const setDisk = useDDstore((s) => s.setDisk)

    const handleSudoCheckbox = () => {
        setSudo(!sudo)
    }

    const handleDisk = () => {
        if (disk === false) setSudo(true)
        setDisk(!disk)
    }

    return(
        <Fragment>
            <div id="back-button">
                <Link to="/">
                <img src="icons/left-arrow-svgrepo.svg" alt="go back button" id="left-arrow" />
                </Link >
            </div>
            <section id="config-page">
                <article>
                    <p>Execute with sudo permissions: </p>
                    <input type="checkbox" onChange={handleSudoCheckbox} checked={sudo} />
                </article>
                <article>
                <p>Show full disks instead of partitions: </p>
                <input type="checkbox" onChange={handleDisk} checked={disk} />
                </article>
            </section>
        </Fragment>
    )    
}

export default ConfigPage