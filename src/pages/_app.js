
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'animate.css';

import { persistor, Store } from '@/redux/store';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { SockeContext, socket } from '@/config/socketInit';


function MyApp({ Component, pageProps }) {

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <SockeContext.Provider value={socket}>
          <Component {...pageProps} />
        </SockeContext.Provider>


        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>

    </Provider>
  )
}

export default MyApp;