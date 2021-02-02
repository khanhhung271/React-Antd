import './App.css';

import * as React from 'react';
import LoadableComponent from './components/Loadable';


class App extends React.Component {
  GridComponent = LoadableComponent(() => import('../src/scenes/Grid'));

  public render() {
    return <this.GridComponent />
  }
}

export default App;
