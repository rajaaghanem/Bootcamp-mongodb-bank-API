// import './App.css';
import myApi from "./api/Api";

function App() {
  const getReq = async () => {
    const { data } = await myApi.get("/products");
    console.log(data);
  };

  return (
    <div className="App">
      {" "}
      Hello World!
      <button onClick={getReq}>get</button>
    </div>
  );
}

export default App;
