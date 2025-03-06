import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NavBar() {
    return (
        <NavBarCSS>
            <div className="logo-section">
                <img src="../images/logo.png" alt="logo" />
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/order">Order</Link></li>
                    <li><Link to="/checkout">Checkout</Link></li>
                </ul>
            </nav>
        </NavBarCSS>
    );
}

export default NavBar;

const NavBarCSS = styled.div`
    position: relative;
    top: 0;
    left: 0;
    padding: 0 1rem;
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .logo-section {
        flex: 1;
    }

    .logo-section img {
        width: 50px;
        height: auto;
    }

    nav {
        margin-right: 3rem;
        flex: 2;
    }

    ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
        margin-left: 20px;
    }

    a {
        text-decoration: none;
        color: #000;
        font-weight: bold;
    }
`;
