import { Fragment, useState } from 'react'
import './App.css';
import Footer from './components/Footer';
import FIleSections from './components/FileSections';
import ConvertButton from './components/ConvertButton';
import ConfigButton from './components/ConfigButton';

function App() {
  return (
    <Fragment>
    <main className="App">
      <ConfigButton />
      <FIleSections />
      <ConvertButton />
    </main>
    <Footer />
    </Fragment>
  );
}

export default App;