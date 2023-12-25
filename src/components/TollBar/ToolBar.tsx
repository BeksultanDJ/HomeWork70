import React from "react";
import {NavLink} from "react-router-dom";


const Toolbar: React.FC = () => {

    return (
        <>
            <header>
                <div className="container">
                    <div className="header-top">
                        <strong>Contacts</strong>
                        <nav>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="navLinks" to="/NewContacts">Add new contact</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Toolbar;