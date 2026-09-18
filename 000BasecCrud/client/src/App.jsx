import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://10.226.103.114:5000/');
      // console.log(res.data);
    };
    getData();
  }, []);

  const [name, setName] = useState('');
  const [userName, setuserName] = useState('');
  const handleChange = (e) => {
    setName(e.target.value)
  }
  const submitHandeler = async (e) => {
    e.preventDefault()
    
    try {
      const formData = new FormData(e.target)
      console.log(formData.get('name'))
      const res = await axios.post('http://10.226.103.114:5000/', { 
        formData: "data" 
      });

      // const res =  await fetch('http://10.226.103.114:5000/',{method:"POST",headers: { 'Content-Type': 'application/json' },body:JSON.stringify({"name":name})})
      const { data } = res;
      console.log("Response:", res.data);
      // const data = await res.json();
      console.log(`res = Data is ${data}`)
      setuserName("data")
    }
    catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <h1>Hi </h1>
      <h1>{userName}</h1>
      <form onSubmit={(e) => { submitHandeler(e) }}>
        <input onChange={(e) => { handleChange(e) }} value={name} type="text" name="name" id="text" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;