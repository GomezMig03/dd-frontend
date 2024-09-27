import { openGithub } from '../utilities/services';
import { getVersion } from '../utilities/commands';
import { useState, useEffect, lazy } from 'react';

const Footer = () => {
    const [ddVersion, setDDVersion] = useState('No dd found in system')

    const resolveVersion = async () => {
            getVersion()
          .then(res => {
            setDDVersion(res)
          })
          .catch(error => {
            console.error(error)
            resolveVersion()
          })
      } 

      useEffect(() => {
        resolveVersion()
      }, [])

    return(
        <footer id="footer">
    <p>{ddVersion}</p>
    <p>DD Frontend Created by: <span id="github-link" onClick={openGithub}>Miguel Gómez</span></p>
    </footer>
    )
}

export default Footer