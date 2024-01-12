import { Input } from "@material-ui/core";
import { useState, useEffect } from "react";

function Test() {
  const [count, setCount] = useState();
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  const handleChange = event => {
    setCount(event.target.value);}

    function showValue(){
var test = document.getElementById('test');
test.innerHTML=count;
    } 
  return (
    <>
      <p>Count: </p>
      <Input type='text' onChange={handleChange}/>
      <button onClick={showValue}>Show</button>
      <p id='test'>Calculation: </p>
    </>
  );
}

export default Test;