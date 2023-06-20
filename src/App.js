import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Card from "./components/Card";
import Entry from "./components/Entry";
import AddUser from "./components/AddUser";
import DataContext from "./DataContext";
import TransactionHistory from "./components/TransactionHistory";

const tdata = {
  categories: [
    { id: uuidv4(), name: "Electrician" },
    { id: uuidv4(), name: "Thekedaar" },
    { id: uuidv4(), name: "Family" },
    { id: uuidv4(), name: "Grocery" },
    { id: uuidv4(), name: "Travel" },
    { id: uuidv4(), name: "Consruction related" },
    { id: uuidv4(), name: "Household items" },
    { id: uuidv4(), name: "Misc" },
    { id: uuidv4(), name: "Bill Payments" },
    { id: uuidv4(), name: "Hardware" },
  ],
  modes: [
    { id: uuidv4(), name: "Cash" },
    { id: uuidv4(), name: "HSBC-Y UPI" },
    { id: uuidv4(), name: "SBI-Y UPI" },
    { id: uuidv4(), name: "SBI-A" },
  ],
  users: [
    {
      id: uuidv4(),
      name: "Admin",
      contactNumber: "",
      description: "",
    },
    {
      id: uuidv4(),
      name: "Inderjeet Electrician",
      contactNumber: "9753113189",
      description:
        "Near home electrician and owner of electrical appliance shop",
    },
    {
      id: uuidv4(),
      name: "Bijli wala",
      contactNumber: "8435350272",
      description:
        "Electrician who come at day 1 and repair the electricity for 4 households and break the meter",
    },
    {
      id: uuidv4(),
      name: "Bharghav general store",
      contactNumber: "",
      description: "near home genrel store",
    },
    {
      id: uuidv4(),
      name: "Guddi Aunty",
      contactNumber: "",
      description: "",
    },
    {
      id: uuidv4(),
      name: "Misc",
      contactNumber: "",
      description: "",
    },
    {
      id: uuidv4(),
      name: "Ramotar",
      contactNumber: "",
      description: "Thekedaar",
    },
    {
      id: uuidv4(),
      name: "Rajveer",
      contactNumber: "975522600",
      description: "Place where we got rod and wire",
    },
  ],
  transactions: [],
};

localStorage.setItem("data", JSON.stringify(tdata));

function App() {
  let savedData = localStorage.getItem("data") || "{}";
  savedData = JSON.parse(savedData);

  const [data, setData] = useState(savedData);
  const [isHide, setIsHide] = useState(false);
  const [Selecteduser, setSelectedUser] = useState("");

  return (
    <div className="App container med-mar">
      <DataContext.Provider value={{ data, setData }}>
        <Entry
          users={data.users}
          categories={data.categories}
          modes={data.modes}
        />
        <div className="med-mar">
          <div className="scrollable center">
            {isHide ? (
              <TransactionHistory user={Selecteduser} setIsHide={setIsHide} />
            ) : (
              <div class="ui cards ">
                {data.users.map((user) => (
                  <Card
                    user={user}
                    setSelectedUser={setSelectedUser}
                    setIsHide={setIsHide}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="med-mar center">
          <AddUser />
        </div>
      </DataContext.Provider>
    </div>
  );
}

export default App;
