import React, { useEffect, useState } from "react";
import styles from "@/styles/Chat.module.css";
import { useSocket } from "@/Context/SocketContext";

function Chat() {
  const socket = useSocket();

  //   out outgoing message
  const [outGoingMessage, setOutGoingMessage] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Message recieved is : " + data);
      //   <div className={`${styles.message} ${styles.response}`}>hi</div>
      const newElement = document.createElement("div");
      newElement.classList.add(styles.message, styles.joke);
      newElement.innerText = data;
      console.log("we need this");
      console.log(typeof newElement);

      const existingElement = document.getElementById("chat");
      existingElement.insertAdjacentElement("beforeend", newElement);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  //   useEffect(() => {

  //     sendMessageToServer();
  //   }, []);

  const sendMessageToServer = () => {
    socket.emit("message", {
      message: outGoingMessage,
      id: "hlpIHr9hRnN0swaTAACr",
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2233/2233922.png"
            alt=""
            className={styles.avatar}
          />
          <h3>Chat section</h3>
          {/* <i className={`${styles.fa-solid} ${styles.fa-phone}`}></i> */}

          {/* <i className="fa-solid fa-video"></i> */}
          {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
        </div>
        <div id="chat" className={styles.chat}>
          <p>Today</p>
          <div className={`${styles.message} ${styles.response}`}>
            Hi this is pankaj
          </div>
          <div className={`${styles.message} ${styles.response}`}>
            Hi this is pankaj
          </div>
          <div className={`${styles.message} ${styles.response}`}>
            Hi this is pankaj
          </div>
          <div className={`${styles.message} ${styles.response}`}>
            Hi this is pankaj
          </div>
        </div>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Type your message here"
            className={styles.inputText}
            value={outGoingMessage}
            onChange={(e) => setOutGoingMessage(e.target.value)}
          />
          <button
            id="jokeBtn"
            className={styles.btn}
            onClick={sendMessageToServer}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
