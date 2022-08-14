import React, { useEffect } from 'react';

function PromiseExample(props) {

    const one = () => {
        return 'one';
    }

    const two = () => {

        const promise = new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve('two');
            }, 2000);

        })
        return promise;

        // return promise;

        //    setTimeout(() => {

        //         return 'two';

        //    }, 2000);
    }

    const three = () => {
        return 'three';
    }

    const All = async () => {
        let oneAns = one();
        console.log(oneAns);

        let twoAns = await  two();
        console.log(twoAns);

        let threeAns = three();
        console.log(threeAns);
    }

    useEffect(() => {

        All();

    }, []);

    const print = (m) => {
        console.log(m);
    }

    const sum = (a, b, callback) => {

        let sum=0;
        sum = a + b;
        
        callback(sum); 

    }

    sum(90, 10, print);

    Promise.all([one, two, three]).then((values) =>{
        console.log(values);
    })

    return (
        <div>

        </div>
    );
}

export default PromiseExample;