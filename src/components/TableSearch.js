import { useTable, useSortBy, useRowSelect } from 'react-table'
import React, { useState, useMemo, useEffect } from 'react'

function TableSearch(props) {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        props.onInputChange(name, value);
    }

    useEffect(() => {
        props.onSearch();
    }, [props.street, props.streetNumber]);

    return (
        <>
            <div className="flex justify-center items-center p-4 w-2/3 rounded-xl bg-white mt-8">
                <form className="flex w-full">
                    <input
                        type="text"
                        id="streetInput"
                        name="street"
                        placeholder="Straße"
                        value={props.street}
                        onChange={handleInputChange}
                        className="w-1/2 mr-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        id="streetNumberInput"
                        name="streetNumber"
                        placeholder="Hausnummer"
                        value={props.streetNumber}
                        onChange={handleInputChange}
                        className="w-1/2 ml-2 mr-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        required
                    />
                </form>
            </div>
            <div className="flex items-left w-2/3">
                <div className="flex items-left w-1/3">
                    <button onClick={props.onFavoriteSearch} className="relative left-0 flex pt-6 pl-4 bg-transparent text-gray-500 hover:text-gray-800">Nur Favoriten anzeigen</button>
                </div>
            </div>
        </>
    );
};

export default TableSearch;
