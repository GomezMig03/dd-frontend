import { Fragment, useState, useEffect } from "react";
import { useDDstore } from "../store";
import Warnings from "./Warnings.jsx";

const ConvertButton = () => {
    const inp = useDDstore((s) => s.input)
    const out = useDDstore((s) => s.output)
    const sudo = useDDstore((s) => s.sudo)
    const setInput = useDDstore((s) => s.setInput)
    const setOutput = useDDstore((s) => s.setOutput)

    const [warning, setWarning] = useState(false)
    const [error, setError] = useState(false)

    const openWarning = () => {
        if (inp !== "" && out !== "") {
            setWarning(true)
        }
    }

    useEffect(() => {
        setWarning(false)
        setError(false)
    }, [inp, out])

    return (
        <Fragment>
            <button id="convert-button" onClick={openWarning} >
                Convert
            </button>
            {error && (
                <span id="error-message">An error has ocurred during the execution of the dd command </span>
            )}
            {warning && (
                <Warnings files={{"input": inp, "output": out, "index": 1}} sudo={sudo} />
            )}
        </Fragment>
    )
}

export default ConvertButton
