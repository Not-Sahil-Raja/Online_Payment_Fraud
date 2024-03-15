import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [type, setType] = useState(1);
  const [amount, setAmount] = useState(0);
  const [oldbalanceOrg, setOldbalanceOrg] = useState(0);
  const [newbalanceOrig, setNewbalanceOrig] = useState(0);

  const [chckStatus, setChckStatus] = useState(null);

  // console.log(type);
  // features=[type,amount,oldbalanceOrg,newbalanceOrig]
  const formHandler = (e) => {
    e.preventDefault();
    const sending = {
      data: {
        type: type,
        amount: parseInt(amount),
        oldbalanceOrg: parseInt(oldbalanceOrg),
        newbalanceOrig: parseInt(newbalanceOrig),
      },
    };
    axios
      .post("http://127.0.0.1:5000/demo/singleData/predict_api", sending)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(sending);
  };

  const chckWorking = () => {
    axios.get("http://127.0.0.1:5000/api/check").then((response) => {
      setChckStatus(response.data.message);
    });
  };
  // console.log(chckStatus);
  return (
    <>
      <h1>App</h1>
      <h2>Check Status: {chckStatus ? chckStatus : "Unknown Server data"}</h2>
      <button onClick={chckWorking}>Check Status</button>
      <form onSubmit={formHandler}>
        <label htmlFor="type">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
        </select>

        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="oldbalanceOrg">Old Balance Org</label>
        <input
          type="number"
          value={oldbalanceOrg}
          onChange={(e) => setOldbalanceOrg(e.target.value)}
        />

        <label htmlFor="newbalanceOrig">New Balance Orig</label>
        <input
          type="number"
          value={newbalanceOrig}
          onChange={(e) => setNewbalanceOrig(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;
