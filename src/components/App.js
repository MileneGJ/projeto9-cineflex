import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import InTheaters from './InTheaters'
import Movie from './Movie'
import Session from './Session'
import Success from './Success'

export default function App () {

    return (
    <BrowserRouter>
        <Header>
            <h1>CINEFLEX</h1>
        </Header>
        <Routes>
        <Route path="/" element={<InTheaters />} />
        <Route path="/sessoes/:idFilme" element={<Movie />} />
        <Route path="/assentos/:idSessao" element={<Session />} />
        <Route path="/success" element={<Success />} />
        </Routes>
    </BrowserRouter>
    )
}

const Header = styled.div` 
width:100%;
background-color: #C3CFD9;
height:70px;
display:flex;
justify-content:center;
align-items:center;
position:fixed;
top:0;
left:0;

    h1{
        font-size:34px;
        color:#E8833A;
    }
`