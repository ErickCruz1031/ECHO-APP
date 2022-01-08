// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import LoginButton from'./components/LoginButton';
import Profile from './components/Profile'
import DashboardApp from './pages/DashboardApp';
import DashboardLayout from './layouts/dashboard';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
    <ScrollToTop />
    <GlobalStyles />
    <BaseOptionChartStyle />
    <Router />
  </ThemeConfig>

  );
}

/*


export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <LoginButton />
      <Profile />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}



    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <DashboardLayout/>
    </ThemeConfig>
*/
