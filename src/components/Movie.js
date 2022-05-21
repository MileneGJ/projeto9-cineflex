import React from "react";
import styled from 'styled-components'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from "./Footer.js";
import Header from "./Header.js";

export default function Movie() {
    const navigate = useNavigate();
    const [showtimes, setShowtimes] = React.useState([]);
    const { idFilme } = useParams();
    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then(response => {
            setShowtimes({
                image: response.data.posterURL,
                title:response.data.title,
                ID: response.data.id,
                days: response.data.days
            })
        });
    }, [])

    function Showtime({ days }) {
        return (
            <>
                <p>{days.weekday} - {days.date}</p>
                {days.showtimes.map(times =>
                    <Link to={`/assentos/${times.id}`} key={times.id}>
                    <button >{times.name}</button>
                    </Link>
                )}
            </>
        )
    }

    return (
        <>
        <Header><button onClick={()=>navigate("/")}>Voltar</button></Header>
        <Container>
            <h2>Selecione o horário</h2>
            <Showtimes>
                {showtimes.days ? showtimes.days.map(day => <Showtime key={day.id} days={day} />) : "Carregando"}
            </Showtimes>
            <Footer image={showtimes.image} title={showtimes.title} selectedShowtime={false} day={""} time={""} />
        </Container>
        </>
    )
}

const Container = styled.div`

padding: 0 30px;
box-sizing:border-box;
margin-bottom:160px;
h2{
    text-align:center;
    margin-top:120px;
    color:#293845;
    font-size:24px;
}
`

const Showtimes = styled.div`
font-size:20px;
color:#293845;

button{
    height:44px;
    width:84px;
    background-color:#E8833A;
    color:#FFFFFF;
    border:none;
    border-radius:3px;
    font-size:18px;
    margin-right:10px;
}

p{
    margin:30px 0;
}
`