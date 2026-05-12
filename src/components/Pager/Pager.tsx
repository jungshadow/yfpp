import React, { useState } from 'react';
import './pager.scss';
import { motion } from 'framer-motion';

interface PagerProps {
    data: unknown[];
    numberPerPage?: number;
    children: React.ReactElement;
}

const PAGER_OFFSET = 3;
const Pager = ({data, numberPerPage = 5, children}: PagerProps) => {
    const [pageIndex, setPageIndex] = useState(1);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.075,
            },
        },
    };

    const item = {
        hidden: (index: number) => ({
            opacity: 0,
            left: `${index % 2 === 0 ? '10%' : '-10%'}`,
        }),
        show: {
            opacity: 1,
            left: 0,
        },
    };

    const generatePageNav = () => {
        if (data.length <= numberPerPage) {
            return null;
        }

        function getPagerLinkClass(index: number) {
            return index === pageIndex
                ? 'pager__link pager__link--isActive'
                : 'pager__link';
        }
        const pagesCount = Math.ceil(data.length / numberPerPage);
        let pagingLinks = [];

        for (let index = 1; index <= pagesCount; index++) {
            pagingLinks.push(
                <li key={`'pagerLink_${index}`}>
                    <button
                        className={getPagerLinkClass(index)}
                        onClick={() => setPageIndex(index)}
                    >
                        {index}
                    </button>
                </li>
            );
        }

        if (pagesCount > PAGER_OFFSET) {
            let beginningPageOffset = pageIndex - PAGER_OFFSET;
            let endingPageOffset = pageIndex + PAGER_OFFSET;

            if (pageIndex <= PAGER_OFFSET) {
                beginningPageOffset = pageIndex - (PAGER_OFFSET + pageIndex);
                endingPageOffset = pageIndex + (PAGER_OFFSET * 2 - pageIndex);
            }
            if (pageIndex > pagesCount - PAGER_OFFSET) {
                beginningPageOffset =
                    pageIndex - (PAGER_OFFSET * 2 - (pagesCount - pageIndex));
            }

            pagingLinks = pagingLinks.filter(
                (link, index) =>
                    index + 1 > beginningPageOffset &&
                    index + 1 <= endingPageOffset
            );
        }

        return (
            <div className="pager__nav">
                {pageIndex > 1 && (
                    <button
                        className="pager__link pager__link--prev"
                        onClick={() => setPageIndex(pageIndex - 1)}
                    >
                        {'<'}
                    </button>
                )}
                <ol className="pager__links">
                    {pagingLinks.map(link => link)}
                </ol>
                {pageIndex < pagesCount && (
                    <button
                        className="pager__link pager__link--next"
                        onClick={() => setPageIndex(pageIndex + 1)}
                    >
                        {'>'}
                    </button>
                )}
            </div>
        );
    };

    const getNextResults = () => {
        const nextResultsFilter = (_item: unknown, index: number) => {
            const fromValue =
                pageIndex === 1
                    ? pageIndex
                    : pageIndex * numberPerPage - numberPerPage + 1;
            const toValue = pageIndex * numberPerPage;

            return index + 1 >= fromValue && index + 1 <= toValue;
        };

        const nextResults = data.filter(nextResultsFilter);

        return (
            <React.Fragment>
                {nextResults.map((result, index) => (
                    <motion.li
                        key={`result_${index}_${pageIndex}`}
                        variants={item}
                    >
                        {React.cloneElement(children, { data: result } as Record<string, unknown>)}
                    </motion.li>
                ))}
            </React.Fragment>
        );
    };

    return (
        <div className="pager">
            <motion.ul
                className="pager__list"
                variants={container}
                initial="hidden"
                animate="show"
                key={pageIndex}
            >
                {getNextResults()}
            </motion.ul>
            <div className="pager__nav">{generatePageNav()}</div>
        </div>
    );
};

export default Pager;
