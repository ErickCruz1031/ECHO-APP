import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';
import { useEffect,useState } from 'react';

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: mockImgCover(setIndex),
    postedAt: faker.date.soon()
  };
});

// ----------------------------------------------------------------------


function BookItem({ book }) {
  const { book_image, title, description, updated_date , author} = book; //Extract this information from object
  //const { image, title, description, postedAt } = book;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={book_image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {/* {formatDistance(updated_date, new Date())}*/}
        {author}
      </Typography>
    </Stack>
  );
}

//TODO: Pull the book list from the props. For now, we'll use the NEWS array as the inputs
//const AppBookSeachList = () => {
export default function AppBookSearchList() {
  //const [sliceFactor, setFactor] = useEffect(1);//We're going to slice the array passed by this factor on each page
  /*const [currentList, setList] = useState([{
    author: "Colleen Hoover",
    title: "IT ENDS WITH US",
    book_image: "https://storage.googleapis.com/du-prd/books/images/9781501110375.jpg",
    description: "A battered wife raised in a violent home attempts to halt the cycle of abuse.",
    updated_date: "2022-01-05 23:21:55"

   }]); //This will be the list of items displayed in the book search section*/
   const [currentList, setList] = useState([]);
   const [NYT_Key, setNYT] = useState("mEfQxnocskwDVVKNrJDNDIWmUHn13VBZ");//API key for NYT API (Temporary, will move to AWS secret manager)
   


  useEffect(() =>{
    //console.log("This is the props passed to the search component: \n", bookList[0]);
    //setList(bookList[0].books);

    //console.log("We set the list to ", bookList[0].books.length);
    const callNYT = async () =>{
      const query = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${NYT_Key}`
      console.log("The NYT query in this component is ", query);
      const res = await fetch(query);
      const data = await res.json();
      console.log("This is the data from the NYT API:\n ", data);
      setList(data.results.lists[0].books);
      console.log("Loaded the information from NYT. Moving forward")
    };

    if (currentList.length == 0)
    {
      callNYT();//Call the function to call NYTAPI
    }//Only call the API if the list is empty


  },[currentList]);

  return (
    <Card>
      <CardHeader title="Books Found" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {currentList.map((item) => (
            <BookItem key={item.title} book={item} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          Next Page
        </Button>
      </Box>
    </Card>
  );
}

//export default AppBookSeachList;

/*
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {NEWS.map((news) => (
            <BookItem key={news.title} news={news} />
          ))}
        </Stack>
      </Scrollbar>




      function BookItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(postedAt, new Date())}
      </Typography>
    </Stack>
  );
}

*/