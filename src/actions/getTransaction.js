import * as actionType from '../keyword/actionType';

export const getTransaction = (param)=>{
    return {
        type:actionType.FETCH_FULFILLED,
        payload:param
    }

}