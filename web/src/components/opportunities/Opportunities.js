import React, { useEffect } from "react";
import { connect } from "react-redux";
import TablePagination from '@material-ui/core/TablePagination';
import { Box } from '@material-ui/core';

import Opportunity from "./Opportunity";
import {
  getCurrentOpportunities,
  setGlobalPage,
  fetchOpportunities,
} from "../../services/opportunities/opportunitiesActions";

const PAGES_IN_GLOBALPAGE=5; //Pre-saved results for speed searching 5 pages of 10 results = 50
const RESULTS_PER_PAGE=10;


/** Opportunities Component with list of Opportunities from Search Criteria
 * @param  {function} dispatch Redux Dispatch
 * @param  {boolean} loading Redux Fetching Loading Status
 * @param  {Object} opportunities List of Current Page Opportunities
 * @param  {Number} total Total of opportunities in the search result
 * @param  {boolean} searching Status of Searching
 * @param  {Number} globalPage GlobalPage Number - 1 GlobalPage - 5 Pages of 10
 * @param  {Object} expression Query from search
 */
function Opportunities({ dispatch,loading, opportunities,total,searching,globalPage,expression}) {
  const [page, setPage] = React.useState(0);

  const updateOpportunities = async(page,forceUpdate)=>{

    const newGlobalPage=parseInt((page)/PAGES_IN_GLOBALPAGE)+1;

    if(newGlobalPage>globalPage || forceUpdate) {
      dispatch(setGlobalPage(newGlobalPage));
      await dispatch(fetchOpportunities(expression, newGlobalPage));
    }
    
    dispatch( getCurrentOpportunities(10*((page)%PAGES_IN_GLOBALPAGE),RESULTS_PER_PAGE*((page)%PAGES_IN_GLOBALPAGE)+RESULTS_PER_PAGE,newGlobalPage));
  }
  const handlePageChange = (event, value) => {
    const newPage=value;
    setPage(newPage);
    updateOpportunities(newPage,false);
  };

  useEffect(() => {
    if(searching) {
      updateOpportunities(0,true);
      setPage(0);
    }

  }, [expression]);

  useEffect(() => {


  }, [page]);

  return (
    <Box>
      {total>0 && <TablePagination
        data-testid="table-pagination-up"
        component="div"
        count={total}
        page={page}
        onChangePage={handlePageChange}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />}
      {loading
        ? new Array(10)
            .fill(null)
            .map((opportunity, idx) => <Opportunity opportunity={opportunity} key={idx} />)
        : opportunities.map((opportunity) => <Opportunity opportunity={opportunity} key={opportunity.id} />)}
      {total>0 &&<TablePagination
        component="div"
        count={total}
        page={page}
        onChangePage={handlePageChange}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />}
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
