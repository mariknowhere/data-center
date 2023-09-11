import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import {RouterProvider} from 'react-router-dom';
import * as Sentry from '@sentry/react';

import {store} from './store/store';
import router from './router/router';
import './index.css';

Sentry.init({
  dsn: 'https://4f4814079ab2235b384803b23223af94@o4504688569483264.ingest.sentry.io/4505732352638976',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', 'https:yourserver.io/api/'],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
