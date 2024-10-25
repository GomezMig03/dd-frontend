//import { openGithub } from '../utilities/services';
import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-shell';

const Footer = () => {
  const [ddVersion, setDDVersion] = useState('No dd found in system')

  const resolveVersion = async () => {
    invoke('get_version').then((version) => setDDVersion(`dd version: ${version}`))
  }

  useEffect(() => {
    resolveVersion()
  }, [])

  const openGithub = async () => {
    await open('https://github.com/GomezMig03/dd-frontend')
  }

  return (
    <footer id="footer">
      <p>{ddVersion}</p>
      <p>DD Frontend Created by: <span id="github-link" onClick={openGithub}>Miguel Gómez</span></p>
    </footer>
  )
}

export default Footer
