import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface Quote {
    id: string;
    name: string;
    phone: number;
}

const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        fetchData();
    }, []);



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

    return (
        <div className="container">
            <div className="quotes">
                {filteredQuotes.map((quote) => (
                    <div className="quoteCard" key={quote.id}>
                        <div className="cardInfo">

                            <p>{quote.name}</p>
                            <p>"{quote.phone}"</p>
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
