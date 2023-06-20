import React from "react";

export default function Card({ user, setIsHide, setSelectedUser }) {
  const handleHistoryClick = () => {
    setIsHide(true);
    setSelectedUser({ ...user });
  };
  return (
    <div class="card">
      <div class="content">
        <div class="header">{user.name}</div>
        <div class="description">{user.description}</div>
      </div>
      <div class="ui bottom attached button" onClick={handleHistoryClick}>
        <i class="book icon"></i>
        Show History
      </div>
    </div>
  );
}
