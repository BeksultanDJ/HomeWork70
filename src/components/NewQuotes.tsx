import { useState } from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";

const NewQuotes = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');

    const handleSubmit = () => {
        const newQuote = {
            name: name,
            phone: phone,
            email: email,
            photo: photo,
        };

        axios.post('https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes.json', newQuote)
            .then(response => {
                console.log('Данные успешно отправлены!', response.data);
                setName('');
                setPhone('');
                setEmail('');
                setPhoto('');
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
            });
    };

    return (
        <div className="quote-card container">
            <h3>Create new contact</h3>
            <input
                className="authorInput"
                type="text"
                placeholder="Author"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="authorInput"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                className="authorInput"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="authorInput"
                type="text"
                placeholder="Photo Link"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />

          <NavLink to="/"><button onClick={handleSubmit}>Сохранить</button></NavLink>
        </div>
    );
};

export default NewQuotes;
