import { opportunitiesAPI } from "../../config/config";

export const GET_OPPORTUNITY = "GET_OPPORTUNITY";
export const GET_OPPORTUNITY_SUCCESS = "GET_OPPORTUNITY_SUCCESS";
export const GET_OPPORTUNITY_FAILURE = "GET_OPPORTUNITY_FAILURE";
export const CLEAR_OPPORTUNITY = "CLEAR_OPPORTUNITY";

export const getOpportunity = () => ({
  type: GET_OPPORTUNITY,
});

export const getOpportunitySuccess = (opportunity) => ({
  type: GET_OPPORTUNITY_SUCCESS,
  payload: opportunity,
});

export const getOpportunityFailure = () => ({
  type: GET_OPPORTUNITY_FAILURE,
});

export const clearOpportunity = () => ({
  type: CLEAR_OPPORTUNITY,
});

/** Get data of opportunity detail from Backend
 * @param  {} id ID of Opportunity
 */
export function fetchOpportunity(id) {
  const URL = `${opportunitiesAPI}/${id}`;

  return async (dispatch) => {
    dispatch(getOpportunity());
    try {
      const res = await fetch(URL, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await res.json();
      dispatch(getOpportunitySuccess(data.opportunity));
    } catch (error) {
      console.error(error);
      dispatch(getOpportunityFailure());
    }
  };
}
