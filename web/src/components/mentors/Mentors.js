import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
import Carousel from "react-material-ui-carousel"
import Slider from "react-slick"
import Mentor from "./Mentor";
import {
  getCurrentMentors,
  fetchMentors,
} from "../../services/mentors/mentorsActions";





function Mentors({ dispatch,loading, mentors,searching}) {
  console.log("mentors",mentors)


  useEffect(() => {
    async function fetchData() {
      // You can await here
      await dispatch(fetchMentors());
      dispatch( getCurrentMentors(0,20,1));
      // ...
    }
    fetchData();



  }, []);


  return (

    <React.Fragment>
    {mentors.length>0 &&  
      <Carousel
        autoPlay={false}
      >
        {mentors.map((mentor) =>  <Mentor mentor={mentor} key={mentor.id} />)}
    </Carousel>}
</React.Fragment>
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
