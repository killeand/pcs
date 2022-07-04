import React, { useContext, useEffect } from 'react';
import PCSContext from './PCSContext';

export default function Application() {
    let Test = useContext(PCSContext);

    useEffect(() => {
        Test.setTest(`Test v${Math.random()}`);
    }, []);

    return (
        <>
            <p className="bg-red-900 text-white">{Test.test} Application</p>
            <button onClick={() => Test.setTest(`Sup user#${Math.random() * 10}`)}>Login</button>
        </>
    );
}