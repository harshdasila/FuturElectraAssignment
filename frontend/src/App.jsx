import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Card2 from './components/Card2';


function App() {
  const [inputName, setinputName] = useState("");
  const [req1Data,setReq1Data] = useState();
  const [req2Data,setReq2Data] = useState();
  const [formData,setFormData] = useState({
    bookName: '',
    isbn: '',
    authors: '',
    country: '',
    numberOfPages: '',
    publishers: '',
    releaseDate: ''
  });
  console.log(req2Data,"2")
  function handleFormChange(e){
    const {bookName,isbn,authors,country,numberOfPages,publishers,releaseDate} = e.target;
    setFormData({...formData,[e.target.name]: e.target.value,})
  }

  async function handleFormSubmit(e){
    e.preventDefault();
    console.log(formData,"ye")
    const data = await fetch('http://localhost:8080/api/v1/books',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    const res = await data.json();
    setReq2Data(res);
  }

  async function handleSubmit1() {
    const data = await fetch(`http://localhost:8080/api/external-books?name=${inputName}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const res = await data.json();
    setReq1Data(res);
  };

  return (
    <div>
      <div className='flex m-4'>
        <h1 className='text-3xl font-semibold mr-80'>Requirement 1 - </h1>
        <input
          className="p-2  border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 text-sm"
          type="text"
          placeholder="Book Name"
          value={inputName}
          onChange={(e) => setinputName(e.target.value)}/>
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 text-sm"
          onClick={handleSubmit1}>
          Submit
        </button>
      </div>
      <div className='m-2 p-2'>
        {req1Data && <Card res = {req1Data}/>}
      </div>
      <div className='m-4'>
        <h1 className='text-3xl font-semibold mr-3'>Requirement 2 - </h1>
      <form className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow-md" onSubmit={handleFormSubmit}>
          <div className="mb-4">

            <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              name="bookName"
              value={FormData.bookName}
              onChange={handleFormChange}
            />
          </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">ISBN</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="isbn"
          value={FormData.isbn}
          onChange={handleFormChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Authors</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="authors"
          value={FormData.authors}
          onChange={handleFormChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="country"
          value={FormData.country}
          onChange={handleFormChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Number of Pages</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="number"
          name="numberOfPages"
          value={FormData.numberOfPages}
          onChange={handleFormChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Publishers</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="publishers"
          value={FormData.publishers}
          onChange={handleFormChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Release Date</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="releaseDate"
          value={FormData.releaseDate}
          onChange={handleFormChange}
        />
      </div>

    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      type="submit" >
      SUBMIT
    </button>
      </form>
      <div className='m-2 p-2'>
        {req2Data && <Card2 res = {req2Data}/>}
      </div>

    </div>
    
    </div>
  );
}

export default App;
