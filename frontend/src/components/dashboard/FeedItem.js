import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Media Title</Title>
      <Typography component="p" variant="h4">
        Type of Media
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Headline
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Go to Post
        </Link>
      </div>
    </React.Fragment>
  );
}

