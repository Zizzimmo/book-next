"use client";
import { Box, Typography, ListItem, ListItemButton, ListItemText, Button, styled } from '@mui/material';
import { useState } from 'react';
import moment, { Moment } from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { TfiTimer } from 'react-icons/tfi';
import { Calendar, momentLocalizer } from 'react-big-calendar'; // Importing from react-big-calendar
import ConfirmationModal from './ConfirmationModal';

const localizer = momentLocalizer(moment);

const BookingComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Moment | null>(null);
  const [open, setOpen] = useState(false);

  // Define start and end times, and interval
  const startTime: Moment = moment().set({ hour: 7, minute: 0 });
  const endTime: Moment = moment().set({ hour: 17, minute: 0 }); // 05:00 PM

  // Function to generate time slots
  const generateTimeSlots = (start: Moment, end: Moment, interval: number): Moment[] => {
    const slots: Moment[] = [];
    let currentTime = start;
    while (currentTime.isBefore(end)) {
      slots.push(currentTime.clone());
      currentTime.add(interval, 'minutes');
    }
    return slots;
  };

  const timeSlots: Moment[] = generateTimeSlots(startTime, endTime, 60); // 1-hour intervals

  // Handle date selection from calendar
  const handleDateSelect = (slotInfo: { start: Date; end: Date }) => {
    setSelectedDate(slotInfo.start);
    setSelectedTime(null); // Reset time when date changes
  };

  // Handle time selection
  const handleTimeSelect = (time: Moment) => {
    setSelectedTime(time);
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    alert(
      `Booked on ${moment(selectedDate).format('LL')} at ${selectedTime?.format('hh:mm A') || 'N/A'}`
    );
    setOpen(true);
  };

  // Handle login button click
  const handleLoginClick = () => {
    console.log('Login clicked');
    setOpen(false);
  };

  return (
    <>
      <Box maxWidth={1000} mx="auto">
        <Typography
          variant="h3"
          fontWeight={700}
          className="text-[#171717] font-bold text-[32px] text-center mb-1"
          sx={{ marginTop: '20px' }}
        >
          Schedule Your FREE Class
        </Typography>
        <Typography
          mt={2}
          className="text-[#414158] font-bold text-[32px] text-center mb-4"
        >
          Lorem ipsum dolor
        </Typography>
        <Box className="flex flex-col md:flex-row w-full" gap={4} padding={4}>
          {/* Date Picker (Calendar) Section */}
          <Box className="md:w-1/2 p-4">
            <Box display="grid" justifyContent="center" width="100%">
              <Typography
                variant="subtitle1"
                align="center"
                color="#414158"
                className="bg-blue-100 py-2 flex gap-2 justify-center items-center font-medium"
                sx={{ width: '100%', padding: '8px', textAlign: 'center' }}
              >
                <IoCalendarNumberOutline />
                Select a date
              </Typography>
              <Box className="calendar-container" width="100%">
                {/* React Big Calendar */}
                <Calendar
                  localizer={localizer}
                  events={[]} // No events for now, this will be handled dynamically
                  selectable={true}
                  onSelectSlot={handleDateSelect}
                  defaultView="month"
                  views={['month', 'week', 'day']}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 400 }}
                />
              </Box>
            </Box>
          </Box>

          {/* Time Selection Section */}
          <Box className="md:w-1/2 p-4">
            <Typography
              variant="subtitle1"
              align="center"
              color="#414158"
              className="bg-blue-100 py-2 flex gap-2 justify-center items-center font-medium"
            >
              <TfiTimer /> Select a time
            </Typography>

            {/* Time Slots */}
            <Box className="grid grid-cols-3 md:flex md:flex-wrap gap-1">
              {timeSlots.map((time, index) => (
                <ListItem key={index} disablePadding sx={{ width: 'auto' }}>
                  <ListItemButton
                    selected={selectedTime === time}
                    onClick={() => handleTimeSelect(time)}
                    className={`rounded-lg !hover:bg-blue-50 ${selectedTime === time ? '!bg-blue-500 !text-white' : '!bg-[#DBDCF0]'}`}
                    sx={{
                      minWidth: '80px',
                      textAlign: 'center',
                    }}
                  >
                    <ListItemText primary={time.format('hh:mm A')} className="text-center" />
                  </ListItemButton>
                </ListItem>
              ))}
            </Box>
          </Box>
        </Box>

        {selectedTime && (
          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Please review and confirm your schedule
            </Typography>
            <StyledButton onClick={handleConfirmBooking}>Confirm Schedule</StyledButton>
          </Box>
        )}
      </Box>

      <ConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        title="Your class has been successfully booked!"
        imageSrc="/assets/Layer1.png"
        details={{
          Subject: 'Math',
          Date: moment(selectedDate).format('LL'),
          Time: selectedTime ? selectedTime.format('hh:mm A') : 'N/A',
        }}
        actionLinkText="Login"
        onActionLinkClick={handleLoginClick}
        message="to your account to see the details of your upcoming meeting/class"
      />
    </>
  );
};

const StyledButton = styled(Button)(() => ({
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
}));

export default BookingComponent;
