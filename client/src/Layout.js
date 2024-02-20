import { Outlet } from "react-router-dom";
import Header from "./components/Header.js";

export default function Layout(){
    return(
        <main>
            <Header />
            <Outlet />
        </main>
    )
}