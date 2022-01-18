import { Navigate, useRoutes, useEffect} from 'react-router-dom';
import { useState  } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import SearchView from './pages/SearchView';
import UserList from './pages/UserList';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {

  const [searchBook, setBook] = useState("None");

  useState(() =>{
    console.log("This is the value in ROUTER: ", searchBook);
  },[searchBook]);

  const updateBook = (title) =>{
    console.log("We are updating the searchBook to ", title);
    setBook(title);
  };

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout updateFunc={updateBook}/>,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'search', element: <SearchView inputString={searchBook} /> },
        { path: 'userlist', element: <UserList /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
