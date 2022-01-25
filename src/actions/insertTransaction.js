import * as actionType from '../keyword/actionType';

export const insertTransaction = (param)=>{
    return {
        type:actionType.INSERT_FULFILLED,
        payload:param
    }

}