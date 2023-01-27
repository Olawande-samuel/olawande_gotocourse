import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import mixpanel from "mixpanel-browser";
import { MixpanelProvider, MixpanelConsumer } from 'react-mixpanel'
// import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { IntercomProvider } from 'react-use-intercom';
const queryClient = new QueryClient()
mixpanel.init('de7e6e0ca11a1f334afc964a5377c489', {debug: true, ignore_dnt:true,})
const INTERCOM_APP_ID = "f0ts9dta"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  // <React.StrictMode>
    <MixpanelProvider mixpanel={mixpanel}>
      <IntercomProvider appId={INTERCOM_APP_ID}>
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        </BrowserRouter>
      </IntercomProvider>
    </MixpanelProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
