
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { persistor, Store } from '@/redux/store';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import Hearder from '@/layout/hearder/Hearder';
import Footer from '@/layout/footer/Footer';


function MyApp({ Component, pageProps }) {

  return (
    <Provider store={Store}>

      <PersistGate loading={null} persistor={persistor}>      
          <Hearder />
          <Component {...pageProps} />
          <Footer />       
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