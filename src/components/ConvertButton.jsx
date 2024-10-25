import { Fragment, useState } from "react";
import { useDDstore } from "../store";
import { invoke } from "@tauri-apps/api/core";

const ConvertButton = () => {
    const inp = useDDstore((s) => s.input)
    const out = useDDstore((s) => s.output)
    const sudo = useDDstore((s) => s.sudo)
    const setInput = useDDstore((s) => s.setInput)
    const setOutput = useDDstore((s) => s.setOutput)

    const [error, setError] = useState(false)

    const handleConvert = async () => {
        setError(false)
        invoke('use_dd', { inp, out, sudo })
            .then((e) => {
                console.log(e)
                if (!e) {
                    setError(true)
                } else {
                    setInput("")
                    setOutput("")
                }
            })
            .catch(() => setError(true))
    }

    return (
        <Fragment>
            <button id="convert-button" onClick={handleConvert} >
                Convert
            </button>
            {error && (
                <span id="error-message">An error has ocurred during the execution of the dd command </span>
            )}
        </Fragment>
    )
}

export default ConvertButton
