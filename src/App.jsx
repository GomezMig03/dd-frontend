import { Fragment } from 'react'
import './App.css';
import Footer from './components/Footer';
import FIleSections from './components/FileSections';
import ConvertButton from './components/ConvertButton';
import ConfigButton from './components/ConfigButton';
import ConfigPage from './components/ConfigPage'
import { Route, Switch } from "wouter";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/">
          <main className="App">
            <ConfigButton />
            <FIleSections />
            <ConvertButton />
          </main>
          <Footer />
        </Route>
        <Route path="/config">
          <ConfigPage />
          <Footer />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
