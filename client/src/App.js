import "./App.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="App">
    
      
      {
        isAuthenticated?(
          <div>
          <Button
        variant="outline-success"
        style={{ width: "90%" }}
        onClick={() => navigate("create")}
      >
        NEXT
      </Button>
          <Button
        variant="outline-success"
        style={{ width: "90%" }}
        onClick={() => logout({ returnTo: window.location.origin })}
        
      >
        LOGOUT
      </Button></div>
        ):( <Button
        variant="outline-success"
        style={{ width: "90%" }}
        onClick={() => loginWithRedirect()}
        
      >
        LOGIN
      </Button>)
      }
     
      
    </div>
  );
}

export default App;
