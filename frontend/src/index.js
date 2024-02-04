import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/GlobalStyle';
import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n/i18n';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <GlobalStyle>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <App />
            </GlobalStyle>
        </I18nextProvider>
    </React.StrictMode>,
);
