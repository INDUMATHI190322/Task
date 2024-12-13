import { useState } from "react";

const Dependentdropdown = () => {
  const [Main, setMain] = useState("");
  const [Choice, setChoice] = useState("");

  const handleChange = (e) => {
    setMain(e.target.value);
    setChoice("");
  };

  return (
    <div>
        <select onChange={handleChange} value={Main}>
        <option value="">Select your choice</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
    
      </select>
      <select value={Choice} disabled={Main === ""}>
        <option>List</option>
        {Main === "Fruits" && (
          <>
          <option key="Apple">Apple</option>
          <option Key="Mango">Mango</option>
          <option key="Orange">Orange</option>
          <option key="Kiwi">Kiwi</option>
          <option key="Guaua">Guaua</option>
          </>
        )}
        {Main === "Vegetables" && (
          <>
          <option key="Onion">Onion</option>
          <option key="Tomato">Tomato</option>
          <option key="Potato">Potato</option>
          <option key="Brinjal">Brinjal</option>
          <option key="Chilli">Chilli</option>
          </>
        )}
        
      </select>
    </div>
  );
};
export default Dependentdropdown;
    