import { useState, useEffect } from "react";
import axios from "axios";
function AddUser() {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [salary, setSalary] = useState("");
  const [alert, setAlert] = useState("");

  async function formHandler(e) {
    e.preventDefault();
    console.log(name, occupation, salary);

    try {
      const response = await axios.post("http://localhost:5000", {
        name: name,
        occupation: occupation,
        salary: salary,
      });
      const data = await response.data.message;
      setAlert(data);
      console.log(data);
    } catch (e) {
      console.log(e.response.data.message);
      setAlert(e.response.data.message);
    }
  }

  function handleName(e) {
    setName(e.target.value);
  }
  function handleOccupation(e) {
    setOccupation(e.target.value);
  }

  function handleSalary(e) {
    setSalary(e.target.value);
  }
  return (
    <div className="add-user flex justify-center items-center flex-col h-screen">
      <p className="p-3">{alert}</p>
      <div className="wrapper bg-green-400 p-4 w-96 rounded-xl">
        <form onSubmit={formHandler} className="p-3 flex flex-col" action="">
          <input
            className="p-3 bg-transparent mb-4 border-b-2 outline-none text-white"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={handleName}
          />
          <input
            className="p-3 bg-transparent mb-4 border-b-2 outline-none text-white"
            type="text"
            placeholder="Occupation"
            value={occupation}
            onChange={handleOccupation}
          />
          <input
            className="p-3 bg-transparent mb-4 border-b-2 outline-none text-white"
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={handleSalary}
          />

          <button type="submit" className="p-2.5 w-full bg-white rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
