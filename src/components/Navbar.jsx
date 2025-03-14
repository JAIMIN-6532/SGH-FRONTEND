import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                <h1 className="text-xl font-bold">Govt Certificates</h1>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-blue-500">Home</Link>
                    <Link to="/about" className="hover:text-blue-500">About</Link>
                    <Link to="/contact" className="hover:text-blue-500">Contact</Link>
                    <Link to="/birth-certificate" className="hover:text-blue-500">Birth Certificate</Link>
                    <Link to="/death-certificate" className="hover:text-blue-500">Death Certificate</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
