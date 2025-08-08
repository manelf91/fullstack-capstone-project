import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(urlConfig.backendUrl + "/api/gifts")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    //TODO
                }
            }).then((gifts) => setGifts(gifts))
    }, []);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        navigate("app/product/" + productId);
    };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
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
    );
}

export default MainPage;
