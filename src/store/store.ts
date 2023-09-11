import { configureStore } from '@reduxjs/toolkit';

import projectsReducer from './projects/projectsSlice';
import authReducer from './auth/authSlice';
import objectsReducer from './objects/objectsSlice';
import vulnsReducer from './vulns/vulnsSlice';
import customersReducer from './customers/customersSlice';
import analyticsReducer from './analytics/analyticsSlice';
import infSystemsReducer from './infSystems/infSystemsSlice';
import officesReducer from './offices/officesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    objects: objectsReducer,
    vulns: vulnsReducer,
    customers: customersReducer,
    analytics: analyticsReducer,
    infSystems: infSystemsReducer,
    offices: officesReducer,
  },
});
