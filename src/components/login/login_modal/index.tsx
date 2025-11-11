"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function LoginModal({open, setOpen, isAllow, setAllow, otp}: {
    open: boolean,
    setOpen: any,
    isAllow: boolean,
    setAllow: any,
    otp: number | undefined,
}) {
    const [userInputOtp, setNewOtp] = useState('')
    const handleClose = () => {setOpen(false);setNewOtp('');}
    const handleClick = () => {
        if(Number(userInputOtp) === otp ){
            setAllow(true);
            setOpen(false);
            alert("OTP đúng !!")
        }
        else {
            alert('nhập sai, nhập lại')
        }
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nhập OTP ở đây để xác nhận đăng nhập
                    </Typography>
                    <TextField
                        type={"number"}
                        id="outlined-basic"
                        label="OTP"
                        variant="outlined"
                        required
                        value={userInputOtp}
                        fullWidth={true}
                        onChange={(e) => setNewOtp(e.target.value)}
                        name = "OTP"
                    />
                    <Button onClick={handleClick} className="w-full" variant={"contained"} style={{marginTop: '20px'}}> Nhập OTP</Button>
                </Box>
            </Modal>
        </div>
    );
}
