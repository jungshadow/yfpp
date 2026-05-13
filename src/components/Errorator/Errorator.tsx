import React, { useContext, useRef } from 'react';
import { AppContext, DispatchContext } from 'appReducer';
import { motion } from 'framer-motion';

import './errorator.scss';
import { CloseIcon } from 'components/Icons';
import KitchenSink from 'components/KitchenSink/KitchenSink';
import useOutsideClick from 'hooks/useOutsideClick';

const Errorator = () => {
    const dispatch = useContext(DispatchContext);
    const { errors } = useContext(AppContext);
    const erroratorRef = useRef<HTMLDivElement>(null);
    useOutsideClick(erroratorRef, handleRemoveError);

    let errorMessage: string | null = null;
    if (errors) {
        let msg = '';
        Object.keys(errors).forEach(key => {
            const errorEntry = errors[key];
            if (!errorEntry) return;
            switch (key) {
                case 'locations':
                    msg = `${errorEntry.message}`;

                    if (errorEntry.message === 'Election unknown') {
                        msg =
                            "<b>We didn't get any fucking polling place results</b>, but check with your local election official if you think you should have some.";
                    }
                    break;
                case 'representatives':
                    msg = `${errorEntry.message} fucker`;
                    break;
                default:
                    console.log('In default');
                    console.log(errors);
                    break;
            }
        });
        errorMessage = msg;
    }

    function handleRemoveError() {
        dispatch({
            type: 'SET_ERROR',
            error: false,
        });
    }

    const pageVariants = {
        initial: {
            opacity: 0,
            y: '200%',
        },
        in: {
            opacity: 1,
            y: '0',
        },
        out: {
            opacity: 0,
            y: '200%',
        },
    };

    return (
        <>
            {errorMessage && (
                <motion.div
                    className="errorator"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    ref={erroratorRef}
                >
                    <button
                        className="errorator__closeBtn"
                        type="button"
                        onClick={handleRemoveError}
                    >
                        <span className="isVisuallyHidden">close</span>
                        <span className="errorator__closeBtnIcon">
                            <CloseIcon />
                        </span>
                    </button>
                    <KitchenSink isReversed>
                        <p dangerouslySetInnerHTML={{ __html: errorMessage }} />
                    </KitchenSink>
                </motion.div>
            )}
        </>
    );
};

export default Errorator;
