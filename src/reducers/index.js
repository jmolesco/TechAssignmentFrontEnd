import { combineReducers} from "redux";
import insertTransactionReducer from "./transaction/insertTransactionReducer";
import getAllTransactionReducer from "./transaction/getAllTransactionReducer";
import getCurrencyReducer from "./transaction/getCurrencyReducer";

const allReducers = combineReducers({
     tranInsert:insertTransactionReducer,
     trangetAll:getAllTransactionReducer,
     currency:getCurrencyReducer
});
export default allReducers;