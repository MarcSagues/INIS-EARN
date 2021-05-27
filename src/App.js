import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import StateProvider from './context/StateProvider';
import reducer, { initialState } from './context/reducer';
import { Route, Router } from 'react-router';
import Dashboard from './pages/Dashboard';

const App = () => {
  const routing = useRoutes(routes);
  

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StateProvider initialState={initialState} reducer={reducer}>
      {routing}
      </StateProvider>
    </ThemeProvider>
  );
};

export default App;
