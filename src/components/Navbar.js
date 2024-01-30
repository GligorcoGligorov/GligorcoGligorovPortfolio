import { Link } from 'react-router-dom'

const Navbar = () => {
    return ( 
        <nav className="navbar">
            
            <Link to="/"><h1>Gligorco Gligorov Portfolio</h1></Link>

            <div className="links">
                <Link to="/">Home</Link>
                <a href="#footer">Contact</a>
                
            </div>
        </nav>
     );
}
 
export default Navbar;