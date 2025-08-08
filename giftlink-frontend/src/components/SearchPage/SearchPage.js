import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';

function SearchPage() {

    //Task 1: Define state variables for the search query, age range, and search results.
    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    // Task 2. Fetch search results from the API based on user inputs.
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6); // Initialize with minimum value
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.log("query changed!");
    }, [searchQuery, ageRange]);

    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        navigate("/app/product/" + productId);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    const triggerSearch = async () => {
        var queryFilters = [];
        if (searchQuery.category) {
            queryFilters.push(`category=${searchQuery.category}`);
        }
        if (searchQuery.condition) {
            queryFilters.push(`condition=${searchQuery.condition}`);
        }
        if (searchQuery.name) {
            queryFilters.push(`name=${searchQuery.name}`);
        }
        if (ageRange) {
            queryFilters.push(`age_years=${ageRange}`);
        }
        var query = queryFilters.join("&");

        const response = await fetch(`${urlConfig.backendUrl}/api/search?${query}`);
        if (response.status !== 200) {
            //TODO
            return;
        }

        const results = await response.json();
        setSearchResults(results);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            Category
                            <select id="categorySelect" className="form-control my-1"
                                onChange={(e) => {
                                    const selectedCategory = e.target.value;
                                    setSearchQuery(prev => ({
                                        ...prev,
                                        category: selectedCategory
                                    }));
                                }}
                            >

                                <option value="">All</option>
                                {
                                    categories.map((category) => {
                                        return (
                                            <option value={category}>
                                                {category}
                                            </option>
                                        )
                                    })
                                }
                            </select>


                            Condition
                            <select id="conditionSelect" className="form-control my-1"
                                onChange={(e) => {
                                    const selectedCondition = e.target.value;
                                    setSearchQuery(prev => ({
                                        ...prev,
                                        condition: selectedCondition
                                    }));
                                }}
                            >

                                <option value="">All</option>
                                {
                                    conditions.map((condition) => {
                                        return (
                                            <option value={condition}>
                                                {condition}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            Less than {ageRange} years
                            <input type="range" id="age" name="age" min="0" max="10"
                                onChange={e => setAgeRange(e.target.value)}
                            />
                            {/* Task 7: Add text input field for search criteria*/}
                            Name
                            <input type="text" id="text" name="text"
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setSearchQuery(prev => ({
                                        ...prev,
                                        name: name
                                    }));
                                }}
                            />
                            {/* Task 8: Implement search button with onClick event to trigger search:*/}

                            <button onClick={triggerSearch}>
                                Search!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*Task 5: Display search results and handle empty results with a message. */}

            <div className="container mt-5">
                <div className="row">
                    {searchResults.map((gift) => (
                        <div key={gift.id} className="col-md-4 mb-4">
                            <div className="card product-card">
                                {gift.image ?
                                    <img src={gift.image} /> :
                                    <div className="no-image-available">No Image Available</div>
                                }
                                <div className="card-body">
                                    <h5 className="card-title">{gift.name}</h5>
                                    <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                        {gift.condition}
                                    </p>
                                    <p className="card-text">{formatDate(gift.date_added)}</p>

                                    <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
