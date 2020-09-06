


// Action Types
export const GET_MENTORS = 'GET_MENTORS';
export const GET_MENTORS_SUCCESS = 'GET_MENTORS_SUCCESS';
export const GET_MENTORS_FAILURE = 'GET_MENTORS_FAILURE';
export const GET_CURRENT_MENTORS = 'GET_CURRENT_MENTORS';
export const SET_GLOBAL_PAGE = 'SET_GLOBAL_PAGE';
export const CLEAR_MENTORS = 'CLEAR_MENTORS';
export const SELECT_MENTOR = 'SELECT_MENTOR';
export const CLEAR_SELECTED_MENTOR = 'CLEAR_SELECTED_MENTOR';
// Create redux action creators that return an action

const shuffleArray=(array) =>{
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
export const getMentors = () => ({
  type: GET_MENTORS,
});

export const getMentorsSuccess = mentors => ({
  type: GET_MENTORS_SUCCESS,
  payload: mentors,
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
export const clearSelectedMentor = () => ({
  type: CLEAR_SELECTED_MENTOR,
});

export const setGlobalPage = page => ({
  type: SET_GLOBAL_PAGE,
  payload: page,
});
export const selectMentor = mentor => ({
  type: SELECT_MENTOR,
  payload: mentor,
});
// combine actions in an async thunk
export function fetchMentors() {
  const baseUrl='http://localhost:8080/services/mentors';
  const URL = `${baseUrl}?size=100&offset=0`;
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
      let mentors=shuffleArray(data.mentors);
      console.log("shumentors",JSON.stringify(mentors))
      dispatch(getMentorsSuccess({mentors}));
    } catch (error) {
      console.error(error);
      dispatch(getMentorsFailure());
    }
  }
}

