import { HiDotsVertical } from "react-icons/hi";
import { FaComments } from "react-icons/fa";
import "../styles/Header.css";

export default function Header() {

    return (
        <header className="header">

            <div className="header-logo">
                <FaComments className="logo-icon" />

                <div>
                    <h2>ChatterBox</h2>
                    <span>Team Communication</span>
                </div>

            </div>


            <button className="header-menu">
                <HiDotsVertical />
            </button>


        </header>
    )
}