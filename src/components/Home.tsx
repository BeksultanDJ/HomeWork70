import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

interface Contact {
    id: string;
    name: string;
    phone: number;
    email: string;
    photo: string;
}

const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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
            const updatedContacts = contacts.filter((contact) => contact.id !== id);
            setContacts(updatedContacts);
            setFilteredContacts(updatedContacts);
        } catch (error) {
            console.error('Ошибка при удалении контакта:', error);
        }
    };

    const defaultPhotoUrl = 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png';

    const openModal = (contact: Contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container">
            <div className="contact">
                {filteredContacts.map((contact) => (
                    <div className="contactCard" onClick={() => openModal(contact)} key={contact.id}>
                        <img src={contact.photo || defaultPhotoUrl} alt={`${contact.name} photo`} />
                        <p>{contact.name}</p>
                    </div>
                ))}
            </div>
            {showModal && selectedContact && (
                <div className="modal">
                    <div className="modalContent">
                        <span className="closeButton" onClick={closeModal}>&times;</span>
                        <div>
                            <img src={selectedContact.photo || defaultPhotoUrl} alt={`${selectedContact.name} photo`} />
                        </div>
                        <div>
                            <p>{selectedContact.name}</p>
                            <p>{selectedContact.phone}</p>
                            <p>{selectedContact.email}</p>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(selectedContact.id)}>Удалить</button>
                            <button className="cardBtn">
                                <NavLink className="cardLinks" to={`/${selectedContact.id}/EditContact`}>
                                    Edit Quote
                                </NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;
