import React from "react";
import { Switch, Route, Link, BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Addreview from "./components/add-review.js";
import Restaurants from "./components/restaurants.js";
import Restaurantslist from "./components/restaurants-list.js";
import Login from "./components/login.js";
function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" className="container">
        <Container>
          <Navbar.Brand href="/ ">Restaurants Reviews</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/restaurants">Restaurants</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route path="/" element={<Restaurants />} />
          <Route path="/restaurants/:id/review" element={<Addreview />} />
          <Route path="/restaurants" element={<Restaurantslist />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
