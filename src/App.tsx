import './App.css'
import { Route, Routes } from "react-router-dom";
import NewContacts from "./components/NewQuotes.tsx";
import Toolbar from "./components/TollBar/ToolBar.tsx";
import EditQuote from "./components/EditQuotePage.tsx";
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
              <Route path="/:id/EditQuote" element={<EditQuote/>} />
          </Routes>
      </div>
    </>
  )
}

export default App
