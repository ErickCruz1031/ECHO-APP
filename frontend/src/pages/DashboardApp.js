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
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from '../components/_dashboard/app';
import { useEffect, useState} from 'react';

// ----------------------------------------------------------------------

export default function DashboardApp() {
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

    //After this, we get the latest list from NYT on bestsellers and popul;ate teh ApppBookSearchList component
    /*

    const callNYT = async () =>{
      const query = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${NYT_Key}`
      console.log("The NYT query in this component is ", query);
      const res = await fetch(query);
      const data = await res.json();
      console.log("This is the data from the NYT API:\n ", data);
      setNYTList(data.results.lists);
      console.log("Loaded the information from NYT. Moving forward")
    };

    callNYT();//Call the function to call NYTAPI
    */


  },[user])

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back {username}</Typography>
        </Box>
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LoginButton />
            <Typography variant="h4">This is the value {isAuthenticated}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Profile />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppBookSearchList />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

/*

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

        */