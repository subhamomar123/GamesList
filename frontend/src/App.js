import React from 'react'
import EditGame from './Components/EditGame'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GameList from './Components/GameList'
import AddGame from './Components/AddGame'

import "./App.css"

const App = () => {
    return (
        <div className='container'>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<GameList />}></Route>
                    <Route exact path="/edit" element={<EditGame />}></Route>
                    <Route exact path="/add" element={<AddGame />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;