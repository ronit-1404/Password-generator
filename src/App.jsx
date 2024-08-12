import { useState, useCallback, useEffect } from 'react';
import './index.css';

function App() {
  
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState(""); 

  const passgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) {
      str += "0123456789";
    }
    if (charallowed) {
      str += "!@#$%^&*(){}[]<>?/`~";
    }
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }
    
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  useEffect(() => {
    passgenerator()
  },[length, numberallowed, charallowed, passgenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3 bg-gray-800 text-white'
            placeholder='password'
            readOnly
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy
          </button>
        </div>
        
        <div className='flex text-sm gap-x-2 mb-4'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={100}
              value={length} 
              className='cursor-pointer'
              onChange={(e) => setlength(parseInt(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              checked={numberallowed}
              id="numberInput"
              onChange={() => setnumberallowed((prev) => !prev)} 
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              checked={charallowed}
              id="charInput"
              onChange={() => setcharallowed((prev) => !prev)} 
            />
            <label htmlFor="charInput">Special Characters</label>
          </div>
        </div>

        <button 
          className='bg-blue-600 text-white py-2 px-4 rounded-lg w-full'
          onClick={passgenerator}
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
