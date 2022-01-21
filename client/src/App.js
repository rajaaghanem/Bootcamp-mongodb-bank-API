// import './App.css';
import myApi from "./api/Api";

function App() {
  //get all users
  const getReq = async () => {
    const { data } = await myApi.get("/users");
    console.log(data);
  };

  const postReq = async () => {
    let obj = {
      passID: "1213",
      cash: 1000,
      credit: 200,
    };
    const { data } = await myApi.post("/users", obj);
    console.log(data);
  };

  return (
    <div className="App">
      {" "}
      Hello World!
      <button onClick={getReq}>get</button>
      <button onClick={postReq}>add user</button>
    </div>
  );
}

export default App;
