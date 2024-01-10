"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "../firebase/config";
type Props = {};
interface Fire {
  id: string;
  name: string;
  password: string;
}

const Users = (props: Props) => {
  const [firestoreData, setFirestoreData] = useState([]);

  const getDataFirestore = async () => {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "users"));

    let arr: Fire[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      let obj: Fire = {
        id: doc.id,
        name: doc.data().name,
        password: doc.data().password,
      };
      arr.push(obj);
    });
    setFirestoreData(arr);
  };

  useEffect(() => {
    getDataFirestore();
  }, []);

  const addData = async () => {
    const db = getFirestore(app);
    const data = {
      name: "Aide",
      password: "aide",
    };
    const newCityRef = doc(collection(db, "users"));
    await setDoc(newCityRef, data);
  };

  const deleteData = async () => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, "users", "HjkBDnkHt5iS7eYA7rUK"));
  };
  return (
    <>
      <h1>Users</h1>
      {firestoreData &&
        firestoreData.map((item: Fire) => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
              <span>{item.password}</span>
            </div>
          );
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

export default Users;
