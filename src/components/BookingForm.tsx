"use client";
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import { Visibility, VisibilityOff } from '@mui/icons-material'; // Eye icon import


const BookingForm = () => {
  const studentSignUpUrl = "https://Testbackend.educify.org/api/api/v1/students/students/signup";
  const studentVerifyOtpUrl = "https://Testbackend.educify.org/api/api/v1/students/verfiy-otp";
  const studentSendOtpUrl = "https://Testbackend.educify.org/api/api/v1/students/send-otp";

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<any>({});
  const router = useRouter();

  // Validate form fields
  const validateForm = () => {
    const newError: any = {};
    // Validate name
    if (!name) newError.name = "Name is required";
    
    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) newError.email = "Email is required";
    else if (!emailRegex.test(email)) newError.email = "Invalid email address";
    
    // Validate phone number
    if (!phoneNumber) newError.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(phoneNumber)) newError.phoneNumber = "Phone number should be 10 digits";
    
    // Validate OTP
    if (!otp) newError.otp = "OTP is required";
    
    // Validate password
    if (!password) newError.password = "Password is required";
    else if (password.length < 6) newError.password = "Password should be at least 6 characters long";
    
    // Validate confirm password
    if (!confirmPassword) newError.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password) newError.confirmPassword = "Passwords do not match";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const SignUp = async () => {
    if (!validateForm()) return;
    const data = {
      name,
      email,
      subject,
      phoneNumber,
      otp,
      password,
    };

    try {
      const response = await axios.post(studentSignUpUrl, data);
      console.log("Sign up successful", response.data);
      router.push('/bookclass');
    } catch (error: any) {
      console.error("Error during sign-up:", error.response ? error.response.data : error.message);
    }
  };

  const VerifyOtp = async () => {
    const data = { phoneNumber, otp };

    try {
      const response = await axios.post(studentVerifyOtpUrl, data);
      console.log("OTP verified:", response.data);
    } catch (error: any) {
      console.error("Error during OTP verification:", error.response ? error.response.data : error.message);
    }
  };

  const SendOtp = async () => {
    const data = { phoneNumber };

    try {
      const response = await axios.post(studentSendOtpUrl, data);
      console.log("OTP sent successfully:", response.data);
    } catch (error: any) {
      console.error("Error during sending OTP:", error.response ? error.response.data : error.message);
    }
  };

  const handleSendOtp = () => {
    SendOtp();
  };

  return (
    <Box>
      <TextField
        autoFocus
        margin="dense"
        label="Parents Name*"
        type="text"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="small"
        sx={{ mb: 2 }}
        error={!!error.name}
        helperText={error.name}
      />
      <TextField
        margin="dense"
        label="Parents Email Address*"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
        sx={{ mt: 4 }}
        error={!!error.email}
        helperText={error.email}
      />

      <Stack
        gap={4}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mt: 4 }}
      >
        <FormControl fullWidth margin="dense" size="small">
          <InputLabel>Choose Subject*</InputLabel>
          <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <TextField
        margin="dense"
        label="Mobile Number*"
        type="text"
        fullWidth
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        InputProps={{
          endAdornment: (
            <Box className="w-32 flex justify-end">
              <Button
                sx={{ bgcolor: "#3198F5", color: "white" }}
                fullWidth
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            </Box>
          ),
        }}
        size="small"
        error={!!error.phoneNumber}
        helperText={error.phoneNumber}
      />
      <TextField
        margin="dense"
        label="OTP*"
        type="text"
        fullWidth
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        size="small"
        InputProps={{
          endAdornment: (
            <Box className="w-32 flex justify-end">
              <Button
                sx={{ bgcolor: "#3198F5", color: "white" }}
                fullWidth
                onClick={VerifyOtp}
              >
                Verify
              </Button>
            </Box>
          ),
        }}
        error={!!error.otp}
        helperText={error.otp}
      />

      <Stack
        gap={4}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mt: 4 }}
      >
        <TextField
          margin="dense"
          label="Create Password*"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="small"
          error={!!error.password}
          helperText={error.password}
        />
        <TextField
          margin="dense"
          label="Confirm Password*"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="small"
          error={!!error.confirmPassword}
          helperText={error.confirmPassword}
        />
      </Stack>

      <Box className="mx-auto w-[300px] mt-4">
        <StyledButton sx={{ maxWidth: 300, mx: "auto" }} onClick={SignUp}>
          Schedule a Free Class
        </StyledButton>
      </Box>

      <Typography
        mt={2}
        fontWeight={400}
        fontSize={14}
        color="#414158"
        sx={{ textAlign: "center" }}
      >
        Hammer ocean next were supervisor seat first-order hurting version
        teeth. Squad hard dive will reality terms and conditions effects
        expectations skulls. Impact.
      </Typography>
    </Box>
  );
};

const StyledButton = styled(Button)({
  backgroundColor: "#3d8bff",
  color: "#fff",
  borderRadius: "24px",
  padding: "10px 24px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: "500",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",

  "&:hover": {
    backgroundColor: "#3b7ce7",
  },
});

export default BookingForm;
