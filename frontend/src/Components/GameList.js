import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const GameList = () => {
    const [gameData, setGameData] = useState([]);
    const navigate = useNavigate();

    async function fetchGames() {
        try {
            const response = await fetch('http://localhost:4000/games');
            if (response.ok) {
                const data = await response.json();
                // console.log(data)
                setGameData(data.games);
            } else {
                console.error('Failed to fetch games');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    useEffect(() => {
        fetchGames();
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:4000/games/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    fetchGames();
                } else {
                    console.error(`Failed to delete game with ID ${id}`);
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    }

    function addGame() {
        navigate('/add');
    }

    function setToLocalStorage(game) {
        console.log(game)
        localStorage.setItem("id",game._id);
        localStorage.setItem("Name",game.Name);
        localStorage.setItem("Author",game.Author);
        localStorage.setItem("Date",game.Date);
        localStorage.setItem("Url",game.Url);

    }
    return (
        <div>
            <h2 className="d-flex justify-content-between">
                Game Table
                <button type="button" className="btn btn-secondary btn-sm" onClick={addGame}>Add Game</button>
            </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">S. No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Url</th>
                        <th scope="col">Author</th>
                        <th scope="col">Date</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gameData.map((game, count) => {

                            count++;
                            return (
                                <tr key={game._id}>
                                    <th scope="row">{count}</th>
                                    <td>{game.Name}</td>
                                    <td>{game.Url}</td>
                                    <td>{game.Author}</td>
                                    <td>{new Date(game.Date).toISOString().split('T')[0]}</td>
                                    <td>
                                        <Link to='/edit'>
                                            <button type="button" className="btn btn-primary btn-sm btn-success" onClick={() => setToLocalStorage(game)}>Edit</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-secondary btn-sm btn-danger" onClick={() => handleDelete(game._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default GameList;