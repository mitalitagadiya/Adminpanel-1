
import * as ActionTypes  from '../ActionType'


export const IncrementAction = () => (dispatch) => {
    dispatch({ type: ActionTypes.INCREMENT_COUNTER})
}

export const DecrementAction = () => (dispatch) => {
    dispatch({ type: ActionTypes.DECREMENT_COUNTER})
}