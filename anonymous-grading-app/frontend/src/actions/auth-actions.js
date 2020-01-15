import axios from 'axios';
import {SERVER} from '../config/global'




export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const AUTH_LINK_GOOGLE = 'AUTH_LINK_GOOGLE';
export const AUTH_LINK_FACEBOOK = 'AUTH_LINK_FACEBOOK';
export const AUTH_UNLINK_GOOGLE = 'AUTH_UNLINK_GOOGLE';
export const AUTH_UNLINK_FACEBOOK = 'AUTH_UNLINK_FACEBOOK';

export const AUTH_ERROR = 'AUTH_ERROR';
export const ABOUT_GET_DATA = 'ABOUT_GET_DATA';



export const oauthGoogle = data => {
  return async dispatch => {
    const res = await axios.post(`${SERVER}/users/oauth/google`, {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
  };
}

export const oauthFacebook = data => {
  return async dispatch => {
    const res = await axios.post(`${SERVER}/users/oauth/facebook`, {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
  };
}



export const signUp = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${SERVER}/users/signup`, data);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use'
      })
    }
  };
}

export const signIn = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${SERVER}/users/signin`, data);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email and password combination isn\'t valid'
      })
    }
  };
}

export const getSecret = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${SERVER}/users/secret`)

      dispatch({
        type: ABOUT_GET_DATA,
        payload: res.data.secret
      })

    } catch(err) {
      console.error('err', err)
    }
  }
}

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    })
  };
}
//////////////////////////////////////////////////////////////////////////////////

// export function getStudents() {
//     return {
//       type: GET_STUDENTS,
//       payload: async () => {
//           let response  = await fetch(`${SERVER}/students`)
//           let json = await response.json()
//           return json
//       }
//     }
// }

// export function addStudent(student){
//     return {
//       type : ADD_STUDENT,
//       payload : async () => {
//           await fetch(`${SERVER}/students`, {
//               method : 'post',
//               headers : {
//                   'Content-Type' : 'application/json'
//               },
//               body : JSON.stringify(student)
//           })
//           let response  = await fetch(`${SERVER}/students`)
//           let json = await response.json()
//           return json
//       }
//     }
//   }

  

// export function getProfessors() {
//     return {
//       type: GET_PROFESSORS,
//       payload: async () => {
//           let response  = await fetch(`${SERVER}/students`)
//           let json = await response.json()
//           return json
//       }
//     }
// }

// export function addProfessors(professor){
//     return {
//       type : ADD_PROFESSOR,
//       payload : async () => {
//           await fetch(`${SERVER}/students`, {
//               method : 'post',
//               headers : {
//                   'Content-Type' : 'application/json'
//               },
//               body : JSON.stringify(professor)
//           })
//           let response  = await fetch(`${SERVER}/professors`)
//           let json = await response.json()
//           return json
//       }
//     }
//   }


