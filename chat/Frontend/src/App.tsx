import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [room, setRoom] = useState(7);
  const [socket, setSocket] = useState(undefined);
  const [inbox, setInbox] = useState(["Hi, baby", "How i U?"]);
  const [message, setMessage] = useState("");

  const handleMessage = () => {
    console.log("message", message, room);
    socket.emit("message", message, room);
  };

  useEffect(() => {
    const socket = io("http://localhost:3003/");
    socket.on("message", (message) => {
      setInbox([...inbox, message]);
    });

    setSocket(socket);
  }, [inbox]);

  return (
    <>
      <ul>
        {inbox &&
          inbox.map((item, i) => {
            return (
              <li key={i} style={{ listStyle: "none" }}>
                {item}
              </li>
            );
          })}
      </ul>
      <input
        type="Enter Aysun's message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <br />
      <button onClick={handleMessage}>Send</button>
      <h2>Room number: {room}</h2>
    </>
  );
}

export default App;
