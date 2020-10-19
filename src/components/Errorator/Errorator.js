<<<<<<< HEAD
import React, {useContext, useState, useEffect, useRef} from 'react';
import {AppContext, DispatchContext} from 'appReducer';
import {motion} from 'framer-motion';

import './errorator.scss';
import {CloseIcon} from 'components/Icons';
import KitchenSink from 'components/KitchenSink/KitchenSink';
import useOutsideClick from 'hooks/useOutsideClick';
=======
import React, {useContext, useState, useEffect} from 'react';
import {AppContext, DispatchContext} from 'appReducer';
>>>>>>> 1e9ae6f... First stab at the errorator

const Errorator = (props) => {
    const dispatch = useContext(DispatchContext);
    const {errors, leoInfo} = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState(null);
<<<<<<< HEAD
    const erroratorRef = useRef();
    useOutsideClick(erroratorRef, handleRemoveError);
=======
>>>>>>> 1e9ae6f... First stab at the errorator

    useEffect(() => {
        let errorMessage = '';

<<<<<<< HEAD
        if (errors) {
            Object.keys(errors).forEach((key) => {
                switch (key) {
                    case 'locations':
                        {
                            errorMessage = `${errors[key]['message']}`;
                        }
                        break;
                    case 'representatives':
                        {
                            console.log(errors[key]);
                            errorMessage = `${errors[key]['message']} fucker`;
                        }
                        break;
=======
        if(errors) {
            Object.keys(errors).forEach((key) => {
                switch(key) {
                    case 'locations': {
                        errorMessage = `${errors[key]['message']}`;
                    }
                    break;
                    case 'representatives': {
                        console.log(errors[key]);
                        errorMessage = `${errors[key]['message']} fucker`;
                    }
                    break;
>>>>>>> 1e9ae6f... First stab at the errorator
                    default:
                        console.log('In default');
                        console.log(errors);
                        break;
                }
            });
            // set error message
            setErrorMessage(errorMessage);
        }
    }, [errors, leoInfo]);

<<<<<<< HEAD
    function handleRemoveError() {
        dispatch({
            type: 'SET_ERROR',
            errors: false
        });
    }

    const pageVariants = {
        initial: {
            opacity: 0,
            y: '200%'
        },
        in: {
            opacity: 1,
            y: '0'
        },
        out: {
            opacity: 0,
            y: '200%'
        }
=======
    const handleRemoveError = e => {
        dispatch({
            type: 'SET_ERROR',
            errors: false
        })
>>>>>>> 1e9ae6f... First stab at the errorator
    };

    return (
        <>
<<<<<<< HEAD
            {errorMessage && (
                <motion.div
                    className="errorator"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    ref={erroratorRef}
                >
                    <button className="errorator__closeBtn" type="button" onClick={handleRemoveError}>
                        <span className="isVisuallyHidden">close</span>
                        <span className="errorator__closeBtnIcon">
                            <CloseIcon />
                        </span>
                    </button>
                    <KitchenSink isReversed>
                        <p dangerouslySetInnerHTML={{__html: errorMessage}} />
                    </KitchenSink>
                </motion.div>
            )}
        </>
    );
};
=======
        {errorMessage && <div>
            <button onClick={handleRemoveError}>Remove</button>
                {errorMessage}
        </div>}
        </>
    );
}
>>>>>>> 1e9ae6f... First stab at the errorator

export default Errorator;
