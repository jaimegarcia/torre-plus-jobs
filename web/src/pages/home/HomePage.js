import React from "react";
import { connect } from "react-redux";
import {Typography} from '@material-ui/core';

import Opportunities from "../../components/opportunities/Opportunities";

import Search from "../../components/search/Search";
import AppLayout from "../../layouts/AppLayout";

function HomePage({ hasErrors,dispatch }) {
  console.log("hasErrors",hasErrors)
  return (
    <AppLayout>
      <Typography variant="h2">Search for Opportunities</Typography>
      <Search/>

      {hasErrors ? <Typography variant="h2" >NO RESULTS</Typography> : <Opportunities />}

    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
  hasErrors: state.opportunities.hasErrors,

});

export default connect(mapStateToProps)(HomePage);
