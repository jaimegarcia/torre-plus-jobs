import React from "react";
import { connect } from "react-redux";
import {Grid,Typography} from '@material-ui/core';

import AppLayout from "../../layouts/AppLayout";
import OpportunityDetail from "../../components/opportunitydetail/OportunityDetail";
import Mentors from "../../components/mentors/Mentors";
import CardDialog from "../../components/card/CardDialog";
function OpportunityDetailPage({ hasErrors,selectedMentor }) {
  return (
    <AppLayout>
      {hasErrors ? 
        <Typography variant="h2" >NO RESULTS</Typography> 
        : 
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <OpportunityDetail />
            </Grid>
            <Grid item xs={12} sm={5}>
              <br/>
              <Typography variant="h4" >Select a Mentor to help you with the Application for this JOB</Typography> 
              <br/>
              <Mentors/>
            </Grid>
          </Grid>
          {selectedMentor && <CardDialog />}
          </React.Fragment>
      }
    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
  hasErrors: state.opportunityDetail.hasErrors,
  selectedMentor: state.mentors.selectedMentor
});

export default connect(mapStateToProps)(OpportunityDetailPage);
