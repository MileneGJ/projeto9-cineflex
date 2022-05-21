export default function Legend ({name,background, color}) {
    return(
        <LegElements color={color} background={background}>
                <div></div>
                {name}
        </LegElements>
    )
}