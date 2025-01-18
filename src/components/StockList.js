import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllStocks, deleteStock } from '../services/stockService';

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    const calculateTotalValue = useCallback((stocks) => {
        const total = stocks.reduce(
            (sum, stock) => sum + stock.quantity * stock.buyPrice,
            0
        );
        setTotalValue(total);
    }, []);

    const fetchStocks = useCallback(async () => {
        try {
            const response = await getAllStocks();
            const stocksData = response.data || [];
            setStocks(stocksData);
            calculateTotalValue(stocksData);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    }, [calculateTotalValue]);

    useEffect(() => {
        fetchStocks();
    }, [fetchStocks]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this stock?')) {
            try {
                await deleteStock(id);
                const updatedStocks = stocks.filter((stock) => stock.id !== id);
                setStocks(updatedStocks);
                calculateTotalValue(updatedStocks);
            } catch (error) {
                console.error('Error deleting stock:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>Stock List</h1>
            <p><strong>Total Portfolio Value:</strong> ${totalValue.toFixed(2)}</p>
            <Link to="/add-stock">
                <button className="btn btn-primary mb-3">Add New Stock</button>
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Quantity</th>
                        <th>Buy Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => (
                        <tr key={stock.id}>
                            <td>{stock.id}</td>
                            <td>{stock.stockName}</td>
                            <td>{stock.ticker}</td>
                            <td>{stock.quantity}</td>
                            <td>${stock.buyPrice.toFixed(2)}</td>
                            <td>
                                <Link to={`/edit-stock/${stock.id}`}>
                                    <button className="btn btn-warning me-2">Edit</button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(stock.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockList;
