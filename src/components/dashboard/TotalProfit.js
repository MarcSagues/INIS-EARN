import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { useStateValue } from 'src/context/StateProvider';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const TotalProfit = (props) => {
  const [{user}, dispatch] = useStateValue();

  return(
  <Card {...props}>
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
            INIS WALLET      

          </Typography>
          
          <Typography
            color="textPrimary"
            variant="h6"
          >
            {user.wallet} 
        <FileCopyOutlinedIcon/>


          </Typography>
          
        </Grid>
      </Grid>
      
    </CardContent>
  </Card>
)};

export default TotalProfit;
