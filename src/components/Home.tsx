import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface Contact {
    id: string;
    name: string;
    phone: number;
    photo: string;
}

const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        try {
            const response = await axios.get('https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes.json');
            if (response.data) {
                const contactsArray: Contact[] = Object.entries(response.data).map(([id, contact]: [string, any]) => ({
                    id,
                    ...contact,
                }));
                setContacts(contactsArray);
                setFilteredContacts(contactsArray);
            }
        } catch (error) {
            console.error('Ошибка при получении контакта:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`);
            const updatedQuotes = contacts.filter((contact) => contact.id !== id);
            setContacts(updatedQuotes);
            setFilteredContacts(updatedQuotes);
        } catch (error) {
            console.error('Ошибка при удалении контакта:', error);
        }
    };

    const defaultPhotoUrl = 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png';

    return (
        <div className="container">
            <div className="quotes">
                {filteredContacts.map((contact) => (
                    <div className="quoteCard" key={contact.id}>
                        <div className="cardInfo">
                            <img src={contact.photo || defaultPhotoUrl} alt={`${contact.name} photo`} />
                            <p>{contact.name}</p>
                            <p>"{contact.phone}"</p>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(contact.id)}>Удалить</button>
                            <button className="cardBtn">
                                <NavLink className="cardLinks" to={`/${contact.id}/EditQuote`}>
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

export default Contacts;
