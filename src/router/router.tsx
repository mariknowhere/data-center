import {createBrowserRouter, Navigate} from 'react-router-dom';

import LoginPage from '../pages/login/LoginPage';
import ProjectsPage from '../pages/projects/projectsPage/ProjectsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import ErrorPage from '../pages/error/ErrorPage';
import AnalyticsPage from '../pages/analytics/AnalyticsPage';
import CommonPage from '../pages/commonPage/CommonPage';
import ProjectPage from '../pages/projects/projectPage/ProjectPage';
import AuthRequire from '../hocs/AuthRequire';
import ObjectsPage from '../pages/objects/objectsPage/ObjectsPage';
import SourceCodePage from '../pages/objects/objectPage/sourceCode/SourceCodePage';
import WebAppPage from '../pages/objects/objectPage/webApp/WebAppPage';
import ServerPage from '../pages/objects/objectPage/server/ServerPage';
import MobileAppPage from '../pages/objects/objectPage/mobileApp/MobileAppPage';
import SocialEngineeringPage from '../pages/objects/objectPage/socialEngineering/SocialEngineeringPage';
import WifiPage from '../pages/objects/objectPage/wifi/WifiPage';
import DesktopAppPage from '../pages/objects/objectPage/desktopApp/DesktopAppPage';
import VulnsPage from '../pages/vulns/vulnsPage/VulnsPage';
import VulnPage from '../pages/vulns/vulnPage/VulnPage';
import CustomersPage from '../pages/customers/customersPage/CustomersPage';
import CustomerPage from '../pages/customers/customerPage/CustomerPage';
import InfSystemsPage from '../pages/infSystem/infSystemsPage/InfSystemsPage';
import InfSystemPage from '../pages/infSystem/infSystemPage/InfSystemPage';
import OfficePage from '../pages/offices/officePage/OfficePage';
import OfficesPage from '../pages/offices/officesPage/OfficesPage';
import ApiPage from '../pages/objects/objectPage/api/ApiPage';
import ArmPage from '../pages/objects/objectPage/arm/ArmPage';
import NetworkDevicePage from '../pages/objects/objectPage/networkDevice/NetworkDevicePage';
import ExternalPage from '../pages/objects/objectPage/external/ExternalPage';
import InternalPage from '../pages/objects/objectPage/internal/InternalPage';
import OtherPage from '../pages/objects/objectPage/other/OtherPage';

import {ROUTES, ROUTES_OBJECT} from './routes';

const router = createBrowserRouter([
  {
    path: ROUTES.COMMON,
    element: <CommonPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.PROJECTS,
        element: (
          <AuthRequire>
            <ProjectsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/',
        element: (
          <AuthRequire>
            <ProjectPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS,
        element: (
          <AuthRequire>
            <ObjectsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.WEB_APP + '/:objectId/',
        element: (
          <AuthRequire>
            <WebAppPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.API + '/:objectId/',
        element: (
          <AuthRequire>
            <ApiPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.MOBILE_APP + '/:objectId/',
        element: (
          <AuthRequire>
            <MobileAppPage/>
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.NETWORK_DEVICE + '/:objectId/',
        element: (
          <AuthRequire>
            <NetworkDevicePage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SERVER + '/:objectId/',
        element: (
          <AuthRequire>
            <ServerPage/>
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.ARM + '/:objectId/',
        element: (
          <AuthRequire>
            <ArmPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.WIFI + '/:objectId/',
        element: (
          <AuthRequire>
            <WifiPage/>
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SOCIAL_ENGINEERING + '/:objectId/',
        element: (
          <AuthRequire>
            <SocialEngineeringPage/>
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.DESKTOP_APP + '/:objectId/',
        element: (
          <AuthRequire>
            <DesktopAppPage/>
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SOURCE_CODE + '/:objectId/',
        element: (
          <AuthRequire>
            <SourceCodePage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.EXTERNAL + '/:objectId/',
        element: (
          <AuthRequire>
            <ExternalPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.INTERNAL + '/:objectId/',
        element: (
          <AuthRequire>
            <InternalPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.OTHER + '/:objectId/',
        element: (
          <AuthRequire>
            <OtherPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.WEB_APP + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.API + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.MOBILE_APP + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.NETWORK_DEVICE + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SERVER + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.ARM + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.WIFI + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SOCIAL_ENGINEERING + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.DESKTOP_APP + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SOURCE_CODE + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.EXTERNAL + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.INTERNAL + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.OTHER + '/:objectId/' + ROUTES.VULNS,
        element: (
          <AuthRequire>
            <VulnsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.WEB_APP + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.API + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.MOBILE_APP + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.NETWORK_DEVICE + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SERVER + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.ARM + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.WIFI + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SOCIAL_ENGINEERING + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.DESKTOP_APP + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.SOURCE_CODE + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.EXTERNAL + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.INTERNAL + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.PROJECTS + '/:projectId/' + ROUTES.OBJECTS + ROUTES_OBJECT.OTHER + '/:objectId/' + ROUTES.VULNS + '/:vulnId/',
        element: (
          <AuthRequire>
            <VulnPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.CUSTOMERS,
        element: (
          <AuthRequire>
            <CustomersPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.CUSTOMERS + '/:customerId',
        element: (
          <AuthRequire>
            <CustomerPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.CUSTOMERS + '/:customerId/' + ROUTES.INF_SYSTEMS,
        element: (
          <AuthRequire>
            <InfSystemsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.CUSTOMERS + '/:customerId/' + ROUTES.INF_SYSTEMS + '/:infSystemId',
        element: (
          <AuthRequire>
            <InfSystemPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.CUSTOMERS + '/:customerId/' + ROUTES.OFFICES,
        element: (
          <AuthRequire>
            <OfficesPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.CUSTOMERS + '/:customerId/' + ROUTES.OFFICES + '/:officeId',
        element: (
          <AuthRequire>
            <OfficePage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.ANALYTICS,
        element: (
          <AuthRequire>
            <AnalyticsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.SETTINGS,
        element: (
          <AuthRequire>
            <SettingsPage />
          </AuthRequire>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.COMMON} replace />,
      },
    ],
  },
]);

export default router;
