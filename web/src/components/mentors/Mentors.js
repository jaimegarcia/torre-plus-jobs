import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';

import Mentor from "./Mentor";
import {
  getCurrentMentors,
  fetchMentors,
} from "../../services/mentors/mentorsActions";





function Mentors({ dispatch,loading, mentors,searching}) {
  console.log("mentors",mentors)


  useEffect(async() => {
    await dispatch(fetchMentors());
    dispatch( getCurrentMentors(0,20,1));


  }, []);


  return (

      <Grid container spacing={5}>
   <Grid container item xs={12} spacing={5}>
      {loading
        ? new Array(20)
            .fill(null)
            .map((mentor, idx) =>  <Mentor mentor={mentor} key={idx} />)
        : mentors.map((mentor) =>  <Mentor mentor={mentor} key={mentor.id} />)}
</Grid>
</Grid>
  );
}
//<Mentor mentor={mentor} key={idx}
//<Mentor mentor={mentor} key={idx}
// Map Redux state to React component props
const mapStateToProps = (state) => ({
  loading: state.mentors.loading,
  mentors: state.mentors.current,
  globalPage: state.mentors.globalPage
});

export default connect(mapStateToProps)(Mentors);
