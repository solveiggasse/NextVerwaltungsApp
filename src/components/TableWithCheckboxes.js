import React, { useState, useMemo, useEffect } from 'react'
import UserData from '../data/user.json'

/**
 * This is a functional component that renders a table with checkboxes.
 * - columns: an array of objects that defines the table columns
 * - data: an array of objects that represents the table data
 * - sortableColumnId: a string that represents the column ID that can be sorted
 * - showSelected: a boolean that determines whether to show only the selected rows or all rows
 * @returns A table with checkboxes.
 */
function TableWithCheckboxes({ columns, data, sortableColumnId, showSelected }) {
  const userId = 1;
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useMemo(() => {
    const user = UserData.find(user => user.id === userId);
    setSelectedRows(user ? user.favorites : []);
  }, [UserData, userId]);


  useEffect(() => {
    setFilteredData(
      showSelected ? data.filter(row => selectedRows.includes(row.id)) : data);
  }, [selectedRows, showSelected, data]);

  // The toggleSelectedRow function toggles the selected state of a row.
  const toggleSelectedRow = (id) => {
    const index = selectedRows.indexOf(id);
    if (index > -1) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // The handleSelectRow function is a event handler for the checkboxes.
  function handleSelectRow(id) {
    toggleSelectedRow(id);
  }

  // The handleSort function updates the sort configuration when a sortable column header is clicked.
  const handleSort = (accessor) => {
    if (accessor === sortableColumnId) {
      let direction = 'ascending';
      if (sortConfig.key === accessor) {
        direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
      }
      setSortConfig({ key: accessor, direction });
    }
  }

  // Variable with sorted data.
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // The component returns a table with checkboxes.
  return (
    <>
      <div className="py-4 w-2/3 rounded-xl bg-blue-500 mt-8 overflow-auto">
        <table className="py-8 table-auto w-full bg-white text-left">
          <thead>
            <tr className="bg-blue-500 font-semibold text-white">
              {columns.map((col) => (
                <th key={col.accessor} onClick={() => handleSort(col.accessor)} className={"p-3"}>
                  {col.Header} {sortConfig.key === col.accessor && (
                    sortConfig.direction === 'ascending' ? '↑' : sortConfig.direction === 'descending' ? '↓' : ''
                  )}
                </th>
              ))}
              <th>Favoriten</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="border-b border-gry-500 hover:bg-gray-100">
                {columns.map((column) => (
                  <td className="px-4 py-2" key={`${row.id}-${column.accessor}`}>{row[column.accessor]}</td>
                ))}
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableWithCheckboxes;