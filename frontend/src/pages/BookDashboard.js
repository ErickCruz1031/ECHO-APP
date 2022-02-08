// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import LoginButton from '../components/LoginButton'
import Profile from '../components/Profile'
import { useAuth0 } from "@auth0/auth0-react";
//import { useEffect, useRef, useState } from 'react';
//import AppBookSeachList from '../components/_dashboard/app/AppBookSeachList.js';

import {
  AppTasks,
  AppBookSearchList,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  CurrentBooks,
  AppReadingTimeline,
  AppBookReviews
} from '../components/_dashboard/app';
import { useEffect, useState} from 'react';
import SearchView from '../pages/SearchView';

// ----------------------------------------------------------------------

export default function BookDashboard({selected}) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [username, setUsername] = useState("");//Variable for username
  const [email, setEmail] = useState(""); //Variable for the email of the user
  const [NYT_Key, setNYT] = useState("mEfQxnocskwDVVKNrJDNDIWmUHn13VBZ");//API key for NYT API (Temporary, will move to AWS secret manager)
  const [nytList, setNYTList] = useState({});//This will be the list that we fetch when we mount this component from NYT API


  useEffect(() =>{
    if(user != null){
      setUsername(user.nickname);
      setEmail(user.name);
    }

  },[user])

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">BOOK TITLE</Typography>
        </Box>
        <Grid container spacing={3}>


          <Grid item xs={12} md={6} lg={8}>
            <AppBookSearchList bookName={selected}/>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppReadingTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppBookReviews bookName={selected}/>
          </Grid>


          <Grid item xs={12} md={6} lg={8}>
            <Profile />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LoginButton />
            <Typography variant="h4">This is the value {isAuthenticated}</Typography>
          </Grid>



        </Grid>
      </Container>
    </Page>
  );
}

