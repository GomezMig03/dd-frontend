import { Link } from "wouter"

const ConfigButton = () => {

return(
    <div id="config-button">
        <Link to="/config">
        <img src="icons/config-svgrepo.svg" alt="config icon" />
        </Link >
    </div>
)
}

export default ConfigButton