
import * as ActionTypes  from '../ActionType'

const initVal = {
    count : 0
}

export const CounterReducer = (state=initVal, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT_COUNTER:
        return {
            ...state,
            count:state.count + 1
        }
    case ActionTypes.DECREMENT_COUNTER:
        return {
            ...state,
            count:state.count - 1
        }
        default:
            return state
  }
}