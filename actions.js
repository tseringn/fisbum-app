const setCurrentUserAction = (person) => ({ type: 'SET_CURRENT_USER', payload: {person} })
const setSearchResultAction = (result) => ({ type: 'SEARCH_RESULT', payload: {result} })
const unfriendAction=id=>({type: "UN_FRIEND", payload: {id}})
const addFriendRequestAction=request=>({type: 'ADD_REQUEST', payload: {request}})
const removeRequestAction=id=>({type: 'REMOVE_REQUEST', payload: {id}})
const setImgModalToggleAction=()=>({type: 'SHOW_IMAGE'})
const setAccountDisabledAction=()=>({type: 'DISABLE_ACCOUNT'})
const setSignUpModalToggleAction=()=>({type: 'SIGN_UP'})

export {
    setCurrentUserAction,
    setSearchResultAction,
    unfriendAction,
    addFriendRequestAction,
    removeRequestAction,
    setImgModalToggleAction,
    setAccountDisabledAction,
    setSignUpModalToggleAction

}