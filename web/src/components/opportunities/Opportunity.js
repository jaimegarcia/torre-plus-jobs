import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button,Card,CardActions,CardContent,Chip,Typography,makeStyles } from '@material-ui/core';
import { green,amber } from '@material-ui/core/colors';
import CustomSkeleton from "../utils/CustomSkeleton";


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
  opportunityType:{
    color:green[500]
  },
  applyButton:{
    backgroundColor:amber[800],
    "&:hover": {
      backgroundColor:amber[900]
    }
  }
});

function Opportunity({ opportunity }) {

  const classes = useStyles();
  let date = opportunity && +new Date(opportunity.deadline);
  console.log("oportunity",opportunity)
  

  //console.log("individualopportunity",opportunity,date)
  //      to={opportunity ? `/positions/${opportunity.id}` : "#"}
  return (

    <Link target="_blank" to={opportunity?`/opportunity/${opportunity.id}`:'/'} style={{ textDecoration: 'none' }}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {opportunity ? opportunity.objective : <CustomSkeleton width={300} />}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" component="div" >
          {opportunity?  opportunity.organizations: (<CustomSkeleton width={150} />)}
          {opportunity? date ?  (" (Ends "+moment(date).startOf("hour").fromNow())+ ")" :"": ""}
        </Typography>
        <Typography variant="body2" component="div">
          {opportunity? opportunity.skills.length? opportunity.skills.map(x=>(<Chip key={x} className={classes.chipSkill} label={`${x}`} variant="outlined" />)): "": (<CustomSkeleton width={90} />)}
        </Typography>
        <Typography variant="body2" component="div" className={classes.opportunityType}>
          {opportunity ? opportunity.type.replace(/-/g," ") : <CustomSkeleton width={300} />}
        </Typography>
        <Typography variant="body2" component="div">
          {opportunity? `Compensation: ${opportunity.compensation}`: (<CustomSkeleton width={90} />)}
        </Typography>

        <Typography variant="body2" component="div">
          {opportunity ? `Location: ${opportunity.locations}`: <CustomSkeleton width={60} />}
        </Typography>
      </CardContent>
      <CardActions>
      {opportunity? <Button size="small" variant="contained" className={classes.applyButton} color="primary">View Opportunity</Button>: <CustomSkeleton width={60} />}
      </CardActions>
    </Card>
    </Link>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Opportunity);
