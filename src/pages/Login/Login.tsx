import {Box, Button} from "@mui/material";
import {TextField} from "@mui/material";
import {useState, FC} from "react";
import axios from "axios";
import {setToken} from "../../controllers/localStorage";

interface IProps {
    token: string | null,
    setTokenProp: any
}

export const Login:FC<IProps> = ({token, setTokenProp}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "600px",
            borderRadius: "32px",
            padding: "32px",
            gap: "32px"
        }}>
            <Box>Log In</Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
            }}>
                <TextField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username"
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    type="password"
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        axios.post("http://localhost:1337/login", {username, password}).then((response) => {
                            if(response.status >= 400){
                                alert("error")
                            } else {
                                setToken(response.data.token);
                                setTokenProp(response.data.token);
                            }
                        });
                    }}
                >
                    Log In
                </Button>
            </Box>
        </Box>
    );
}