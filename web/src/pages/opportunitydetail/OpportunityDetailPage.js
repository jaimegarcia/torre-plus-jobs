import React from "react";
import { connect } from "react-redux";
import {Typography} from '@material-ui/core';

import AppLayout from "../../layouts/AppLayout";
import OpportunityDetail from "../../components/opportunitydetail/OportunityDetail";
import Mentors from "../../components/mentors/Mentors";

function OpportunityDetailPage({ hasErrors }) {
  return (
    <AppLayout>
      {hasErrors ? 
        <Typography variant="h2" >NO RESULTS</Typography> 
        : 
        <React.Fragment><OpportunityDetail /><Mentors/></React.Fragment>
      }
    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
  hasErrors: state.opportunityDetail.hasErrors,
});

export default connect(mapStateToProps)(OpportunityDetailPage);
