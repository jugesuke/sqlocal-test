import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { initDB } from "./database/init";
import type { Kysely } from "kysely";
import type { Schema } from "./database/schema";

function DbControl() {
  const [groceries, setGroceries] = useState<
    {
      id: number;
      name: string;
      quantity: number;
    }[]
  >([]);

  const [db, setDb] = useState<Kysely<Schema> | null>(null);

  useEffect(() => {
    (async () => {
      if (!db) {
        const db = await initDB();
        setDb(db);
      }
    })();
    console.log("Database initialized");
  }, []);

  const insOnClick = async () => {
    if (!db) {
      console.error("Database not initialized");
      return;
    }

    const itemList = [
      "Apple",
      "Banana",
      "Orange",
      "Grapes",
      "Mango",
      "Pineapple",
      "Strawberry",
      "Blueberry",
      "Watermelon",
      "Peach",
    ];

    db.insertInto("groceries")
      .values({
        name: itemList[Math.floor(Math.random() * itemList.length)],
        quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
      })
      .execute();
  };

  const selOnClick = async () => {
    if (!db) {
      console.error("Database not initialized");
      return;
    }
    const res = await db.selectFrom("groceries").selectAll().execute();
    setGroceries(res);
  };

  const updOnClick = async () => {
    if (!db) {
      console.error("Database not initialized");
      return;
    }

    // increment quantity of all groceries by 1
    db.updateTable("groceries")
      .set((eb) => ({
        quantity: eb("quantity", "+", 1),
      }))
      .execute();
  };

  const delOnClick = async () => {
    if (!db) {
      console.error("Database not initialized");
      return;
    }
    db.deleteFrom("groceries").execute();
  };

  return (
    <div className="card">
      <button onClick={insOnClick}>insert</button> {/* Create */}
      <button onClick={selOnClick}>select</button> {/* Read */}
      <button onClick={updOnClick}>update</button> {/* Update */}
      <button onClick={delOnClick}>delete</button> {/* Delete */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {groceries.map((grocery) => (
            <tr key={grocery.id}>
              <td>{grocery.id}</td>
              <td>{grocery.name}</td>
              <td>{grocery.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + SQLocal</h1>
      <DbControl />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
