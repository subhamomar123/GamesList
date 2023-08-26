import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditGame = () => {

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedGame = { "Name": name, "Author": author, "Url": url, Date: date };
        console.log(updatedGame)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/games`, {
            method: 'POST',
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
        <div className='mt-5'>
            <div className="container text-center pt-4 pb-4 bg-dark rounded mb-4">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <h2 className='text-white'>Add Game</h2>
                    </div>
                </div>
            </div>
            <form className='m-3'>
                <div className="form-group mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Please enter name of your game here" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label >Author</label>
                    <input type="text" className="form-control" placeholder="Please enter name of your Author here" onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>URL</label>
                    <input type="text" className="form-control" placeholder="Please enter URL of your game here" onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label >Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date ? new Date(date).toISOString().split('T')[0] : ''}
                        onChange={(e) => {
                            const selectedDate = new Date(e.target.value + "T00:00:00.000Z");
                            setDate(selectedDate.toISOString());
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div >
    )
}

export default EditGame;