import React, { useState } from "react";
import HiraganaList from "./../configs/hiragana";

export const CommonContext = React.createContext();

export const CommonContextProvider = ({ children }) => {
    
    let hiraganaChars = HiraganaList.filter(x => x.name.toLowerCase().indexOf("small") === -1).filter(x => x.romanization !== "");

    const [activeChar, setActiveChar] = useState(0);
    const [hiragana, setHiragana] = useState(hiraganaChars);
    const [charListVisible, setCharListVisibility] = useState(false);

  return <CommonContext.Provider value={{activeChar, setActiveChar, hiragana, setHiragana, charListVisible, setCharListVisibility}}>{children}</CommonContext.Provider>;
};