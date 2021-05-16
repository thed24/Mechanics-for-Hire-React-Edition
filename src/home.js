import React from "react";
import LoginNavBar from "./components/loginNavBar";
import "./generic.css";

export default function Home() {
    return (
      <div className="Login">
        <LoginNavBar></LoginNavBar>
        <h2> Welcome to Mechanics for Hire! </h2>
      </div>
    );
}