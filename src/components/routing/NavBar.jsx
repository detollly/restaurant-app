import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NavBar () {
    return (
        <NavBarCSS>
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

const NavBarCSS = styled.div ``
