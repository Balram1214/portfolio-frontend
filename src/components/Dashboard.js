import React, { useEffect, useState } from 'react';
import { getAllStocks } from '../services/stockService';

function Dashboard() {
    const [stocks, setStocks] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await getAllStocks();
                const stocksData = response.data || [];
                setStocks(stocksData);
                calculateTotalValue(stocksData);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();
    }, []);

    const calculateTotalValue = (stocks) => {
        const total = stocks.reduce((sum, stock) => sum + stock.quantity * stock.buyPrice, 0);
        setTotalValue(total);
    };

    return (
        <div className="container mt-4">
            <h2>Dashboard</h2>
            <p><strong>Total Portfolio Value:</strong> ${totalValue.toFixed(2)}</p>
        </div>
    );
}

export default Dashboard;
