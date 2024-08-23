import { useDDstore } from "../store";
import { getPath, getFileOutput } from "../utilities/commands"

const FIleSections = () => {
    const input = useDDstore((s) => s.input)
    const output = useDDstore((s) => s.output)
    const setInput = useDDstore((s) => s.setInput)
    const setOutput = useDDstore((s) => s.setOutput)

    const handleInput = (event) => {
        setInput(event.target.value)
      }
    
      const handleOutput = (event) => {
        setOutput(event.target.value)
      }
    
      const handleFileInput = async () => {
        await getPath()
          .then(res => setInput(res))
          .catch(error => {
            console.error(error)
          })
      }
    
      const handleFileOutput = async () => {
        await getFileOutput()
          .then(res => setOutput(res))
          .catch(error => {
            console.error(error)
          })
      }

      return(
        <article id="file-sections">
            <section id="input-section">
                <p>
                    Input file
                </p>
                <div className='text-inputs'>
                    <input type='text' value={input} onChange={handleInput} />
                    <img className='path-select' src='icons/folder-svgrepo.svg' onClick={handleFileInput} alt="folder icon for input" />
                </div>
            </section>
            <section id="output-section">
                <p>
                    Output file
                </p>
                <div className='text-inputs'>
                    <input type='text' value={output} onChange={handleOutput} />
                    <img className='path-select' src='icons/folder-svgrepo.svg' onClick={handleFileOutput} alt="folder icon for output" />
                </div>
            </section>
      </article>
      )
}

export default FIleSections