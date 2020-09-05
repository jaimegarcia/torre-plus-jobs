import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button,Card,CardActions,CardContent,Chip,Typography,makeStyles } from '@material-ui/core';
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
  }
});

function Opportunity({ opportunity }) {

  const classes = useStyles();
  let date = opportunity && +new Date(opportunity.deadline);
  console.log("oportunity",opportunity)
  
  let compensation=opportunity && opportunity.compensation && opportunity.compensation.data && `${opportunity.compensation.data.currency} ${opportunity.compensation.data.minAmount} ${opportunity.compensation.data.maxAmount?" - "+opportunity.compensation.data.maxAmount:""} /${opportunity.compensation.data.periodicity}`

  //console.log("individualopportunity",opportunity,date)
  //      to={opportunity ? `/positions/${opportunity.id}` : "#"}
  return (


    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {opportunity ? opportunity.objective : <CustomSkeleton width={300} />}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" component="div" >
          {opportunity? opportunity.organizations? opportunity.organizations:"": (<CustomSkeleton width={90} />)}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom component="div">
          {opportunity? date ?  ("Ends "+moment(date).startOf("hour").fromNow()) :"": (<CustomSkeleton width={90} />)}
        </Typography>
        <Typography variant="body2" component="div">
          {opportunity? opportunity.skills.length? opportunity.skills.map(x=>(<Chip key={x} className={classes.chipSkill} label={`${x}`} variant="outlined" />)): "": (<CustomSkeleton width={90} />)}
        </Typography>
        <Typography variant="body2" component="div">
          {opportunity? compensation? compensation:"": (<CustomSkeleton width={90} />)}
        </Typography>
        <Typography variant="body2" component="div">
          {opportunity ? opportunity.type : <CustomSkeleton width={300} />}
        </Typography>
        <Typography variant="body2" component="div">
          {opportunity ? opportunity.locations: <CustomSkeleton width={60} />}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="secondary">Apply</Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Opportunity);
