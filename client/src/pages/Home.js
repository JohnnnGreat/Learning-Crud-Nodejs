import React, { useState, useEffect } from "react";
import axios from "axios";
function Home() {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:5000/");
        const data = await response.data.result;
        setUsers(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, [user]);

  async function deleteUser(id) {
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:5000/${id}`);
      const data = await response.data.result;
      setUsers([...user, data]);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="home flex p-10 justify-center items-center h-screen fixed">
      <div className="wrapper ">
        <table>
          <thead className="bg-red-500 w-full">
            <tr className="border-b-2 border-gray-300 font-medium text-white flex justify-center bg-green-500 items-center w-400 ml-auto">
              <th className="font-bold p-4   ">ID</th>
              <th className="font-bold p-4 ">Name</th>
              <th className="font-bold p-4 ">Occupation</th>
              <th className="font-bold p-4 ">Salary</th>
              <th className="font-bold p-4  ">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => {
              return (
                <tr
                  className="border-b-2 border-gray-300 flex justify-center w-400 items-center "
                  key={user.id}
                >
                  <td className="font-thin p-4 border-r-2 border-gray-300 ">
                    {user.id}
                  </td>
                  <td className="font-thin p-4 border-r-2 border-gray-300">
                    {user.name}
                  </td>
                  <td className="font-thin p-4 border-r-2 border-gray-300 ">
                    {user.occupation}
                  </td>
                  <td className="font-thin p-4 border-r-2 border-gray-300 ">
                    {user.salary}
                  </td>
                  <td className="flex-0 bg-red-500 w-max h-full p-2">
                    <button
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                      className="text-white"
                    >
                      Deleted
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
