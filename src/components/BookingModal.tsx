/* eslint-disable react/prop-types */
"use client";
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation'; // Use useRouter instead of useNavigate
import axios from 'axios';

// Define the props interface
interface BookingModalProps {
  onClose?: () => void;
  open?: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose = () => {}, open = true }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [childGrade, setChildGrade] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter(); 

  const studentSignUpUrl = "https://Testbackend.educify.org/api/api/v1/students/students/signup";
  const studentVerifyOtpUrl = "https://Testbackend.educify.org/api/api/v1/students/verfiy-otp";
  const studentSendOtpUrl = "https://Testbackend.educify.org/api/api/v1/students/send-otp";

  // Function to send OTP
  const SendOtp = async () => {
    const data = { phoneNumber };
    try {
      const response = await axios.post(studentSendOtpUrl, data);
      console.log("OTP sent successfully:", response.data);
    } catch (error: any) {
      console.error("Error during sending OTP:", error.response ? error.response.data : error.message);
    }
  };

  // Function to verify OTP
  const VerifyOtp = async () => {
    const data = { phoneNumber, otp };
    try {
      const response = await axios.post(studentVerifyOtpUrl, data);
      console.log("OTP verified:", response.data);
    } catch (error: any) {
      console.error("Error during OTP verification:", error.response ? error.response.data : error.message);
    }
  };

  // Function to sign up the student
  const SignUp = async () => {
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

  // Handle sending OTP
  const handleSendOtp = () => {
    SendOtp();
  };

  // Handle form submission
  const handleSubmit = () => {
    if (password === confirmPassword) {
      console.log('Form submitted:', {
        name,
        email,
        subject,
        phoneNumber,
        otp,
        password,
        confirmPassword,
      });
      SignUp();
      onClose(); // Close modal after submission
    } else {
      console.error("Passwords don't match.");
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      scroll="body"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          height: '650px',
          maxHeight: '90vh',
          borderRadius: 10,
        },
      }}
    >
      {/* Position the close button outside the overlay */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 20,
          right: '50%',
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: 3,
          zIndex: 1301,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        fontWeight={700}
        fontSize={{ xs: '24px', sm: '32px' }} // Responsive font size
        color="#171717"
        sx={{ textAlign: 'center' }}
      >
        Book a free (subject) class with us
      </DialogTitle>
      <Typography
        fontWeight={500}
        fontSize={{ xs: '14px', sm: '16px' }} // Responsive font size
        color="#414158"
        sx={{ textAlign: 'center' }}
      >
        Limited spots available
      </Typography>
      <DialogContent
        sx={{
          height: 'calc(500px - 128px)',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
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
        />

        <Stack
          gap={4}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="space-between"
          sx={{ mt: 4 }}
        >
          <FormControl fullWidth margin="dense" size="small">
            <InputLabel>Choose Subject*</InputLabel>
            <Select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Math">Math</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" size="small">
            <InputLabel>Child Grade/Class in School*</InputLabel>
            <Select
              value={childGrade}
              onChange={(e) => setChildGrade(e.target.value)}
            >
              <MenuItem value="Grade 1">Grade 1</MenuItem>
              <MenuItem value="Grade 2">Grade 2</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <TextField
          margin="dense"
          label="Parents Mobile Number*"
          type="text"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          InputProps={{
            endAdornment: (
              <Box className="w-32 flex justify-end">
                <Button
                  sx={{ bgcolor: '#3198F5', color: 'white' }}
                  fullWidth
                  onClick={handleSendOtp}
                >
                  Send OTP
                </Button>
              </Box>
            ),
          }}
          size="small"
        />
        <TextField
          margin="dense"
          label="OTP from SMS*"
          type="text"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          size="small"
          InputProps={{
            endAdornment: (
              <Box className="w-32 flex justify-end">
                <Button
                  sx={{ bgcolor: '#3198F5', color: 'white' }}
                  fullWidth
                  onClick={VerifyOtp}
                >
                  Verify
                </Button>
              </Box>
            ),
          }}
        />

        <Stack
          gap={4}
          direction={{ xs: 'column', sm: 'row' }}
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
          />
          <TextField
            margin="dense"
            label="Confirm Password*"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            size="small"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', display: 'grid' }}>
        <StyledButton
          sx={{ maxWidth: 300, mx: 'auto' }}
          onClick={handleSubmit} // Call handleSubmit on button click
        >
          Schedule a Free Class
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

const StyledButton = styled(Button)({
  backgroundColor: '#3d8bff',
  color: '#fff',
  borderRadius: '24px',
  padding: '10px 24px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '500',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',

  '&:hover': {
    backgroundColor: '#3b7ce7',
  },
});

export default BookingModal;
