import axios from "axios";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLAOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';

export const getUser = (uid) =>{
    return (dispatch) => {
        return axios
        .get(`http://localhost:4000/api/user/${uid}`)   //`${process.env.REACT_APP_API_URL}api/user/${uid}`
        .then((res) =>{
            dispatch({ type: GET_USER, payload: res.data})
        })
        .catch((err)=>console.log(err));
    }
};

export const uploadPicture = (data, id) =>{
    return (dispatch) =>{
        return axios
            .post('http://localhost:4000/api/user/upload', data)   //${process.env.REACT_APP_API_URL}api/user
            .then((res) =>{
                return axios
                .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                .then((res) =>{
                    dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture})
                })
            })
            .catch((err =>console.log(err) ) );
        }
};

export const updateBio = (userId, bio) =>{
    return (dispatch) =>{
        return axios({
            method: 'put',
            url: `http://localhost:4000/api/user/` + userId,  //  `${process.env.REACT_APP_API_URL}api/user/`
            data: { bio }
        })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload:bio})
            })
            .catch((err) => console.log(err));
    }
}

export const followUser = (followerId, idToFollow) =>{
    return (dispatch) =>{
        return axios({
            method:'patch',
            url: `http://localhost:4000/api/user/follow/` + followerId,  // `${process.env.REACT_APP_API_URL}api/user/`
            data: {idToFollow}
        })
        .then((res) =>{
            dispatch({
                type:FOLLOW_USER, payload: {idToFollow}})
        })
        .catch((err)=>console.log(err))
    };
};

export const unfollowUser = (followerId, idToUnfollow) =>{
    return (dispatch) =>{
        return axios({
            method:'patch',
            url: `http://localhost:4000/api/user/unfollow/` + followerId,  // `${process.env.REACT_APP_API_URL}api/user/`
            data: {idToUnfollow}
        })
        .then((res) =>{
            dispatch({
                type:UNFOLLOW_USER, payload: {idToUnfollow}})
        })
        .catch((err)=>console.log(err))
    };
};
