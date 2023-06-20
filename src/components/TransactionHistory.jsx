import React from "react";
import { useState } from "react";
import { useContext } from "react";
import DataContext from "../DataContext";

export default function TransactionHistory({ user, setIsHide }) {
  const db = useContext(DataContext);
  const [showDescription, setShowDescription] = useState("");

  const handleMessageMouseEnter = (id) => {
    setShowDescription(id);
  };
  const handleMessageMouseLeave = () => {
    setShowDescription("");
  };

  const calculateTotal = (userId) => {
    let totalSend = 0;
    let totalRecieved = 0;
    let totalEntries = 0;
    db.data.transactions.forEach((tran) => {
      if (tran.sender === userId) {
        totalSend = Number(totalSend) + Number(tran.amount);
        totalEntries++;
      }

      if (tran.reciever === userId) {
        totalRecieved = Number(totalRecieved) + Number(tran.amount);
        totalEntries++;
      }
    });
    return { recieved: totalRecieved, send: totalSend, entries: totalEntries };
  };

  const total = calculateTotal(user.id);

  return (
    <div className="mer-mar ">
      <div className="ui segment">
        <div className="ui right floated segment">
          <span className="ui red message">Total Send : {total.send}</span>
        </div>
        <div className="ui left floated segment">
          <span className="ui green message">
            Total Recieved : {total.recieved}
          </span>
        </div>
        <h1>{user.name}</h1>
        <div className="ui  button" onClick={() => setIsHide(false)}>
          Back
        </div>

        <div className="ui clearing segment">
          <div>
            {
              <div
                className={`ui center floated segment  ${
                  total.recieved - total.send < 0 ? "red" : "green"
                } message`}
              >
                Net: {Math.abs(total.send - total.recieved)}
              </div>
            }
          </div>
          <div className="ui right floated segment">{total.entries}</div>
        </div>
      </div>
      <div className="">
        {db.data.transactions.map((tran) => {
          if (tran.reciever === user.id) {
            const senderName = db.data.users.filter(
              (u) => u.id === tran.sender
            )[0].name;
            return (
              <div class="ui left aligned segment">
                <span>
                  <span
                    class="ui green message"
                    onMouseEnter={() => handleMessageMouseEnter(tran.id)}
                    onMouseLeave={() => handleMessageMouseLeave(tran.id)}
                  >
                    ₹{tran.amount} Recieved from {senderName}
                  </span>
                  {showDescription === tran.id ? (
                    <>
                      &emsp;&emsp;
                      {tran.description}
                    </>
                  ) : (
                    <></>
                  )}
                </span>
              </div>
            );
          }
          if (tran.sender === user.id) {
            const recieverName = db.data.users.filter(
              (u) => u.id === tran.reciever
            )[0].name;
            return (
              <div className="ui right aligned segment">
                <span>
                  {showDescription === tran.id ? (
                    <>{tran.description}&emsp;&emsp;</>
                  ) : (
                    <></>
                  )}
                  <span
                    class="ui red message"
                    onMouseEnter={() => handleMessageMouseEnter(tran.id)}
                    onMouseLeave={() => handleMessageMouseLeave(tran.id)}
                  >
                    ₹{tran.amount} Send to {recieverName}
                  </span>
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
