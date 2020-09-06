import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
import Carousel from "react-material-ui-carousel"
import Mentor from "./Mentor";
import {
  getCurrentMentors,
  fetchMentors,
} from "../../services/mentors/mentorsActions";




/** Component with Carousel of Mentors
 * @param  {function} dispatch Redux Dispatch
 * @param  {Object} mentors Mentors from Redux Store
 */
function Mentors({ dispatch, mentors}) {


  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchMentors());
      dispatch( getCurrentMentors(0,20,1));
    }
    fetchData();



  }, []);


  return (

    <React.Fragment>
      {mentors.length>0 &&  
        <Carousel
          autoPlay={false}
          navButtonsAlwaysVisible={true}
        >
          {mentors.map((mentor) =>  <Mentor mentor={mentor} key={mentor.id} />)}
        </Carousel>}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  mentors: state.mentors.current
});

export default connect(mapStateToProps)(Mentors);
