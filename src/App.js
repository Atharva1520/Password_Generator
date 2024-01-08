import {useCallback, useEffect, useState,useRef} from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numall,setnumall] = useState(false);
  const [charall,setcharall] = useState(false);
  const [pass,setpass] = useState("");

  const passwordref = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numall) str += "0123456789";
    if(charall) str += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      let charind = Math.floor(Math.random()*str.length+1);
      let char = str.charAt(charind);
      pass += char;
    }
    setpass(pass);
  },[length,numall,charall,setpass]);
  const copyPassword = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(pass);
  },[pass])

  useEffect(() => {passGenerator()} ,[length,numall,charall,passGenerator])
  return (
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-700">
    <div className="flex shadow-rounded-lg overflow-hidden mb-4">
      <input type="text"
        value={pass}
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        readOnly
        ref={passwordref}
      />
      <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPassword}>
       Copy
      </button>
    </div>
     <div className="flex text-sm gap-x-3">
      <div className="flex items-center gap-x-1">
        <input type="range" min={8} max={100} value={length} className="cursor-pointer" onChange={(e) => (setlength(e.target.value))} />
        <label htmlFor="">Length: {length} </label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={numall} id="numberInput" onChange={() => {setnumall((prev) => !prev)}}/>
        <label htmlFor="numberInput">Numbers</label>
        <input type="checkbox" defaultChecked={charall} id="CharInput" onChange={() => {setcharall((prev) => !prev)}}/>
        <label htmlFor="CharInput">Characters</label>
      </div>
     </div>
  </div>
  );
}

export default App;
