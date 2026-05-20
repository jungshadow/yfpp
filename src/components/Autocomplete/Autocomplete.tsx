import React, { useState, useRef, useCallback } from 'react';
import classnames from 'classnames';
import './autocomplete.scss';
import useOutsideClick from 'hooks/useOutsideClick';
import mbxClient from '@mapbox/mapbox-sdk';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const MBX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_API_ACCESS_TOKEN;
const baseClient = mbxClient({ accessToken: MBX_ACCESS_TOKEN });
const geocodingService = mbxGeocoding(baseClient);

interface AutocompleteDataItem {
    location: string;
    query: string[];
}

interface AutocompleteProps {
    isActive: boolean;
    onSubmit: (e?: React.FormEvent | null, searchVal?: string) => void;
    onSearch: (val: string) => void;
    placeholder: string;
    value: string;
}

const Autocomplete = ({ isActive, onSubmit, onSearch, placeholder, value }: AutocompleteProps) => {
    const [dataSource, setDataSource] = useState<AutocompleteDataItem[]>([]);
    const refsArray: (HTMLButtonElement | null)[] = [];
    const searchInputRef = React.createRef<HTMLInputElement>();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleCloseAutoComplete() {
        setDataSource([]);
    }

    useOutsideClick(searchInputRef, handleCloseAutoComplete);

    const getAutoCompleteClassNames = () => {
        return classnames({
            autocomplete: true,
            'autocomplete--hasSearchVal': isActive,
        });
    };

    const logValue = () => {
        console.log(`Last value: ${value}`);
    };

    const getAutoCompleteAddresses = async (value: string) => {
        const searchQuery = value;
        if (!searchQuery) {
            return;
        }

        const response = await geocodingService
            .forwardGeocode({
                query: searchQuery,
                limit: 5,
                types: ['address'],
                countries: ['US'],
            })
            .send();

        const query = response.body.query;
        const matches = response.body.features.map(address => {
            return {
                location: address.place_name,
                query,
            };
        });

        setDataSource(matches);
    };

    const debouncedGetAutoCompleteAddresses = useCallback((val: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => getAutoCompleteAddresses(val), 200);
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        debouncedGetAutoCompleteAddresses(val);
        onSearch(val);
    };

    const handleSelectItem = (index: number) => {
        onSearch(dataSource[index].location);
        setDataSource([]);
        logValue();
        onSubmit(null, dataSource[index].location);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent) => {
        if (!dataSource.length) {
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                refsArray[0]?.focus();
                break;

            case 'Escape':
                handleCloseAutoComplete();
                break;
            case 'Enter':
                handleCloseAutoComplete();
                onSubmit(event);
                break;

            default:
                return;
        }
    };

    const handleActionKeyDown = (
        event: React.KeyboardEvent,
        index: number,
        results: AutocompleteDataItem[],
    ) => {
        event.preventDefault();

        switch (event.key) {
            case 'ArrowDown':
                {
                    const nextIndex = index < results.length ? index + 1 : index;
                    if (refsArray[nextIndex]) {
                        refsArray[nextIndex].focus();
                    }
                }
                break;

            case 'ArrowUp':
                {
                    const nextIndex = index > 0 ? index - 1 : index;
                    if (refsArray[nextIndex]) {
                        refsArray[nextIndex].focus();
                    }
                }
                break;

            case 'Enter':
                handleSelectItem(index);
                handleCloseAutoComplete();
                searchInputRef.current?.focus();
                break;

            case 'Escape':
                handleCloseAutoComplete();
                break;

            default:
                searchInputRef.current?.focus();
        }
    };

    const getHighlightedMatches = (locationData: AutocompleteDataItem) => {
        const { location, query } = locationData;
        const term = new RegExp(query.join('|'), 'gi');
        const newStr = location.replace(new RegExp(term, 'gi'), match => `<b>${match}</b>`);

        return { __html: newStr };
    };

    return (
        <div className={getAutoCompleteClassNames()}>
            <input
                className="autocomplete__input"
                id="searchFormInput"
                name="searchFormInput"
                onChange={handleOnChange}
                // onBlur={handleCloseAutoComplete}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                ref={searchInputRef}
                type="search"
                value={value}
            />

            {dataSource.length > 0 && (
                <ul className="autocomplete__list">
                    {dataSource.map((item, index, results) => (
                        <li key={`autocomplete${index}`} className="autocomplete__listItem">
                            <button
                                className="autocomplete__action"
                                dangerouslySetInnerHTML={getHighlightedMatches(item)}
                                id={`autocomplete${index}`}
                                onClick={() => handleSelectItem(index)}
                                onKeyDown={e => handleActionKeyDown(e, index, results)}
                                ref={ref => {
                                    refsArray[index] = ref;
                                }}
                                type="button"
                            ></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
