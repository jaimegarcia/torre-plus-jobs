import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button,Card,CardActions,CardContent,CardMedia,Typography,makeStyles } from '@material-ui/core';
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
  }
});

function Mentor({ dispatch,mentor }) {

  const handleSelectMentor = () => {
    console.log("selectedmentor",mentor)
    dispatch(selectMentor(mentor.username));
  };
  const classes = useStyles();
  console.log("mentor",mentor)
  
  let compensation=mentor && mentor.compensation  && `${mentor.compensation.currency} ${mentor.compensation.symbol} ${mentor.compensation.amount}`;

  //console.log("individualmentor",mentor,date)
  //      to={mentor ? `/positions/${mentor.id}` : "#"}
  return (
  

    <Card className={classes.root} variant="outlined">

      <CardContent>
        {mentor ?<img src={mentor.picture?mentor.picture:"https://www.ohioattorneygeneral.gov/getattachment/a251ac9a-eb9f-4741-a9eb-e2f87a2446b8/Duckworth.aspx"}></img>
        :<CustomSkeleton width={300} height={300}/>}
        <Typography variant="h5" component="h2">
          {mentor ? mentor.name : <CustomSkeleton width={300} />}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" component="div" >
          {mentor? mentor.professionalHeadline: (<CustomSkeleton width={90} />)}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" component="div" >
          {mentor? compensation: (<CustomSkeleton width={90} />)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="secondary" onClick={(mentor) => handleSelectMentor()} >Select Mentor</Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Mentor);
