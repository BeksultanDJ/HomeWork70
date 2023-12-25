import './App.css'
import { Route, Routes } from "react-router-dom";
import NewContacts from "./components/NewContact.tsx";
import Toolbar from "./components/TollBar/ToolBar.tsx";
import EditContact from "./components/EditContactPage.tsx";
import Contacts from "./components/Home.tsx";

function App() {

  return (
    <>
        <div className="Header">
            <Toolbar/>
        </div>
      <div>
          <Routes>
              <Route path="/" element={<Contacts/>}/>
              <Route path="/NewContacts" element={<NewContacts />} />
              <Route path="/:id/EditContact" element={<EditContact/>} />
          </Routes>
      </div>
    </>
  )
}

export default App
