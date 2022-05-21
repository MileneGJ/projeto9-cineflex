import styled from 'styled-components';

export default function Legend ({name,background, color}) {
    return(
        <LegElements color={color} background={background}>
                <div></div>
                {name}
        </LegElements>
    )
}

const LegElements = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
font-size:13px;
color:#4E5A65;

div{
    width:24px;
    height:24px;
    background-color:${props => props.background};
    border:solid 1px ${props => props.color};
    border-radius:50px;
    margin-bottom:15px;
}
`