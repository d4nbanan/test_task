import {Box} from "@mui/material";
import {FC, useState} from "react";
import axios from "axios";
import {ClickAwayListener} from "@mui/material";
import {rowStyles, columnStyles, additionalStyles} from './styles';

interface IProps {
    user: {
        first_name: string,
        id: string
    },
    i: number,
    token: string
}

export const User:FC<IProps> = ({user, i, token}) => {

    const getUser = (userId:string, setState:any) => {
        axios.get('http://localhost:1337/get/' + user.id, {headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }})
            .then((response:any) => {
                setState(response.data);
            })
    }

    const [openAdditional, setOpenAdditional] = useState(false);
    const [userAdditional, setUserAdditional] = useState({
        first_name: "",
        last_name: "",
        age: null,
        gender: "",
        country: ""
    });

    return(
        <Box
            key={i}
            sx={rowStyles}
            onClick={async () => {
                getUser(user.id, setUserAdditional);
                setOpenAdditional(true);
            }}
        >
            <Box sx={columnStyles}>{i+1}</Box>
            <Box sx={columnStyles}>{user.first_name}</Box>
            {openAdditional &&
                <ClickAwayListener
                    onClickAway={() => {
                        setOpenAdditional(false);
                    }}
                >
                    <Box sx={additionalStyles}>
                        <Box>First name: {userAdditional?.first_name}</Box>
                        <Box>Last name: {userAdditional?.last_name}</Box>
                        <Box>Age: {userAdditional?.age}</Box>
                        <Box>Gender: {userAdditional?.gender}</Box>
                        <Box>Country: {userAdditional?.country}</Box>
                    </Box>
                </ClickAwayListener>
            }
        </Box>
    );
}