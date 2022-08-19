import React, {useEffect, useState} from 'react'
import './App.css';
import {
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import Home from './pages/Home/Home';
import {Login} from "./pages/Login/Login";
import {NotFound} from "./pages/Login/NotFound";
import {Box, Button} from "@mui/material";
import { stylesHeader, stylesLink } from './pages/Home/styles';
import {getToken, removeToken} from "./controllers/localStorage";

const stylesWrapper = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    background: "#E5F7FF",
    minHeight: "100vh"
}

function App() {
    const [token, setToken] = useState(getToken());

    const navigate = useNavigate();

    useEffect(() => {
        if (token){
            return navigate("/");
        } else {
            return navigate("/login");
        }
    },[token]);

    return(
        <Box sx={stylesWrapper}>
            <Box sx={stylesHeader}>
                <Box>
                    <Link to="/"><Box sx={stylesLink}>Home</Box></Link>
                </Box>
                <Box>
                    {!token && <Link to="/login"><Button variant="contained" sx={stylesLink}>Log In</Button></Link>}
                    {token &&
                        <Button
                            variant="contained"
                            sx={stylesLink}
                            onClick={() => {
                                removeToken();
                                setToken(null);
                            }}
                        >
                            Log Out
                        </Button>
                    }
                </Box>
            </Box>
            <Routes>
                <Route index element={<Home token={token} />} />
                <Route path="/login" element={<Login token={token} setTokenProp={setToken} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    );
}

export default App;
