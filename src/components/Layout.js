import Settings from "./Settings";
import Character from "./Character";
import CharacterList from "./CharacterList";
import Canvas from "./Canvas";
import { CommonContext } from "../contexts/CommonContext";
import { useContext } from "react";

const Layout = () => {
    const {charListVisible} = useContext(CommonContext);

    return <main>
        <Settings />
        <header>
            <Character />
            {charListVisible && <CharacterList /> }
        </header>
        <Canvas/>
    </main>
}

export default Layout;