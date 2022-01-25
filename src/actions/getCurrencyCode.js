import * as actionType from '../keyword/actionType';

export const getCurrencyCode = (param)=>{
    return {
        type:actionType.FETCH_FULFILLED_CURRENCY,
        payload:param
    }

}