import { Fragment } from "react";
import { useDDstore } from "../store";
import { basicDD } from "../utilities/commands";

const ConvertButton = () => {
    const input = useDDstore((s) => s.input)
    const output = useDDstore((s) => s.output)
    const setInput = useDDstore((s) => s.setInput)
    const setOutput = useDDstore((s) => s.setOutput)

    const handleConvert = async () => {
        await basicDD(input, output)
          .then(() => {
            setInput('')
            setOutput('')
          })
          .catch(error => {
            console.error(error)
          })
      }

    return(
        <Fragment>
            <button id="convert-button" onClick={handleConvert} >
                Convert
            </button>
        </Fragment>
    )
}

export default ConvertButton