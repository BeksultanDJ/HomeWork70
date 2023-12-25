import './App.css'
import { Route, Routes } from "react-router-dom";
import Quotes from "./components/Home.tsx";
import NewQuotes from "./components/NewQuotes.tsx";
import Toolbar from "./components/TollBar/ToolBar.tsx";
import CategoryQuotes from "./components/CetegoryQuotes.tsx";
import EditQuote from "./components/EditQuotePage.tsx";

function App() {

  return (
    <>
        <div className="Header">
            <Toolbar/>
        </div>
      <div>
          <Routes>
              <Route path="/category/:categoryId" element={<CategoryQuotes/>}/>
              <Route path="/" element={<Quotes/>}/>
              <Route path="/NewQuotes" element={<NewQuotes />} />
              <Route path="/:id/EditQuote" element={<EditQuote/>} />
          </Routes>
      </div>
    </>
  )
}

export default App
