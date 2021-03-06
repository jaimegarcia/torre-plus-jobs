import { opportunitiesAPI } from "../../config/config";


const TOTAL_SIZE=10*5; //5 Pages of 10 Results


// Action Types
export const GET_OPPORTUNITIES = 'GET_OPPORTUNITIES';
export const GET_OPPORTUNITIES_SUCCESS = 'GET_OPPORTUNITIES_SUCCESS';
export const GET_OPPORTUNITIES_FAILURE = 'GET_OPPORTUNITIES_FAILURE';
export const GET_CURRENT_OPPORTUNITIES = 'GET_CURRENT_OPPORTUNITIES';
export const SET_GLOBAL_PAGE = 'SET_GLOBAL_PAGE';
export const CLEAR_OPPORTUNITIES = 'CLEAR_OPPORTUNITIES';




// Create redux action creators that return an action
export const getOpportunities = () => ({
  type: GET_OPPORTUNITIES,
});

export const getOpportunitiesSuccess = opportunities => ({
  type: GET_OPPORTUNITIES_SUCCESS,
  payload: opportunities,
});

export const getOpportunitiesFailure = () => ({
  type: GET_OPPORTUNITIES_FAILURE,
});

export const getCurrentOpportunities = (start = 0, end = 10, globalPage = 1) => ({
  type: GET_CURRENT_OPPORTUNITIES,
  payload: {
    start,
    end,
    globalPage
  },
});

export const clearOpportunities = () => ({
  type: CLEAR_OPPORTUNITIES,
});

export const setGlobalPage = page => ({
  type: SET_GLOBAL_PAGE,
  payload: page,
});


/** Get List of Opportunities from Backend based on expression and offset
 * @param  {Object} expression Search Expression
 * @param  {Number} page  Page for calculate the offset, each Page 10 results
 */
export function fetchOpportunities(expression={}, page = 1) {
  const URL = `${opportunitiesAPI}?size=${TOTAL_SIZE}&offset=${page===1?0:(page-1)*TOTAL_SIZE}`;
  return async dispatch => {
    dispatch(getOpportunities());

    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept':'*/*',
          'Accept-Encoding':'gzip,deflate,br'
        },
        body:JSON.stringify({query:expression})
      });

      let data = await res.json();
      let opportunities=data.opportunities;
      dispatch(getOpportunitiesSuccess({opportunities,total:data.total}));
    } catch (error) {
      console.error(error);
      dispatch(getOpportunitiesFailure());
    }
  }
}

