import React from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Legend from "./Legend";
import Footer from "./Footer";
import Header from "./Header";
import Seat from "./Seat";

export default function Session({ reservationInfo, setReservationInfo }) {

    const infoLegend = [{
        name: "Selecionado",
        colorFill: "#8DD7CF",
        colorBorder: "#1AAE9E"
    }, {
        name: "Disponível",
        colorFill: "#C3CFD9",
        colorBorder: "#808F9D"
    }, {
        name: "Indisponível",
        colorFill: "#FBE192",
        colorBorder: "#F7C52B"
    }];

    const navigate = useNavigate()
    const [seatsList, setSeatsList] = React.useState([]);
    const { idSessao } = useParams();
    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then(response => {

            const modifiedSeats = response.data.seats.map(seats => ({
                id: seats.id,
                name: seats.name,
                isAvailable: seats.isAvailable,
                selected: false
            }))

            setSeatsList({
                movieID: response.data.movie.id,
                time: response.data.name,
                day: response.data.day.weekday,
                dayNumber: response.data.day.date,
                image: response.data.movie.posterURL,
                title: response.data.movie.title,
                seats: modifiedSeats
            });
        });
    }, [])



    function selecionar(index) {
        let CurrentUserName = "";
        let CurrentUserDoc = "";
        if (reservationInfo.buyers.length !== 0) {
            if (reservationInfo.buyers.filter(b => b.seat === index).length !== 0) {
                CurrentUserName = reservationInfo.buyers.filter(b => b.seat === index)[0].userName
                CurrentUserDoc = reservationInfo.buyers.filter(b => b.seat === index)[0].userDoc
            }
        }
        const modifiedSeats = seatsList.seats.map(seats => {
            if (seats.id !== index) {
                return seats;
            } else if (seats.isAvailable === false) {
                alert("Esse assento não está disponível");
                return seats;
            } else if (seats.selected === true &&
                (CurrentUserName !== "" ||
                    CurrentUserDoc !== "")) {
                if (window.confirm("Gostaria realmente de remover o assento?")) {
                    return ({
                        id: seats.id,
                        name: seats.name,
                        isAvailable: seats.isAvailable,
                        selected: false
                    });
                } else {
                    return seats;
                }
            } else {
                return ({
                    id: seats.id,
                    name: seats.name,
                    isAvailable: seats.isAvailable,
                    selected: !seats.selected
                });
            }
        });

        let selectedSeats = modifiedSeats.filter(seat => seat.selected);
        let buyersInfo = selectedSeats.map(seat => {
            if (reservationInfo.buyers.length === 0) {
                return {
                    seat: seat.id,
                    userName: "",
                    userDoc: ""
                }
            } else if (reservationInfo.buyers.filter(b => b.seat === seat.id).length === 0) {
                return {
                    seat: seat.id,
                    userName: "",
                    userDoc: ""
                }
            } else {
                return ({
                    seat: seat.id,
                    userName: reservationInfo.buyers.filter(b => b.seat === seat.id)[0].userName,
                    userDoc: reservationInfo.buyers.filter(b => b.seat === seat.id)[0].userDoc
                })
            }
        });
        setReservationInfo({ ...reservationInfo, buyers: buyersInfo });
        setSeatsList({ ...seatsList, seats: modifiedSeats });
    }


    function goToSuccess(e) {
        e.preventDefault();
        let selectedSeats = seatsList.seats.filter(seat => seat.selected);
        setReservationInfo(() => ({
            sessionID: idSessao,
            title: seatsList.title,
            day: seatsList.dayNumber,
            time: seatsList.time,
            seats: selectedSeats.map(seat => seat.name),
            buyers: reservationInfo.buyers
        }));

        const compradores = reservationInfo.buyers.map(b => ({
            idAssento: b.seat,
            nome: b.userName,
            cpf: b.userDoc
        }))

        const postInfo = {
            ids: selectedSeats.map(seat => seat.id),
            compradores: compradores
        };
        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", postInfo);
        promise.then(() => navigate("/sucesso"));
    }


    function modifyReservation(e, seatID, field) {
        const updatedReserv = reservationInfo.buyers.map(function (b) {
            if (b.seat === seatID) {
                if (field === "userName") {
                    return {
                        seat: b.seat,
                        userName: e.target.value,
                        userDoc: b.userDoc
                    };
                }
                if (field === "userDoc") {
                    return {
                        seat: b.seat,
                        userName: b.userName,
                        userDoc: e.target.value
                    };
                }
            } else {
                return b;
            }
        });
        setReservationInfo({ ...reservationInfo, buyers: updatedReserv });
    }

    function showValue(seatID, field) {
        let finalValue = "";
        if (reservationInfo.buyers.filter(b => b.seat === seatID).length !== 0) {

            if (field === "userName") {
                finalValue = reservationInfo.buyers.filter(b => b.seat === seatID)[0].userName
            } else {
                let resDoc = reservationInfo.buyers.filter(b => b.seat === seatID)[0].userDoc
                for (let i = 0; i < resDoc.length; i++) {
                    finalValue += resDoc[i];
                    if ((i === 2 && resDoc[3] !== ".") || (i === 6 && resDoc[7] !== ".")) {
                        finalValue += ".";
                    }
                    if (i === 10 && resDoc[11] !== "-") {
                        finalValue += "-";
                    }
                }
            }
        }
        return finalValue;
    }


    return (
        <>
            <Header><button onClick={() => navigate(`/sessoes/${seatsList.movieID}`)}>Voltar</button></Header>
            <Container>
                <h2>Selecione o(s) assento(s)</h2>
                <Seats>
                    {seatsList.seats ? seatsList.seats.map(seat => <Seat
                        key={seat.id}
                        name={seat.name}
                        available={seat.isAvailable}
                        selected={seat.selected}
                        action={() => selecionar(seat.id)} />) : "Carregando"}
                </Seats>

                <SeatsLeg>
                    {infoLegend.map((info, index) => <Legend key={index} name={info.name} background={info.colorFill} color={info.colorBorder} />)}
                </SeatsLeg>

                <form onSubmit={goToSuccess}>
                    {seatsList.seats ?
                        seatsList.seats.map(seat =>
                            seat.selected ?
                                <InfoUser key={seat.id} >
                                    <h3>Assento {seat.name}</h3>
                                    <label htmlFor="name">Nome do comprador:</label>
                                    <input type="text" value={showValue(seat.id, "userName")} placeholder="Digite seu nome..." onChange={(e) => modifyReservation(e, seat.id, "userName")} required />
                                    <label htmlFor="document">CPF do comprador:</label>
                                    <input type="text" value={showValue(seat.id, "userDoc")} placeholder="Digite seu CPF..." onChange={(e) => modifyReservation(e, seat.id, "userDoc")} required />
                                </InfoUser>
                                :
                                <></>
                        )
                        : "Carregando"}

                    <button type="submit">Reservar assento(s)</button>
                </form>

                <Footer image={seatsList.image} title={seatsList.title} selectedShowtime={true} day={seatsList.day} time={seatsList.time} />

            </Container>
        </>
    )
}

const Container = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
padding:30px;
box-sizing:border-box;
margin-bottom:160px;

h2{
    margin-top:120px;
    color:#293845;
    font-size:24px;
}
button{
    height:42px;
    width:224px;
    background-color:#E8833A;
    color:#FFFFFF;
    border:none;
    border-radius:3px;
    font-size:18px;
}

form{
    width:100%;
    padding:5px;
    display:flex;
    flex-direction:column;
    align-items:center;
}
`

const Seats = styled.div`
display:flex;
flex-wrap:wrap;
margin:20px 0;
`

const SeatsLeg = styled.div`
display:flex;
justify-content:space-evenly;
width:100%;
margin-bottom:60px;
`

const InfoUser = styled.div`
width:100%;
font-size:18px;
color:#293845;
margin-bottom:60px;

h3{
    margin-bottom:20px;
    font-weight:700;
}

label{
    line-height:26px;
}

input{
    width:100%;
    height:50px;
    display:flex;
    align-items:center;
    box-sizing:border-box;
    padding:18px;
    border:solid 1px #D4D4D4;
    font-style:italic;
    color:#AFAFAF;
    font-size:18px;
    font-family:"Roboto",sans serif;
    margin-bottom:10px;
}
`