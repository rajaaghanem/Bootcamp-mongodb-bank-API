import './App.css';
import myApi from "./api/Api";
import React, { useState } from "react";


function App() {

  const [userId, setUserId] = useState("");
  const [passportId, setPassportId] = useState("");
  const [amount, setAmount] = useState("");
  const [transfer, setTransfer] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  //get all users
  const getReq = async () => {
    setUsers([]);
    setError("");
    try{
      const { data } = await myApi.get("/users");
      setUsers(data);
      console.log(data);
    }catch(e){
      setError(e.message);
      console.log(error);
    }
  };

  const handleId =(e)=>{
    setUserId(e.target.value);
  }

  const handlePassport=(e)=>{
    setPassportId(e.target.value);
  }

  const handleAmount=(e)=>{
    setAmount(e.target.value);
  }

  const  handleTransfer=(e)=>{
    setTransfer(e.target.value);
  }

  const postReq = async () => {
    setUsers([]);
    setError("");
    let obj = {
      passID: passportId,
      cash: Number(amount) || 0,
      credit: 0,
    };
    try{
      if (!passportId || !amount) {
        throw new Error("One field or more are missing");
      }
      const { data } = await myApi.post("/users", obj);
      setUsers([data]);
      console.log(data);

    }catch(e){
      setError(e.message);
      console.log(error);
    }
  };

  // deposit cash to a user
  const postDepositeReq = async ()=>{
    setUsers([]);
    setError("");
    const obj ={
      amount: Number(amount)
    }
    try{
      if(!userId) throw new Error("Must Enter an id");
      const { data } = await myApi.patch(`/users/deposite/${userId}`, obj);
      setUsers([data]);
      console.log(data);
    }catch(e){
      setError(e.message);
      console.log(error);
    }
  }

  //add credit amount to the user credit
  const postCreditReq = async ()=>{
    setUsers([]);
    setError("");
    const obj ={
      amount: Number(amount)
    }
    try{
      if(!amount) throw new Error("Amount of money is missing");
      const { data } = await myApi.patch(`/users/credit/${userId}`, obj);
      setUsers([data]);
      console.log(data);
    }catch(e){
      setError(e.message);
      console.log(error);
    }
  }

  const postWithdrawReq = async ()=>{
    setUsers([]);
    setError("");
    const obj ={
      amount: Number(amount)
    }
    try{
      if(!amount) throw new Error("Amount of money is missing");
      const { data } = await myApi.patch(`/users/withdraw/${userId}`, obj);
      setUsers([data]);
      console.log(data);
    }catch(e){
      setError(e.message);
      console.log(error);
    }
  }


   const postTransferReq = async ()=>{
    setUsers([]);
    setError("");
     const obj = {
       amount:  Number(amount),
       id: transfer,
     }
    try{
      if(!amount || !transfer) throw new Error("One field or more are missing")
      const { data } = await myApi.patch(`/users/transfer/${userId}`, obj);
      setUsers(data);
      console.log(data);

    }catch(e){
      setError(e.message);
      console.log(error);
    }
  }

  const showUsers=()=>{
    return users.map ((user)=>{
      return (<div  className = "card-container" key={user.passID}>{`passport id: ${user.passID} cash: ${user.cash} credit: ${user.credit}`}</div>)
    })
  }

  return (
    <div className="app-container">
      <div className="inputs-container">
     <div><label>User id: </label><input onChange={handleId} value={userId}></input></div> 
      <div><label>user passport id: </label><input onChange={handlePassport} value={passportId}></input></div>
      <div><label>amount of money: </label><input  onChange={handleAmount} value={amount}></input></div>
      <div><label>client to transfer: </label><input onChange={handleTransfer} value={transfer}></input></div>
      </div>
      
      <div className="buttons-container">
      <div><button onClick={getReq}>get all users</button></div>
      <div><button >get user</button></div>
      <div><button onClick={postReq}>add user</button></div>
      <div><button onClick={postDepositeReq}>deposite cash</button></div>
      <div><button onClick={postCreditReq}>update credit</button></div>
      <div><button onClick={postWithdrawReq}>withdraw money</button></div>
      <div><button onClick={postTransferReq}>transfer money</button></div>
      </div>
      
      <div className='cards-container'>{showUsers()}</div>
      {error}
      
    </div>
  );
}

export default App;
