import React, { useState } from 'react';
import { addStock } from '../services/stockService';

const AddStockForm = () => {
    const [stock, setStock] = useState({
        stockName: '',
        ticker: '',
        quantity: '',
        buyPrice: '',
    });

    const handleChange = (e) => {
        setStock({
            ...stock,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addStock(stock);
            alert('Stock added successfully!');
            setStock({ stockName: '', ticker: '', quantity: '', buyPrice: '' });
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Stock</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Stock Name:</label>
                    <input
                        type="text"
                        name="stockName"
                        value={stock.stockName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ticker:</label>
                    <input
                        type="text"
                        name="ticker"
                        value={stock.ticker}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={stock.quantity}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Buy Price:</label>
                    <input
                        type="number"
                        name="buyPrice"
                        value={stock.buyPrice}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Stock</button>
            </form>
        </div>
    );
};

export default AddStockForm;
