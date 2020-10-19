import React, {useContext, useState, useEffect} from 'react';
import {AppContext, DispatchContext} from 'appReducer';

const Errorator = (props) => {
    const dispatch = useContext(DispatchContext);
    const {errors, leoInfo} = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        let errorMessage = '';

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

    const handleRemoveError = e => {
        dispatch({
            type: 'SET_ERROR',
            errors: false
        })
    };

    return (
        <>
        {errorMessage && <div>
            <button onClick={handleRemoveError}>Remove</button>
                {errorMessage}
        </div>}
        </>
    );
}

export default Errorator;
