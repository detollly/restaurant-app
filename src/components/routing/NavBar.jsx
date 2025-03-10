import { Link } from 'react-router-dom';

function NavBar () {
    return (
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/book">Book a Table</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
