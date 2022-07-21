import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Decrement, Increment } from '../../Redux/Action/Counter.Action';

function Counter(props) {

    const dispatch = useDispatch();
    const c = useSelector (state => state.Counter);

    const handleIncrement = () => {
        dispatch(Increment())
    }

    const handleDecrement = () => {
        dispatch(Decrement())
    }


    return (
       <div>
            <button onClick={handleIncrement()}>+</button>
            {c.Counter}
            <button onClick={handleDecrement()}>-</button>
       </div>
    );
}

export default Counter;