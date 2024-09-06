import React ,  { useState , useEffect , useRef , useCallback} from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberallowed , setnumberallowed] = useState(false) 
  const [charallowed , setcharallowed] = useState(false)

  const [password , setpassword] = useState("") 


  const passwordref = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "" 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(numberallowed) str += "0123456789" 

    if(charallowed) str += "!@#$%^&*()[]{}~`+-="



    for(let i=1;i<=length;i++){
        let char = Math.floor(Math.random() * str.length + 1) 
        pass += str.charAt(char)
    }
   
     setpassword(pass) 

    } , [length , numberallowed , charallowed , setpassword ])

 

  const copyPasswordtoclip = useCallback(()=>{
    passwordref.current?.select() ;
    passwordref.current?.setSelectionRange(0,20) ; 
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(()=>{
      passwordGenerator() 
  },[length , numberallowed , charallowed, passwordGenerator])

  
  return (
    <>
      <div className='w-full max-w-md mx-auto  h-[120px] shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white my-3 text-center mb-2'>Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordref}/>
          <button onClick={copyPasswordtoclip}  className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

        </div>
        <div className='flex text-sm gap-x-2 '>
              <div className='flex items-center gap-x-1'>
                <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setlength(e.target.value)} }/>
                <label >Length:{length}</label>
              </div>

              <div className='flex gap-3'>
                  <div className='flex  items-center gap-x-1'>
                    <input type="checkbox" defaultChecked={numberallowed} id='numberinput' onChange={() => {
                      setnumberallowed((prev) => !prev)
                    }}
                   />
                   <label htmlFor="numberInput">Number</label>
                  </div>
                    <div className='flex items-center gap-x-1'>
                      <input type="checkbox" defaultChecked={charallowed} id='characterInput' onChange={()=>{
                        setcharallowed((prev)=>!prev) ; 
                      }} />
                      <label htmlFor="characterInput">Characters</label>
                    </div>

              </div>
        </div>
      </div>
    </>
  )
}

export default App
