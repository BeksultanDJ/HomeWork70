import { useState } from 'react';
import axios from 'axios';

const NewQuotes = () => {
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = () => {
        const newQuote = {
            author: author,
            category: category,
            text: text
        };

        axios.post('https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes.json', newQuote)
            .then(response => {
                console.log('Цитата успешно отправлена!', response.data);
                setCategory('');
                setAuthor('');
                setText('');
            })
            .catch(error => {
                console.error('Ошибка при отправке цитаты:', error);
            });
    };

    return (
        <div className="quote-card container">
            <h3>Submit new quote</h3>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option value="Star Wars">Star Wars</option>
                <option value="Famous people">Famous people</option>
                <option value="Saying">Saying</option>
                <option value="Humour">Humour</option>
                <option value="Motivational">Motivational</option>
            </select>
            <input
                className="authorInput"
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
                cols="40"
                rows="5"
                placeholder="Quote text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Сохранить</button>
        </div>
    );
};

export default NewQuotes;
