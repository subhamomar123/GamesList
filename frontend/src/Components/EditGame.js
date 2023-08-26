import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditGame = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [date, setDate] = useState("");
    const [id, setId] = useState("");
    useEffect(() =>{
        setName(localStorage.getItem("Name"));
        setAuthor(localStorage.getItem("Author"));
        setUrl(localStorage.getItem("Url"));
        setDate(localStorage.getItem("Date"));
        setId(localStorage.getItem("id"));

    },[])
    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedGame = { "Name": name, "Author": author, "Url": url, Date: date };

        fetch(`http://localhost:4000/games/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedGame),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Game updated successfully');
                    navigate('/');
                } else {
                    console.error('Failed to update game');
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    }

    return (
        <div>
            <h2>Edit Game</h2>
            <form className='m-3'>
                <div className="form-group mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Please enter name of your game here" onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
                <div className="form-group mb-3">
                    <label >Author</label>
                    <input type="text" className="form-control" placeholder="Please enter name of your Author here" onChange={(e) => setAuthor(e.target.value)} value={author}/>
                </div>
                <div className="form-group mb-3">
                    <label>URL</label>
                    <input type="url" className="form-control" placeholder="Please enter URL of your game here" onChange={(e) => setAuthor(e.target.value)} value={url}/>
                </div>
                <div className="form-group mb-3">
                    <label >Date</label>
                    <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date}/>
                </div>
                <button type="update" className="btn btn-primary" onClick={handleUpdate}>Update</button>
            </form>
        </div >
    )
}

export default EditGame;