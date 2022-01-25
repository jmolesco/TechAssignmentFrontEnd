import * as actionType from '../../keyword/actionType';
const initialState =[];
const insertTransactionReducer = (state = initialState,action)=>{
    switch(action.type){
        case actionType.INSERT_PENDING:
            return {
                inserting:true,
                inserted:false,
                failed:false,
                loading:true,
                error:null,
               
            };
        case actionType.INSERT_FULFILLED:
            return{
               ...state,
               action
            };
        case actionType.INSERT_REJECTED:
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
export default insertTransactionReducer;