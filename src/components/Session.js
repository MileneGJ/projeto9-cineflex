import React from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Legend from "./Legend";
import Footer from "./Footer.js";

export default function Session({reservationInfo,setReservationInfo}) {
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
                time: response.data.name,
                day: response.data.day.weekday,
                dayNumber: response.data.day.date,
                image: response.data.movie.posterURL,
                title: response.data.movie.title,
                seats: modifiedSeats
            });
        });
    }, [])

    function Seat({ name, available, selected, action }) {
        let colorset
        if (available && selected) {
            colorset = "1";
        } else if (available) {
            colorset = "2";
        } else {
            colorset = "3";
        }

        return (
            <SeatIMG colorset={colorset} onClick={action}>
                {name}
            </SeatIMG>
        )
    }

    function selecionar(index) {
        const modifiedSeats = seatsList.seats.map(seats => {
            if (seats.id === index) {
                if (seats.isAvailable === false) {
                    alert("Esse assento não está disponível");
                    return seats;
                } else {
                    return (
                        {
                            id: seats.id,
                            name: seats.name,
                            isAvailable: seats.isAvailable,
                            selected: (!seats.selected)
                        }
                    );
                }
            } else {
                return seats;
            }
        });
        setSeatsList({ ...seatsList, seats: modifiedSeats });
    }

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

    function saveInfoPurchase(e) {
        e.preventDefault();
        goToSuccess();
    }


    function goToSuccess () {
        let selectedSeats = seatsList.seats.filter(seat => seat.selected===true);
        /*const modifiedSeats = seatsList.seats.map(seat => {
            if (seat.selected === true) {
                selectedSeats.push({
                    id: seat.id,
                    name: seat.name
                })
                return (
                    {
                        id: seat.id,
                        name: seat.name,
                        isAvailable: false,
                        selected: false
                    }
                );
            } else {
                return seat
            }
        });
        setSeatsList({ ...seatsList, seats: modifiedSeats });*/
        setReservationInfo(() => ({
            title: seatsList.title,
            day: seatsList.dayNumber,
            time: seatsList.time,
            seats: selectedSeats.map(seat => seat.name),
            userName: reservationInfo.userName,
            userDoc: reservationInfo.userDoc
        }));
        const postInfo = {
            ids: selectedSeats.map(seat => seat.id),
            name: reservationInfo.userName,
            cpf: reservationInfo.userDoc
        };
        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", postInfo);
        promise.then(() => navigate("/sucesso"));
        /*promise.catch(handleError);*/
    }


    /*function handleError(error){
        alert(error.response.status)
        if(error.response.status===500){
            goToSuccess();
        }
    }*/

    return (
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

            <form onSubmit={saveInfoPurchase}>
                <InfoUser>
                    <label htmlFor="name">Nome do comprador:</label>
                    <input type="text" value={reservationInfo.userName} placeholder="Digite seu nome..." onChange={e => setReservationInfo({ ...reservationInfo, userName: e.target.value })} required />
                    <label htmlFor="document">CPF do comprador:</label>
                    <input type="text" value={reservationInfo.userDoc} placeholder="Digite seu CPF..." onChange={e => setReservationInfo({ ...reservationInfo, userDoc: e.target.value })} required />

                </InfoUser>
                <button type="submit">Reservar assento(s)</button>
            </form>

            <Footer image={seatsList.image} title={seatsList.title} selectedShowtime={true} day={seatsList.day} time={seatsList.time} />

        </Container>
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
`

const Seats = styled.div`
display:flex;
flex-wrap:wrap;
margin:20px 0;
`

const SeatIMG = styled.div`
width:26px;
height:26px;
display:flex;
justify-content:center;
align-items:center;
font-size:11px;
margin:7px;
background-color:${props => props.colorset === "1" ? "#8DD7CF" : props.colorset === "2" ? "#C3CFD9" : "#FBE192"};
border:solid 1px ${props => props.colorset === "1" ? "#1AAE9E" : props.colorset === "2" ? "#808F9D" : "#F7C52B"};
border-radius:50px;
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
p{
    margin-bottom:5px;
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