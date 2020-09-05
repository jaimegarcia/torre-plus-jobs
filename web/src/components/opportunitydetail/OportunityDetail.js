import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import CustomSkeleton from "../utils/CustomSkeleton";
import { fetchOpportunity, clearOpportunity } from "../../services/opportunitydetail/opportunityDetailActions";


function OpportunityDetail({ dispatch, opportunity }) {
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearOpportunity());
    dispatch(fetchOpportunity(id));
  }, [id, dispatch]);
  console.log("oportunity")
  let date = opportunity && +new Date(opportunity.deadline);
  return (
    <article className="flex flex-col items-center px-4">
      
    </article>
  );
}

const mapStateToProps = (state) => ({
  opportunity: state.opportunityDetail.opportunity,
  hasErrors: state.opportunityDetail.hasErrors
});

export default connect(mapStateToProps)(OpportunityDetail);