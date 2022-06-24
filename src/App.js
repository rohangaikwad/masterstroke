import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Fonts from "./configs/fonts";
import { CommonContextProvider } from "./contexts/CommonContext";
const FontFaceObserver = require("fontfaceobserver");

const App = () => {
  const [activeFont, setFont] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    setFont(Fonts[0].name);

    Promise.all([
      new FontFaceObserver("Kokoro", { weight: 400 }).load("あ"),
      //new FontFaceObserver("BIZ UDPMincho", { weight: 400 }).load("あ"),
    ]).then(function () {
      console.log("Font is available");
      setFontsLoaded(true);
    }).catch(e => console.log(e));
  }, []);

  return (
    <CommonContextProvider>
      <div className="App">{fontsLoaded ? <Layout /> : <div>Loading</div>}</div>
    </CommonContextProvider>
  );
};

export default App;
