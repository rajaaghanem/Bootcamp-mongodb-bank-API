// import './App.css';
import myApi from "./api/Api";

function App() {
  const getReq = async () => {
    const { data } = await myApi.get("/users");
    console.log(data);
  };

  // const postReq = async () => {
  //   let obj = {
  //     name: "red hat",
  //     category: "hats",
  //     isActive: true,
  //       details: {
  //         description: "nice stylish yellow hat ",
  //         Price: 30,
  //         discount: 0,
  //         array: ["hat", "yellow"],
  //         phone: "0526879443"
  //       }
  //     }
    // obj= JSON.stringify(obj)
  //   const { data } = await myApi.post("/products", obj);
  //   console.log(data);
  // };

  return (
    <div className="App">
      {" "}
      Hello World!
      <button onClick={getReq}>get</button>
      {/* <button onClick={postReq}>post</button> */}
    </div>
  );
}

export default App;
