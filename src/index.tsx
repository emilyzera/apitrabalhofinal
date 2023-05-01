import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes/AppRoutes'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { persistor, store } from './store/index'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssBaseline />
        <AppRoutes />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

