import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faClose } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import axios from "axios";
import { click_sur_ami, fermer_disscusion } from "../redux/boite_disscussion";

function Discussion() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user_login);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { ouvert, id_amie, name_amie, profile_pic_amie,id_group } = useSelector(
    (state) => state.boite_disscussion
  );
  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket(
    `ws://127.0.0.1:8000/ws/chat/${id_group}/`,
    {
      shouldReconnect: () => true
    }
  );

  useEffect(() => {
    if (lastJsonMessage) {
      setMessages(prevMessages => [...prevMessages, lastJsonMessage]);
    }
  }, [lastJsonMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (readyState === WebSocket.OPEN) {
      sendJsonMessage({
        source: state.user.user_id,
        destination: id_amie,
        content: message
      });
      setMessage("");
    } else {
      console.error("WebSocket connection not open");
    }
  };

  const handleclose = () => {
    dispatch(fermer_disscusion());
  };
  useEffect(() => {
    get_message(state.user.user_id, id_amie);
  }, []);
  const get_message = async (source_id, destination_id) => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/users/user_voir_messages/",
            { source_id, destination_id }
          );
          console.log('response.data nta3 message ', response.data)
          setMessages(response.data);
          setMessage("");
        } catch (error) {
          console.error(error);
        }
      };
    
  return (
    <div className="fixed bottom-0 right-[30%] w-48 border border-gray-400 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-800 text-gray-300 p-2">
        <div>
          <img
            src={`http://127.0.0.1:8000${profile_pic_amie}`}
            className="rounded-full w-7 h-7 mr-1"
            alt="AI"
          />
          <div className="text-xs font-serif">{name_amie}</div>
        </div>
        <div>
          <FontAwesomeIcon
            onClick={handleclose}
            icon={faClose}
            className="ml-2 text-blue-500 cursor-pointer"
          />
        </div>
      </div>
      {/* Message List */}
      <div className="overflow-y-auto max-h-40 p-2 bg-slate-200">
        {messages.length === 0 ? (
          <span>Commencer la discussion avec {name_amie}</span>
        ) : (
          messages.map((message) => {
            if (message.source === state.user.user_id) {
              return (
                <div
                  key={message.id}
                  className="flex items-start mb-2 justify-end"
                  title={`Date de création : ${message.created_at}`}
                >
                  <div className="bg-blue-500 text-white rounded-md p-2 self-end">
                    <span className="text-xs text-gray-400 mr-1">Moi</span>
                    <span className="">{message.content}</span>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={message.id} className="flex items-end mb-2" title={`Date de création : ${message.created_at}`}>
                  <div className="bg-gray-600 text-gray-800 rounded-md p-2">
                    <span className="text-xs text-gray-400 mr-1">
                      {name_amie}
                    </span>
                    <span className="text-violet-50">{message.content}</span>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
      {/* Input Area */}
      <form className="flex items-center bg-gray-100 p-2" onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="text"
          className="flex-grow w-3/5 rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit" className="ml-2">
          <FontAwesomeIcon icon={faPaperPlane} className="text-blue-500 cursor-pointer" />
        </button>
      </form>
    </div>
  );
}
export default Discussion;
