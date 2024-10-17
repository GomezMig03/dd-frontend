//import { openGithub } from '../utilities/services';
import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

const Footer = () => {
  const [ddVersion, setDDVersion] = useState('No dd found in system')

  const resolveVersion = async () => {
    invoke('get_version').then((version) => setDDVersion(`dd version: ${version}`))
  }

  useEffect(() => {
    resolveVersion()
  }, [])

  const openGithub = () => {
    console.log("Todo")
  }

  return (
    <footer id="footer">
      <p>{ddVersion}</p>
      <p>DD Frontend Created by: <span id="github-link" onClick={openGithub}>Miguel Gómez</span></p>
    </footer>
  )
}

export default Footer
