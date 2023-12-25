import  { useState } from 'react';
import axios from 'axios';

const EditQuote = ({ id, initialCategory = '', initialAuthor = '', initialText = '' }) => {
    const [category, setCategory] = useState(initialCategory);
    const [author, setAuthor] = useState(initialAuthor);
    const [text, setText] = useState(initialText);

    const handleSubmit = () => {
        if (!category || !author || !text) {
            alert('Вы ничего не ввели');
            return;
        }

        const updatedQuote = {
            author: author,
            category: category,
            text: text
        };

        axios.put(`https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`, updatedQuote)
            .then(response => {
                console.log('Цитата успешно отредактирована!', response.data);
            })
            .catch(error => {
                console.error('Ошибка при редактировании цитаты:', error);
            });
    };

    return (
        <div className="quote-card container">
            <h3>Edit quote</h3>
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
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
            <button onClick={handleSubmit}>Сохранить изменения</button>
        </div>
    );
};

export default EditQuote;
