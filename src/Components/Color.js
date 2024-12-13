import "./Taskcolor.css";
import{useRef}from "react";

function Color(){
    const value=useRef();
    const handleclick=()=>{
        const drop=document.getElementById("task").value;
        const down=document.getElementById("one");
        if(drop === "green"){
            value.current.innerHTML=down.style.backgroundColor='green';
        }
        if(drop === "red"){
            value.current.innerHTML=down.style.backgroundColor='red';
        }
        if(drop === "yellow"){
            value.current.innerHTML=down.style.backgroundColor='yellow';
        }
       
       
    }
        return(
        
            <div>
                  <center><label>
                    Choose a Color:<br></br><br></br>
                    <select id="task">
                      <option value="green">green</option>
                      <option value="red">red</option>
                      <option value="yellow">yellow</option>
                    </select>
                  </label><br></br><br></br><br></br>
                  <button onClick={handleclick}>SUBMIT</button><br></br><br></br>
                  <div class="square">
                    <div ref={value}class="circle"id="one">

                    </div>
                  </div>
                  </center>
                  </div>
                )

              }
              
export default Color;
        
        


