import React, { useState, useContext } from "react";
import DataContext from "../DataContext";
import { v4 as uuidv4 } from "uuid";

export default function AddUser() {
  const db = useContext(DataContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = () => {
    db.setData((pre) => {
      var mDb = { ...pre };
      mDb.users.push({ id: uuidv4, name, description });
      setName("");
      setDescription("");
      return mDb;
    });
  };

  return (
    <div className="ui form">
      <div class="field">
        <div class="fields">
          <div class="four wide field">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
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
