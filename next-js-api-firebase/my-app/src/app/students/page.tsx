"use client";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";

import app from "../firebase/config";
type Props = {};

const Students = (props: Props) => {
  const [sudentData, setStudentData] = useState([]);

  const getRealTimeData = async () => {
    const db = getDatabase(app);
    const studentRef = ref(db, "users/students");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setStudentData(data);
    });
  };

  useEffect(() => {
    getRealTimeData();
  }, []);

  const deleteData = async () => {
    const db = getDatabase(app);
    remove(ref(db, "users/students/" + 4));
  };

  const addData = async () => {
    const db = getDatabase(app);
    set(ref(db, "users/students/" + 4), {
      name: "Samaya",
      id: 4,
    });
  };

  return (
    <>
      <h1>Friends:</h1>
      {sudentData &&
        sudentData.map((item) => {
          return <p key={item.id}>{item.name}</p>;
        })}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addData}
      >
        Add
      </button>
      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={deleteData}
      >
        Delete
      </button>
    </>
  );
};

export default Students;
