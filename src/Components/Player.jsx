import { useState } from "react";
export default function Player({ intialName, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(intialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if(isEditing) {
      onChangeName(symbol,playerName);
    }
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  
  let EditiblePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    EditiblePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? 'active':undefined}>
      <span className="player">
        {EditiblePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
