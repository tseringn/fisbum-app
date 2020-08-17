


const initialState = {
   currentUser: null,
   searchResult:null,
   imgModalToggle: false,
   accountDisabled: false,
   signUpModalToggle: false,
    
}
// const fisbum_counts=()=>{
    
// }

const reducer = (prevState=initialState, action) => {
    // console.log('in reducer...', action.payload, action.type)
    switch(action.type){
        case 'SET_CURRENT_USER': return {...prevState, currentUser: action.payload.person}
        case 'SEARCH_RESULT': return {...prevState, searchResult: action.payload.result}
        case 'UN_FRIEND': return {...prevState, currentUser: {...prevState.currentUser, my_friends: [...prevState.currentUser.my_friends.filter(f=>f.id!=action.payload.id)]}}
        case 'REMOVE_REQUEST': return {...prevState, currentUser: {...prevState.currentUser, requestings: [...prevState.currentUser.requestings.filter(r=>r.id!=action.payload.id)]}}
        case 'SHOW_IMAGE': return {...prevState, imgModalToggle: !prevState.imgModalToggle}
        case 'DISABLE_ACCOUNT': return {...prevState, accountDisabled: !prevState.accountDisabled}
        case 'SIGN_UP': return {...prevState, signUpModalToggle: !prevState.signUpModalToggle}

        default:
            return prevState
    }
}

export default reducer;