import { Link } from 'react-router-dom';
function Navbar(){

return(
    <div>
        <div className="conatainer mt-4">
        <div className="row">
          <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
           <center> <h1 ><i>LIBRARY MANAGEMENT SYSTEM </i></h1></center>
            </div>
            </div>
          </div><br></br>
 {/* Navbar */}
  <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-dark
  ">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Library Management System</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">Users</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/:id">UserDetails</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/authors">Authors</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/books">Books</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">Categories</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transactions">Transactions</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </nav><br></br>
          </div>
)
}
export default Navbar;

