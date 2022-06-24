import { useContext } from "react";
import { CommonContext } from "../contexts/CommonContext";
import FaIcon, { Icons } from "./FaIcon";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Settings = () => {
    const { settingsVisible, toggleSettings, setFidelity, fidelity, setBoxSize, boxSize } = useContext(CommonContext);

    return <div id="settings" className={settingsVisible ? "open": ""}>
        <div className="heading">
            <div className="close-icon">
                <FaIcon icon={Icons.xmark} click={() => toggleSettings(false)} />
            </div>
        </div>

        <div className="setting-list">
            <div className="setting">
                <div className="name">Fidelity</div>
                <Slider min={0.1} max={1} defaultValue={fidelity} step={0.05} onChange={setFidelity} />
            </div>
            <div className="setting">
                <div className="name">Block Size</div>
                <Slider min={100} max={600} defaultValue={boxSize} onChange={setBoxSize} />
            </div>
        </div>
    </div>
}

export default Settings;