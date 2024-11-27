import React, { useState } from "react";
import Discount from "./components/Discount/Discount";



function App() {
  const [count, setCount] = useState(0)

  return (
    <Discount />
  );
}

export default App
