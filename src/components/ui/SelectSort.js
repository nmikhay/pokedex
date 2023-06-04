import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SelectSort = ({ onSortOptionChange }) => {
    const [sortOption, setSortOption] = useState('default');

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    }

    useEffect(() => {
        onSortOptionChange(sortOption);
    }, [sortOption, onSortOptionChange]);

    return (
        <select value={sortOption} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    );
}

SelectSort.propTypes = {
    onSortOptionChange: PropTypes.func.isRequired,
};

export default SelectSort;
