import {
  GET_MOVIES,
  SEARCH_MOVIES,
  SORT_MOVIES,
  SET_SORT_BY,
  SET_SEARCH_BY,
} from 'core/store/constants.js';
import axios from 'axios';

export const getMovies = sortBy => dispatch => {
  axios
    .get('https://reactjs-cdp.herokuapp.com/movies', {
      params: {
        sortBy,
        sortOrder: 'desc',
      },
    })
    .then(response =>
      dispatch({
        type: GET_MOVIES,
        payload: response.data.data,
      }),
    )
    .catch(function(error) {
      console.log(error);
    });
};

export const searchMovies = (search, searchBy, sortBy) => dispatch => {
  axios
    .get('https://reactjs-cdp.herokuapp.com/movies', {
      params: {
        search,
        searchBy,
        sortBy,
        sortOrder: 'desc',
      },
    })
    .then(response =>
      dispatch({
        type: SEARCH_MOVIES,
        payload: response.data.data,
      }),
    )
    .catch(function(error) {
      console.log(error);
    });
};

export const sortMovies = sortBy => (dispatch, getState) => {
  let movies = getState().movieList.movies;
  if (sortBy === 'release_date') {
    movies = [...movies].sort((a, b) => {
      if (new Date(b[sortBy]) < new Date(a[sortBy])) return -1;
      if (new Date(b[sortBy]) > new Date(a[sortBy])) return 1;
      return 0;
    });
  } else {
    movies = [...movies].sort((a, b) => b[sortBy] - a[sortBy]);
  }

  return dispatch({
    type: SORT_MOVIES,
    payload: movies,
  });
};

export const setSortBy = sortBy => dispatch => {
  return dispatch({
    type: SET_SORT_BY,
    payload: sortBy,
  });
};

export const setSearchBy = searchBy => dispatch => {
  return dispatch({
    type: SET_SEARCH_BY,
    payload: searchBy,
  });
};
