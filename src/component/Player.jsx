import { useState } from "react";
export default function Player({intName,symbol,isActive,onChangeName})
{
    const [playerName,setPlayerName]=useState(intName);
    const [isEditing,setIsEditing]=useState(false);

    function handleEditClick()
    {
        setIsEditing((editing)=>!editing);
        if(isEditing)
        {
        onChangeName(symbol,playerName);
        }
    }

    
    function handleChange(event)
    {
        setPlayerName(event.target.value);
    }

    let newPlayerName=<span  className="player-name">{playerName}</span>
     
    if(isEditing)
        newPlayerName=(<input type="text" value={playerName} onChange={handleChange}/>)
    return(
    <li className={isActive?'active':undefined}>
    <span className="player">
    {newPlayerName}
    <span  className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
    </li>
    );
}