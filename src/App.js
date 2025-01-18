import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StockList from './components/StockList';
import AddStockForm from './components/AddStockForm';
import EditStockForm from './components/EditStockForm';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/stocks" element={<StockList />} />
                    <Route path="/add-stock" element={<AddStockForm />} />
                    <Route path="/edit-stock/:id" element={<EditStockForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
