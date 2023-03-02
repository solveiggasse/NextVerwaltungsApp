import React, { useState, useMemo, useEffect } from 'react'
import Table from '../components/TableWithCheckboxes'
import TableSearch from '@/components/TableSearch'
import BuildingData from '../data/building.json'

function BuildingsOverview() {
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [tableData, setTableData] = useState(BuildingData || [])
    const [favoriteBuildings, setFavoriteBuildings] = useState("");
    const [showSelected, setShowSelected] = useState(false);

    // Generates table columns from BuildingData using memoization.
    const columns = useMemo(() => {
        if (!BuildingData.length) return [];
        const keys = Object.keys(BuildingData[0]).filter(key => key !== 'id');
        return keys.map(key => ({
          Header: getHeader(key),
          accessor: key,
        }));
      }, [BuildingData]);

    // Handles changes in the TableSearch inputs.
    const handleInputChange = (name, value) => {
        if (name === 'street') {
            setStreet(value);
        } else if (name === 'streetNumber') {
            setStreetNumber(value);
        }
    }

    // Handles searching for a building in the table based on its address. 
    const handleSearch = () => {
        let filteredData = tableData.filter((item) => {
            if (street && !item.street.toLowerCase().includes(street.toLowerCase())) {
                return false;
            }
            if (streetNumber && !item.streetNumber.toLowerCase().includes(streetNumber.toLowerCase())) {
                return false;
            }
            return true;
        });
        setFilteredData(filteredData);
    };

    // Handles searching for favorite buildings in the table.
    function handleShowSelected() {
        setShowSelected(!showSelected);
      }

    /**
     * Returns the column header corresponding to the given key.
     * @param {*} key The column key.
     * @returns The column header.
     */
    function getHeader(key) {
        switch (key) {
            case 'street':
                return 'Straße';
            case 'streetNumber':
                return 'Hausnummer';
            case 'postal_code':
                return 'PLZ';
            case 'city':
                return 'Stadt';
            case 'emission':
                return 'Emission';
            case 'owner':
                return 'Besitzer';
            case 'yearConstruction':
                return 'Baujahr';
            case 'netArea':
                return 'Fläche';
            case 'buildingType':
                return 'Gebäudetyp';
            default:
                return key;
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="py-2">
                <h1 className="text-3xl">
                    Gebäude-Verwaltung
                </h1>
            </div>
            <TableSearch street={street} streetNumber={streetNumber} onInputChange={handleInputChange} onSearch={handleSearch} onFavoriteSearch={handleShowSelected} favoriteBuildings={favoriteBuildings} />
            <Table columns={columns} data={filteredData.length > 0 ? filteredData : tableData} sortableColumnId="emission" showSelected={showSelected} />
        </div>
    )
}

export default BuildingsOverview
