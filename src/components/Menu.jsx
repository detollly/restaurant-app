import React, {useState} from "react";

const Menu = (props) => {
const {listText} = props

const [count, setCount] = useState(0)

const incrementCount = () => {
    setCount(count+1)
}


    return (
        <>
        <h1>I wil be a menu</h1>
        <ul>
            <li>{listText}</li>
        </ul>

        <button onClick={incrementCount}>{count}</button>
        </>
    )
}

export default Menu


test