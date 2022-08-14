import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DecrementAction, IncrementAction } from '../../Redux/Action/Counter.action';

function Counter(props) {
    
    const Dispach = useDispatch();
    const m = useSelector(state => state.Counter);

    const handleIncrement = () => {
            Dispach(IncrementAction());
    }

    const handleDecrement = () => {
           Dispach(DecrementAction());
    }


    return (
        
        <div>
            <button onClick={() => handleIncrement()}>+</button>
                {m.count}
            <button onClick={() => handleDecrement()}>-</button>
        </div>
    );
}

export default Counter;