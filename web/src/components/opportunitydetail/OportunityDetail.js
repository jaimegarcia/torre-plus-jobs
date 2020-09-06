import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import PositionDetails from "./PositionDetails";
import OrganizationsDetail from "./OrganizationsDetail";

import CustomSkeleton from "../utils/CustomSkeleton";
import { fetchOpportunity, clearOpportunity } from "../../services/opportunitydetail/opportunityDetailActions";
import { Box,Chip,Typography,makeStyles } from "@material-ui/core";




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
});

function OpportunityDetail({ dispatch, opportunity }) {
  const { id } = useParams();
  const classes = useStyles();
  useEffect(() => {
    dispatch(clearOpportunity());
    dispatch(fetchOpportunity(id));
  }, [id, dispatch]);
  console.log("oportunity",opportunity)
  let date = opportunity && +new Date(opportunity.deadline);

  return (
    <Box>

      {opportunity? <OrganizationsDetail details={opportunity.organizations}/> : (<CustomSkeleton width={90} />)}
      <br/>
      <Typography variant="h5" component="h2">
        {opportunity ? opportunity.objective : <CustomSkeleton width={300} />}
      </Typography>
      <Typography variant="body2" component="div">
        {opportunity? opportunity.skills.length? opportunity.skills.map(x=>(<Chip key={x} className={classes.chipSkill} label={`${x}`} variant="outlined" />)): "": (<CustomSkeleton width={90} />)}
      </Typography>
      <br/>
      <Typography variant="body2" component="div">
        {opportunity? `Compensation: ${opportunity.compensation}`: (<CustomSkeleton width={90} />)}
      </Typography>
      <Typography className={classes.title} color="textSecondary" gutterBottom component="div">
        {opportunity? date ?  ("Ends "+moment(date).startOf("hour").fromNow()) :"": (<CustomSkeleton width={90} />)}
      </Typography>
 
      <Typography variant="h3" component="div">
        {opportunity? "Opportunity Description" : (<CustomSkeleton width={90} />)}      
      </Typography>
      
      {opportunity? <PositionDetails details={opportunity.details}/> : (<CustomSkeleton width={90} />)}

      <br/><br/><br/><br/>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  opportunity: state.opportunityDetail.opportunity,
  hasErrors: state.opportunityDetail.hasErrors
});

export default connect(mapStateToProps)(OpportunityDetail);