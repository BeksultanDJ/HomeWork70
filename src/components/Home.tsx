import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface Quote {
    id: string;
    author: string;
    category: string;
    text: string;
}

const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = quotes.filter((quote) => quote.category === selectedCategory);
            setFilteredQuotes(filtered);
        } else {
            setFilteredQuotes(quotes);
        }
    }, [selectedCategory, quotes]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes.json');
            if (response.data) {
                const quotesArray: Quote[] = Object.entries(response.data).map(([id, quote]: [string, any]) => ({
                    id,
                    ...quote,
                }));
                setQuotes(quotesArray);
                setFilteredQuotes(quotesArray);
            }
        } catch (error) {
            console.error('Ошибка при получении цитат:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`);
            const updatedQuotes = quotes.filter((quote) => quote.id !== id);
            setQuotes(updatedQuotes);
            setFilteredQuotes(updatedQuotes);
        } catch (error) {
            console.error('Ошибка при удалении цитаты:', error);
        }
    };

    const handleCategoryClick = (category: string) => {
        if (category === 'All') {
            setFilteredQuotes(quotes);
        } else {
            setSelectedCategory(category);
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h3>Categories</h3>
                <ul>
                    <li className="sidebarElems" onClick={() => handleCategoryClick('All')}>All</li>
                    <li className="sidebarElems" onClick={() => handleCategoryClick('Star Wars')}>Star Wars</li>
                    <li className="sidebarElems" onClick={() => handleCategoryClick('Famous people')}>Famous people</li>
                    <li className="sidebarElems" onClick={() => handleCategoryClick('Saying')}>Saying</li>
                    <li className="sidebarElems" onClick={() => handleCategoryClick('Humour')}>Humour</li>
                    <li className="sidebarElems" onClick={() => handleCategoryClick('Motivational')}>Motivational</li>
                </ul>
            </div>
            <div className="quotes">
                <h2>Цитаты</h2>
                {filteredQuotes.map((quote) => (
                    <div className="quoteCard" key={quote.id}>
                        <div>
                            <p>"{quote.text}"</p>
                            <p>— {quote.author}</p>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(quote.id)}>Удалить</button>
                            <button className="cardBtn">
                                <NavLink className="cardLinks" to={`/${quote.id}/EditQuote`}>
                                    Edit Quote
                                </NavLink>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quotes;
