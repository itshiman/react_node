import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/JSON',
    },
    credentials: 'same-origin',
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log('Post Comments', error.message);
      alert('Your Comment could not be posted\n Error: ' + error.message);
    });
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrl + 'leaders')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addLeaders(promos)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const postFeedback =
  (firstname, lastname, telnum, email, agree, contactType, message) =>
  (dispatch) => {
    const newFeedBack = {
      firstname,
      lastname,
      telnum,
      email,
      agree,
      contactType,
      message,
    };
    newFeedBack.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
      method: 'POST',
      body: JSON.stringify(newFeedBack),
      headers: {
        'Content-Type': 'application/JSON',
      },
      credentials: 'same-origin',
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              'Error ' + response.status + ': ' + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((response) => {
        console.log('Feed Back Posted: ' + response);
        alert('Your Feedback Has been Posted');
      })
      .catch((error) => {
        console.log('Post FeedBack', error.message);
        alert('Your Feed Back could not be posted\n Error: ' + error.message);
      });
  };

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(baseUrl + 'users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        // Dispatch the success action
        dispatch(receiveLogin(response));
      } else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(receiveLogout());
};
