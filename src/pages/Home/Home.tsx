import {FC, useEffect, useState} from 'react'
import {Box} from "@mui/material";
import axios from "axios";
import {User} from "./User";

const homeStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "32px"
}

interface IProps {
    token: any
}

const Home:FC<IProps> = ({token}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:1337/list', {headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }})
            .then((response:any) => {
                if(response.status >= 400){
                    alert("error")
                } else {
                    setUsers(response.data);
                }
            })
    }, []);

    return(
        <Box sx={homeStyles}>
            {users.map((user:any, i) => {
                return(
                    <User
                        key={i}
                        user={user}
                        i={i}
                        token={token}
                    />
                );
            })}
        </Box>
    )
}

export default Home;