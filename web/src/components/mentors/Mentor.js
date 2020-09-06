import React from "react";
import { connect } from "react-redux";
import { amber } from '@material-ui/core/colors';

import { Button,Card,CardActions,CardContent,Typography,makeStyles } from '@material-ui/core';
import CustomSkeleton from "../utils/CustomSkeleton";
import {selectMentor} from "../../services/mentors/mentorsActions"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom:10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chipSkill:{
    marginRight:5,
    marginBottom:5
  },
  chooseButton:{
    backgroundColor:amber[800],
    "&:hover": {
      backgroundColor:amber[900]
    }
  }
});

/** Mentor Component Card with name, headline and compensation
 * @param  {function} dispatch Redux Dispatch
 * @param  {Object} mentor Mentor Detail
 */
function Mentor({ dispatch,mentor }) {

  const handleSelectMentor = () => {
    dispatch(selectMentor(mentor.username));
  };
  const classes = useStyles();
  
  let compensation=mentor && mentor.compensation  && `${mentor.compensation.currency} ${mentor.compensation.symbol} ${mentor.compensation.amount}`;

  //      to={mentor ? `/positions/${mentor.id}` : "#"}
  return (
  

    <Card className={classes.root} variant="outlined" >

      <CardContent>
        {mentor ?<img width="100%" src={mentor.picture?mentor.picture:"https://www.ohioattorneygeneral.gov/getattachment/a251ac9a-eb9f-4741-a9eb-e2f87a2446b8/Duckworth.aspx"}></img>
        :<CustomSkeleton width={300} height={300}/>}
        <Typography variant="h5" component="h2">
          {mentor ? mentor.name : <CustomSkeleton width={300} />}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" component="div" >
          {mentor? mentor.professionalHeadline: (<CustomSkeleton width={90} />)}
        </Typography>
        <Typography className={classes.pos} variant="h4" color="textSecondary" component="div" >
          {mentor? `Rate: ${compensation}`: (<CustomSkeleton width={90} />)}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" component="div" >
          {mentor? "Risk free: In case we failed to arrange the meeting, we will return 100% of your money": (<CustomSkeleton width={90} />)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" variant="contained" color="primary" className={classes.chooseButton} onClick={() => handleSelectMentor()}>CHOOSE ME</Button>
        <a href={`https://bio.torre.co/en/${mentor.username}`}  target="_blank" style={{ textDecoration: 'none' }}><Button size="large" >View Bio in Torre</Button></a>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Mentor);
