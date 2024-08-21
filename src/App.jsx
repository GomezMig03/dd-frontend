import { Fragment, useState } from 'react'
import './App.css';
import Footer from './components/Footer';
import FIleSections from './components/FileSections';
import ConvertButton from './components/ConvertButton';

function App() {
  return (
    <Fragment>
    <main className="App">
      <FIleSections />
      <ConvertButton />
    </main>
    <Footer />
    </Fragment>
  );
}

export default App;