"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const Products = (props: Props) => {
  const [data, setData] = useState([]);
  const getDataMongo = () => {
    axios.get("http://localhost:3000/api/products").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getDataMongo();
  }, []);

  return (
    <>
      <h1>Products:</h1>
      {data &&
        data.map((item, i) => {
          return <h2 key={i}>{item.title}</h2>;
        })}
    </>
  );
};

export default Products;
