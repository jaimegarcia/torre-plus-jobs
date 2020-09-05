import React from "react";
import { connect } from "react-redux";
import {Typography} from '@material-ui/core';

import Search from "../../components/search/Search";
import AppLayout from "../../layouts/AppLayout";

function HomePage({ hasErrors,dispatch }) {

  return (
    <AppLayout>
      <Typography variant="h2">Search for Opportunities</Typography>
      <Search/>


    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(HomePage);
