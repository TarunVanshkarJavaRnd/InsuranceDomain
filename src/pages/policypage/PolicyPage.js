import React from 'react';
import Cards from '../../components/cards/Cards';
import { useLocation } from 'react-router-dom';

const PolicyPage = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const selectedCategory = queryParams.get('category');
    const searchQuery = queryParams.get('query'); // Get the search query from the URL
    
    return (
        <div>
            <Cards query={searchQuery} selectedCategory={selectedCategory} />
        </div>
    );
}

export default PolicyPage;
