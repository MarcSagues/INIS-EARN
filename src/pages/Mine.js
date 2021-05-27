import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import Mine2 from 'src/components/mine/mine';


const Mine = () => (
  <>
    <Helmet>
      <title>Account | Material Kit</title>
    </Helmet>
    <Box
    margin="auto"
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg" >

  
          <Grid
          
            item
            lg={12}
            md={6}
            xs={12}
          >
            <Mine2/>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Mine;
