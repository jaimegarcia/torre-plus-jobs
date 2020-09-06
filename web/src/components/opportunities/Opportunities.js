import React, { useEffect } from "react";
import { connect } from "react-redux";
import TablePagination from '@material-ui/core/TablePagination';
import { Box,Button } from '@material-ui/core';

import Opportunity from "./Opportunity";
import {
  getCurrentOpportunities,
  setGlobalPage,
  fetchOpportunities,
} from "../../services/opportunities/opportunitiesActions";





function Opportunities({ dispatch,loading, opportunities,total,searching,globalPage,expression}) {
  console.log("opportunities",opportunities)
  const [page, setPage] = React.useState(0);

  const updateOpportunities = async(page,forceUpdate)=>{

    const newGlobalPage=parseInt((page)/5)+1;
    console.log("expression",expression,globalPage,newGlobalPage,forceUpdate)

    if(newGlobalPage>globalPage || forceUpdate) {
      dispatch(setGlobalPage(newGlobalPage));
      await dispatch(fetchOpportunities(expression, newGlobalPage));
    }
    
    dispatch( getCurrentOpportunities(10*((page)%5),10*((page)%5)+10,newGlobalPage));
  }
  const handlePageChange = (event, value) => {
    const newPage=value;
    setPage(newPage);
    updateOpportunities(newPage,false);
  };

  useEffect(() => {
    console.log("searching",searching)
    if(searching) {
      updateOpportunities(0,true);
      setPage(0);
    }

  }, [expression]);

  useEffect(() => {
    console.log("page",page)


  }, [page]);

  return (
    <Box>
      {page}{total}
      <TablePagination
        data-testid="table-pagination-up"
        component="div"
        count={total}
        page={page}
        onChangePage={handlePageChange}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
      {loading
        ? new Array(20)
            .fill(null)
            .map((opportunity, idx) => <Opportunity opportunity={opportunity} key={idx} />)
        : opportunities.map((opportunity) => <Opportunity opportunity={opportunity} key={opportunity.id} />)}
      <TablePagination
        component="div"
        count={total}
        page={page}
        onChangePage={handlePageChange}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
}

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  loading: state.opportunities.loading,
  opportunities: state.opportunities.current,
  total:state.opportunities.total,
  searching: state.query.searching,
  expression: state.query.expression,
  globalPage: state.opportunities.globalPage
});

export default connect(mapStateToProps)(Opportunities);
