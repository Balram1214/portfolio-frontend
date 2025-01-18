import React, { useState, useEffect } from 'react';
import { getStockById, updateStock } from '../services/stockService';
import { useParams, useNavigate } from 'react-router-dom';

const EditStockForm = () => {
    const { id } = useParams(); // Get the stock ID from the URL
    const navigate = useNavigate();
    const [stock, setStock] = useState({
        stockName: '',
        ticker: '',
        quantity: '',
        buyPrice: '',
    });

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await getStockById(id); // Fetch the stock by ID
                setStock(response.data); // Prefill the form
            } catch (error) {
                console.error('Error fetching stock:', error);
                alert('Failed to load stock details.');
            }
        };
        fetchStock();
    }, [id]);

    const handleChange = (e) => {
        setStock({
            ...stock,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStock(id, stock); // Call the updateStock API
            alert('Stock updated successfully!');
            navigate('/'); // Redirect to the stock list
        } catch (error) {
            console.error('Error updating stock:', error);
            alert('Failed to update stock. Please check the console for details.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Stock</h2>
            <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                <div className="mb-3">
                    <label className="form-label"><strong>Stock Name:</strong></label>
                    <input
                        type="text"
                        name="stockName"
                        value={stock.stockName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter stock name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><strong>Ticker:</strong></label>
                    <input
                        type="text"
                        name="ticker"
                        value={stock.ticker}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter stock ticker (e.g., AAPL)"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><strong>Quantity:</strong></label>
                    <input
                        type="number"
                        name="quantity"
                        value={stock.quantity}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter quantity"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><strong>Buy Price:</strong></label>
                    <input
                        type="number"
                        name="buyPrice"
                        value={stock.buyPrice}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter buy price"
                        required
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success">Update Stock</button>
                </div>
            </form>
        </div>
    );
};

export default EditStockForm;
