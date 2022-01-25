import * as actionType from '../../keyword/actionType';
const initialState =[];
const getAllTransactionReducer = (state = initialState,action)=>{
    switch(action.type){
        case actionType.FETCH_PENDING:
            return {
                inserting:true,
                inserted:false,
                failed:false,
                loading:true,
                error:null,
               
            };
        case actionType.FETCH_FULFILLED:
            return action.payload;
        case actionType.FETCH_REJECTED:
            return {
                error:action.payload.response.data,
                inserting:false,
                inserted:false,
                failed:true,
            };
        default:
            return state;
    }
}
export default getAllTransactionReducer;