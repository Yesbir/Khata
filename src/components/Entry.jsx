import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DataContext from "../DataContext";
import saveJSONToFile from "../utils/saveJSONToFile";

export default function Entry({ users, categories, modes }) {
  const db = useContext(DataContext);
  const [sender, setSender] = useState("");
  const [reciever, setReciever] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("");

  const handleSenderSelect = (e) => {
    setSender(e.target.value);
  };
  const handleModeSelect = (e) => {
    setMode(e.target.value);
  };

  const handleRecieverSelect = (e) => {
    setReciever(e.target.value);
  };

  const handleCategorySelect = (e) => {
    setCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = () => {
    var newTran = {
      id: uuidv4(),
      sender,
      reciever,
      category,
      amount,
      description,
      mode,
    };
    db.setData((pre) => {
      var updatedData = { ...pre };
      updatedData.transactions.push(newTran);
      setSender("");
      setReciever("");
      setDescription("");
      setCategory("");
      setAmount("");
      setMode("");
      saveJSONToFile(updatedData, `db${updatedData.transactions.length}`);
      return updatedData;
    });
  };

  return (
    <div className="ui form">
      <div class="three fields">
        <div class="field">
          <select
            class="ui fluid search dropdown"
            name="sender"
            value={sender}
            onChange={handleSenderSelect}
          >
            <option value="">Sender</option>
            {users.map((user) => {
              return <option value={user.id}>{user.name}</option>;
            })}
          </select>
        </div>
        <div className="field">
          <div class="field">
            <select
              class="ui fluid search dropdown"
              name="receiver"
              value={reciever}
              onChange={handleRecieverSelect}
            >
              <option value="">Receiver</option>
              {users.map((user) => {
                return <option value={user.id}>{user.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div class="field">
          <select
            class="ui fluid search dropdown"
            name="sender"
            value={category}
            onChange={handleCategorySelect}
          >
            <option value="">Categories</option>
            {categories.map((catagory) => {
              return <option value={category.id}>{catagory.name}</option>;
            })}
          </select>
        </div>
      </div>
      <div class="field">
        <div class="fields">
          <div class="two wide field">
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div class="two wide field">
            <select
              class="ui fluid search dropdown"
              name="modeOfPayment"
              value={mode}
              onChange={handleModeSelect}
            >
              <option value=""> Select Mode of Payment</option>
              {modes.map((mode) => {
                return <option value={mode.id}>{mode.name}</option>;
              })}
            </select>
          </div>
          <div class="ten wide field">
            <input
              type="text"
              name="description"
              value={description}
              placeholder="Description"
              onChange={handleDescriptionChange}
            />
          </div>
          <div class="two wide field">
            <button class="ui primary button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
