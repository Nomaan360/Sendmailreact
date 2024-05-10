import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [number, setNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [attachments, setAttachments] = useState([]);
  let subject = 'New Submission from your website';
  let reciever = 'nomaan@360core.inc';
  let sender = 'info@vitnixx.com';
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleAttachmentChange = (e) => {
    setAttachments(e.target.files); // Directly use the FileList

  };
    const sendEmail = async (e) => {
      e.preventDefault();


      const formData = new FormData();
      formData.append('sender', sender);
      formData.append('to', reciever);
      formData.append('subject', subject);
      formData.append('text', message);
      formData.append('uname', name);
      formData.append('unumber', number);
      formData.append('uemail', email);
      formData.append('uexperience', experience);
      for (let i = 0; i < attachments.length; i++) {
          formData.append('attachments', attachments[i], attachments[i].name);
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }      
   

      fetch('http://localhost:3001/send', {
        method: 'POST',
        body: formData  // Do not set Content-Type header, fetch handles it
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();  // Make sure the server response is indeed JSON
      })
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
    }

  
  return (
    <div className='container mx-auto'>
      <br/>
      <br/>
      <input type="text" className='form-control' placeholder='Enter name' value={name} onChange={handleNameChange} />
      <br/>
      <br/>
      <input type="email" className='form-control' placeholder='Enter email' value={email} onChange={handleEmailChange} />
      <br/>
      <br/>
      <input type="number" className='form-control' placeholder='Enter number' value={number} onChange={handleNumberChange} />
      <br/>
      <br/>
      <input type="number" className='form-control' placeholder='Years of Experience' value={experience} onChange={handleExperienceChange} />
      <br/>
      <br/>
      <textarea value={message} className='form-control' placeholder='Enter message' onChange={handleMessageChange} />
      <br/>
      <br/>
      <input type="file" className='form-control' multiple onChange={handleAttachmentChange} />
      <br/>
      <br/>
      <center>

      <button className='btn btn-outline-success' onClick={sendEmail}>Send Email</button>
      </center>
    </div>
  );
};


export default App;
