import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import { generatePath, useNavigate } from 'react-router';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton
} from '@mui/material';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [booksKey, setBooksKey] = useState("AIzaSyAd_ygAfqMtL2kbMXpsBd_9KPSxi_wwQn8");//Temporary only. Will store this in AWS Secrets manager
  const [inputString, setString] = useState("");
  const navigate = useNavigate();
  
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const getInput = e =>{
    console.log("Value is : ", e.target.value)
    setString(e.target.value);

  }

  const clickAway = e =>{
    setOpen(false);//Set open to false so the search bar closes
  }

  const handleClose = () => {
    //setOpen(false);
    console.log("Entered the search bugton");
    //TODO: Call Google Books API with the input as the parameter for the query
     const callBooksAPI = async () =>{
       console.log("Calling the books API");
       
      //const query = `https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction&key=${booksKey}`
      const query = `https://www.googleapis.com/books/v1/volumes?q=intitle:${inputString}&key=${booksKey}`
      console.log("The query in this component is ", query);
      const res = await fetch(query);
      const data = await res.json();
      console.log("This is the data from the books API:\n ", data);

      setOpen(false);
      navigate('/dashboard/search');//Testing this


     }
     
     callBooksAPI();


  };

  return (
    <ClickAwayListener onClickAway={clickAway}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              onChange={getInput}
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
