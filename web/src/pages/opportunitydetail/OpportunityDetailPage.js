import React from "react";
import { connect } from "react-redux";
import {Typography} from '@material-ui/core';

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
          <OpportunityDetail />
          <Mentors/>
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
