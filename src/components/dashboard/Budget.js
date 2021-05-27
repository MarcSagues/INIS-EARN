import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { red } from '@material-ui/core/colors';
import { useStateValue } from 'src/context/StateProvider';

const Budget = (props) => {
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
            INIS AMOUNT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {user.amount}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: '#3578e3',
              height: 56,
              width: 56
            }}
          >
            <LocalAtmIcon />
          </Avatar>
        </Grid>
      </Grid>
    {/*   <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon sx={{ color: red[900] }} />
        <Typography
          sx={{
            color: red[900],
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box> */}
    </CardContent>
  </Card>
)
};

export default Budget;
