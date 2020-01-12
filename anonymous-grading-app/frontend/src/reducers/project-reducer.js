//returneaza starea actuala pe baza starii anterioare, sau starea anterioara (in mod implicit)

const INITIAL_STATE = {
    projectList : [],
    error : null,
    fetching : false,
    fetched : false
}
  
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case 'GET_PROJECTS_PENDING':
        case 'ADD_PROJECT_PENDING':
        case 'UPDATE_PROJECT_PENDING':
        case 'DELETE_PROJECT_PENDING':
            return  {...state, error : null, fetching : true, fetched : false}           
        case 'GET_PROJECTS_FULFILLED':
        case 'ADD_PROJECT_FULFILLED':
        case 'UPDATE_PROJECT_FULFILLED':
        case 'DELETE_PROJECT_FULFILLED':                
            return {...state, projectList : action.payload, error: null, fetched : true, fetching : false}
        case 'GET_PROJECTS_REJECTED':
        case 'ADD_PROJECT_REJECTED':
        case 'UPDATE_PROJECT_REJECTED':
        case 'DELETE_PROJECT_REJECTED':                                  
            return {...state, error : action.payload, fetching: false, fetched : false}
        default:
            break
    }
    return state
}