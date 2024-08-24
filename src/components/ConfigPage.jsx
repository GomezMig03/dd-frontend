import { Fragment } from "react"
import { Link } from "wouter"
import { useDDstore } from "../store"

const ConfigPage = () => {
    const sudo = useDDstore((s) => s.sudo)
    const setSudo = useDDstore((s) => s.setSudo)

    const handleSudoCheckbox = () => {
        setSudo(!sudo)
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
                    <input type="checkbox" onChange={handleSudoCheckbox} />
                </article>
            </section>
        </Fragment>
    )    
}

export default ConfigPage