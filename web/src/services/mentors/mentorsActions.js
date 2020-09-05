


// Action Types
export const GET_MENTORS = 'GET_MENTORS';
export const GET_MENTORS_SUCCESS = 'GET_MENTORS_SUCCESS';
export const GET_MENTORS_FAILURE = 'GET_MENTORS_FAILURE';
export const GET_CURRENT_MENTORS = 'GET_CURRENT_MENTORS';
export const SET_GLOBAL_PAGE = 'SET_GLOBAL_PAGE';
export const CLEAR_MENTORS = 'CLEAR_MENTORS';

// Create redux action creators that return an action
export const getMentors = () => ({
  type: GET_MENTORS,
});

export const getMentorsSuccess = jobs => ({
  type: GET_MENTORS_SUCCESS,
  payload: jobs,
});

export const getMentorsFailure = () => ({
  type: GET_MENTORS_FAILURE,
});

export const getCurrentMentors = (start = 0, end = 10, globalPage = 1) => ({
  type: GET_CURRENT_MENTORS,
  payload: {
    start,
    end,
    globalPage
  },
});

export const clearMentors = () => ({
  type: CLEAR_MENTORS,
});

export const setGlobalPage = page => ({
  type: SET_GLOBAL_PAGE,
  payload: page,
});

// combine actions in an async thunk
export function fetchMentors() {
  const baseUrl='http://localhost:8080/services/mentors';
  const URL = `${baseUrl}?size=20&offset=0`;
  return async dispatch => {
    dispatch(getMentors());

    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept':'*/*',
          'Accept-Encoding':'gzip,deflate,br'
        }
      });

      let data = await res.json();
      let mentors=data.mentors;
      dispatch(getMentorsSuccess({mentors}));
    } catch (error) {
      console.error(error);
      dispatch(getMentorsFailure());
    }
  }
}

