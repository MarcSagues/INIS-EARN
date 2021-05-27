import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { useStateValue } from 'src/context/StateProvider';

const Referrer = (props) => {
  const [{user}, dispatch] = useStateValue();

return(
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            REFERRAL LINK
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {user.referralLink}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};

export default Referrer;
