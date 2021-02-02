import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import initializeStores from './stores/storeInitializer';
import App from './App';

  const stores = initializeStores();

  ReactDOM.render(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Provider {...stores}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
