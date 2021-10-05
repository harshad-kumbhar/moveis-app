import { Link } from "react-router-dom";

const Navbar = (props: any) => {
    return <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-nav">
                    <Link className={props.activeTab === 'Home' ? "nav-link active bg-warning" : "nav-link"}
                     aria-current="page" to="/" onClick={() => props.onTabChange('Home')}>Home</Link>
                    <Link className={props.activeTab === 'Movies' ? "nav-link active bg-warning" : "nav-link"}
                     to="/movies" onClick={() => props.onTabChange('Movies')}>Movies</Link>
                    <Link className={props.activeTab === 'Buget' ? "nav-link active bg-warning" : "nav-link"}
                     to="/budget" onClick={() => props.onTabChange('Buget')}>Budget</Link>
                     <Link className={props.activeTab === 'Hooks' ? "nav-link active bg-warning" : "nav-link"}
                     to="/hooks" onClick={() => props.onTabChange('Hooks')}>Hooks</Link>
                    {props.user &&
                            <><Link className={props.activeTab === 'Logout' ? "nav-link active bg-warning" : "nav-link"}
                        to="/" onClick={() => props.onTabChange('Logout')}>{props.user.iss} </Link>
                        <Link className={props.activeTab === 'Logout' ? "nav-link active bg-warning" : "nav-link"}
                            to="/logout" onClick={() => props.onTabChange('Logout')}>Logout</Link></>
                    }
                     
                    {!props.user && 
                        <Link className={props.activeTab === 'Login' ? "nav-link active bg-warning" : "nav-link"}
                     to="/login" onClick={() => props.onTabChange('Login')}>Login</Link>}


                </div>
        </nav>
    </div>;
}
 
export default Navbar;