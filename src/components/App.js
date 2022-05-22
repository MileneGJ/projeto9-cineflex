import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import InTheaters from './InTheaters';
import Movie from './Movie';
import Session from './Session';
import Success from './Success';
import Header from "./Header";

export default function App () {
    const [reservationInfo, setReservationInfo] = React.useState({
        sessionID:"",
        title: "",
        day: "",
        time: "",
        seats: [],
        buyers:[]
    })

    return (
    <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<InTheaters />} />
        <Route path="/sessoes/:idFilme" element={<Movie />} />
        <Route path="/assentos/:idSessao" element={<Session reservationInfo={reservationInfo} setReservationInfo={setReservationInfo} />} />
        <Route path="/sucesso" element={<Success reservationInfo={reservationInfo} setReservationInfo={setReservationInfo} />} />
        </Routes>
    </BrowserRouter>
    )
}