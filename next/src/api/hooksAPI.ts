"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import useSWR from 'swr'

const BASE_URL = "http://localhost:3002";

const schemaProdList = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    price: z.string(),
    photoUrl: z.string(),
    manufacturerId: z.number(),
  })
);

type TProducts = z.infer<typeof schemaProdList>

export const GetProducts = () => {
  const [products, setProducts] = useState<TProducts>()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    fetch(BASE_URL + "/products", {
      method: "GET",
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.length > 0) {
          const fetchedProdList = schemaProdList.parse(res);          
          setProducts(fetchedProdList);
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return products;
};
