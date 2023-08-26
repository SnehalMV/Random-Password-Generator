import { useSelector } from "react-redux"
import Checkbox from "./components/Checkbox"
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { updateList } from "./utils/passwordSlice"

const App = () => {
  const [password, setPassword] = useState({
    length: 8,
    capitalLetters: false,
    smallLetters: false,
    numbers: false,
    symbols: false,
  })
  const [isCopied, setIsCopied] = useState(false)
  const [handleText, setHandleText] = useState('')
  const [length, setLength] = useState(8)
  const dispatch = useDispatch()
  const passwordList = useSelector(store => store.passwordList?.list || [])
  const [passwords, setPasswords] = useState(passwordList)


  const handleChangeCapital = () => {
    setPassword({
      ...password,
      capitalLetters: !password.capitalLetters
    })
  }
  const handleChangeSmall = () => {
    setPassword({
      ...password,
      smallLetters: !password.smallLetters
    })
  }
  const handleChangeNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers
    })
  }
  const handleChangeSymbols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols
    })

  }
  const handleChangeLength = (val) => {
    setLength(val)
    if (val > 15) {
      val = 15
      setLength(15)
    } else if (val < 8 && val !== 1) {
      val = 8
      setLength(8)
    }
    setPassword({
      ...password,
      length: val
    })
  }
  const handleCopy = (value) => {
    if (value.length > 0) {
      navigator.clipboard.writeText(value)
      setIsCopied(true)
    }

    setTimeout(() => {
      setIsCopied(false)
    }, 4000)
  }

  const generatePassword = () => {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')']
    const capitalLettersArray = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index, 97 + index)).map(item => item[0]);
    const smallLettersArray = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index, 97 + index)).map(item => item[1]);

    const { length, capitalLetters, smallLetters, numbers, symbols } = password
    const generateThePassword = (length, capitalLetters, smallLetters, numbers, symbols) => {
      const availableCharacters = [
        ...(capitalLetters ? capitalLettersArray : []),
        ...(smallLetters ? smallLettersArray : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : [])
      ]

      if (availableCharacters.length === 0) {
        alert("No criteria chosen")
        return
      }

      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)
      const generatedText = shuffleArray(availableCharacters).slice(0, length).join('')
      setHandleText(generatedText)

      const updatedList = [...passwordList, generatedText]
      dispatch(updateList(updatedList))
      console.log(passwordList);
      setPasswords(passwordList)

    }
    generateThePassword(length, capitalLetters, smallLetters, numbers, symbols)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mt-20 w-auto h-auto bg-white p-5">
          <section className="flex flex-1 justify-center items-center p-5">
            <div>
              <div className='flex justify-between items-center'>
                <input className='border-2 border-neutral-300 p-2 w-64 text-xs font-handjet' type="text" value={handleText} readOnly />
                <button className="text-xs p-2 border-2 border-neutral-300 bg-neutral-300 font-handjet hover:bg-neutral-400 hover:border-neutral-400 active:text-white active:duration-400" onClick={() => handleCopy(handleText)}>{isCopied ? 'Copied!' : 'Copy Text'}</button>
              </div>
              <div className="flex justify-between p-1 py-2 items-center">
                <label className="text-xs font-handjet">Length (min:8, max:15)</label>
                <input type="number" min={8} max={15} value={length} onChange={(e) => handleChangeLength(e.target.valueAsNumber)} className="p-1 border-2 border-neutral-300 font-handjet text-xs" />
              </div>
              <div className="flex justify-between p-1 py-2">
                <label className="text-xs font-handjet">Include Capital Letters</label>
                <Checkbox value={password.capitalLetters} onChange={handleChangeCapital} />
              </div>
              <div className="flex justify-between p-1 py-2">
                <label className="text-xs font-handjet">Include Small Letters</label>
                <Checkbox value={password.smallLetters} onChange={handleChangeSmall} />

              </div>
              <div className="flex justify-between p-1 py-2">
                <label className="text-xs font-handjet">Include Numbers</label>
                <Checkbox value={password.numbers} onChange={handleChangeNumbers} />

              </div>
              <div className="flex justify-between p-1 py-2">
                <label className="text-xs font-handjet">Include Symbols</label>
                <Checkbox value={password.numbers} onChange={handleChangeSymbols} />

              </div>
              <div className="flex items-center justify-center mt-9">
                <button className="bg-green-400 w-72 text-sm p-3 rounded-md text-white hover:bg-green-500 active:bg-white active:border-green-500 active:border-1 active:text-green-500 duration-150" onClick={generatePassword}>
                  Generate Password
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      {
        passwords.length &&
        <div className="flex items-center justify-center">
          <div className="mt-5 w-auto h-auto bg-white p-5">
            <section>{
              passwords.slice(-5).map(item => {
                return (
                  <div className='flex justify-between items-center p-1' key={item}>
                    <input className='border-2 border-neutral-300 p-2 w-64 text-xs font-handjet' type="text" value={item} readOnly />
                    <button className="text-xs p-2 border-2 border-neutral-300 bg-neutral-300 font-handjet hover:bg-neutral-400 hover:border-neutral-400 active:text-white active:duration-400" onClick={() => handleCopy(item)}>{isCopied ? 'Copied!' : 'Copy Text'}</button>
                  </div>)
              })}
            </section>
          </div>
        </div>
      }

    </>
  )
}

export default App 