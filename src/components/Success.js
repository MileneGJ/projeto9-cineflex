import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Success({ reservationInfo, setReservationInfo }) {
    const navigate = useNavigate();

    const purchase = [{
        title: "Filme e sessão",
        info: [`${reservationInfo.title}`,
        `${reservationInfo.day} ${reservationInfo.time}`]
    }, {
        title: "Ingressos",
        info: reservationInfo.seats.map(seat => `Assento ${seat}`)
    }, {
        title: "Comprador(a)",
        info: reservationInfo.buyers.map((b,index)=> {return(
        <>
        <p>Assento: {reservationInfo.seats[index]}</p>
        <p>Nome: {b.userName}</p> 
        <p>CPF: {b.userDoc}</p>
        </>)})
    }]

    function PurchaseData({ title, info}) {
        return (
            <div>
                <h4>{title}</h4>
                <ul>
                {info.map((text,index)=> <li key={index}>{text}</li>)}
                </ul>
            </div>
        )
    }

    //Ao voltar para Home, zerar dados da reserva e ir para filmes em cartaz
    function reload (){
        setReservationInfo({
            sessionID:"",
            title: "",
            day: "",
            time: "",
            seats: [],
            userName: "",
            userDoc: ""
        });
        navigate("/");
    }

    return (
        <>
        <Header><button onClick={() => navigate(`/assentos/${reservationInfo.sessionID}`)}>Voltar</button></Header>
        <Container>
            <h2>Pedido feito <br/>com sucesso!</h2>
            <InfoPurchase>
                {purchase.map((p,index) => <PurchaseData key={index} title={p.title} info={p.info} />)}
            </InfoPurchase>
            <button onClick={reload}>Voltar para Home</button>
        </Container>
        </>
    )
}

const Container = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
padding:0 30px;
box-sizing:border-box;
margin-bottom:160px;

h2{
    text-align:center;
    margin-top:120px;
    color:#247A6B;
    font-size:24px;
    font-weight:700;
    line-height:30px;
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

const InfoPurchase = styled.div`
width:100%;
color:#293845;
margin:60px 0;

div{
    margin-bottom:40px;
}
h4{
    font-size:24px;
    font-weight:700;
}
p,li{
    font-size:22px;
    line-height:30px;
}

li{
    margin:10px 0;
}
`