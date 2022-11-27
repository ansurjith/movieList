import {SAVE_RESULT} from "./main.action"

export const initialState = {
    result:[]
};


function mainReducer(state=initialState, action) {
    switch (action.type) {
      case SAVE_RESULT:
        return {
          ...state,
          result:action.payload
        };
      
      default:
        return state;
    }
  };

export default mainReducer;