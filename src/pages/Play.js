import { useState, useEffect, useRef } from "react";
import "../App.css";
import React from "react";

const Play = () => {
  const [userNum, setUserNum] = useState("");
  const [randomNum, setRandomNum] = useState(0);
  const [less, setLess] = useState("");
  const [msg, setMsg] = useState("");
  const [src, setSrc] = useState(
    "https://media.giphy.com/media/PKxsxsl3aOH1ihZ3Um/giphy.gif"
  );
  const [gameOver, setGameOver] = useState(false);
  const [chance, setChance] = useState(5);
  const [history, setHistory] = useState([]);
  const [dup, setDup] = useState("");
  const focusInput = useRef();
  const makeFocus = () => (focusInput.current.value = "");
 
  // get Random Number
  const makeRandom = () => {
    let random = Math.floor(Math.random() * 100) + 1;
    setRandomNum(random);
  };
console.log(randomNum)
  useEffect(() => {
    makeRandom();
  }, []);

  // InputValue
  const handleChange = (e) => {
    setUserNum(e.target.value);
  };
  // Submit Button

  const submitBtn = (evt) => {
    evt.preventDefault();

    //  Order

    if (userNum > 100) {
      setSrc("https://media.giphy.com/media/XJzinpzkMZZo8KcSP5/giphy.gif");
      setMsg("Please Choose Less Than 101");
    } else if (history.includes(userNum.toString())) {
      setSrc("https://media.giphy.com/media/XJzinpzkMZZo8KcSP5/giphy.gif");
      setMsg("You already have tried this number!!");
    } else if (chance <= 1) {
      setChance(chance - 1);
      setSrc("https://media.giphy.com/media/FgjKGypLCAety/giphy.gif");
      setGameOver(true);
    } else if (randomNum > userNum) {
      setChance(chance - 1);
      setSrc("https://media.giphy.com/media/3625U4ote7MTAaGi9n/giphy.gif");
      setMsg("up");
    } else if (randomNum < userNum) {
      setChance(chance - 1);
      setSrc("https://media.giphy.com/media/jOnrjNTgv0RnU8bG80/giphy.gif");
      setMsg("down!");
    } else {
      setMsg("winner");
      setSrc("https://media.giphy.com/media/3o72FcJmLzIdYJdmDe/giphy.gif");
      setGameOver(true);
    
    }

    history.push(userNum.toString());
  };

  // Reset Button
  const reset = () => {
    setUserNum("");
    setRandomNum("");
    setLess("");
    setMsg("");
    setGameOver(false);
    setChance(5);
    setHistory([]);
    setSrc("");
 setSrc("https://media.giphy.com/media/PKxsxsl3aOH1ihZ3Um/giphy.gif");
  };

 
  return (
    <div className="Play">
      <h2>remaining chance:{chance}</h2>
      <img src={src} />

      <h2>{msg}</h2>

      <form className="Play-form" onSubmit={submitBtn}>
        <input
          className="Play-input"
          type="number"
          onChange={handleChange}
          ref={focusInput}
        />
        {gameOver !== true ? (
          <button className="Play-submit" onClick={makeFocus}>
            Go
          </button>
        ) : (
          ""
        )}
      </form>
      <button className="Play-reset" onClick={reset}>
        Reset
      </button>
      <p>*5번의 기회안에 1부터100까지 번호중 정답을 맞춰주세요!!*</p>
      <p>
        *you can guess the correct number between 1 and 100 in five attempts.*{" "}
      </p>
    </div>
  );
};

export default Play;
