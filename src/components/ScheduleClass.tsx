/* eslint-disable react/no-unescaped-entities */
import { CalendarViewDayRounded } from '@mui/icons-material'
import {
  Button,
  Typography,
  Card,
  ToggleButton,
  Box,
  styled,
} from '@mui/material'

const ScheduleClass = () => {
  const times = Array(12).fill('07:00 PM')
  const dates = Array(12).fill(1) // Example dates to represent availability in the grid

  return (
    <div className='flex flex-col items-center justify-center '>
      <Typography
        variant='h3'
        fontWeight={700}
        className='text-[#171717] font-bold text-[32px] text-center mb-2'
      >
        Schedule Your FREE Class
      </Typography>
      <Typography
        mt={4}
        className='text-[#414158] font-bold text-[32px] text-center mb-4'
      >
        Lorem ipsum dolor
      </Typography>

      <div className='flex flex-col items-center  py-8'>
        <div className='flx w-full  grid grid-cols-2 flexwrap gap-8'>
          {/* Date Picker Section */}
          <Card className='w-full !shadow-none rounded-xl '>
            <Typography
              variant='subtitle1'
              align='center'
              color='#414158'
              className='bg-blue-100 py-2  font-medium'
            >
              <span className='material-icons mr-1'>
                <CalendarViewDayRounded />{' '}
              </span>{' '}
              Select a date
            </Typography>
            <Box className='mt-2 text-center'>
              <Typography variant='h6' className='font-bold text-gray-800'>
                SEP 2024
              </Typography>
              <Box className='grid grid-cols-7 gap-2 mt-4 text-center'>
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(
                  (day, index) => (
                    <Typography
                      key={index}
                      className='text-gray-600 font-medium text-sm'
                    >
                      {day}
                    </Typography>
                  )
                )}
                {dates.map((_, index) => (
                  <Box
                    key={index}
                    className='text-center p-2 rounded-full  text-gray-500 font-semibold cursor-pointer hover:bg-blue-200'
                  >
                    1
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>

          <Card className='w-full  !shadow-none rounded-xl '>
            <Typography
              variant='subtitle1'
              align='center'
              color='#414158'
              className='bg-blue-100 py-2  font-medium'
            >
              <span className='material-icons mr-1'>
                <CalendarViewDayRounded />{' '}
              </span>{' '}
              Select a time
            </Typography>
            <Box className='mt-2 text-center'>
              <Typography variant='h6' className='font-bold text-gray-800'>
                TIME ZONE: (UTC +01:00 West Central Africa)
              </Typography>
              <Box className='grid grid-cols-7 gap-2 mt-4 px-4 text-center'>
                {times.map((time, index) => (
                  <ToggleButton
                    key={index}
                    value={time}
                    className='rounded-lg text-gray-700 border border-gray-300 hover:bg-blue-50 focus:bg-blue-100'
                  >
                    {time}
                  </ToggleButton>
                ))}
              </Box>
            </Box>
          </Card>

          {/* Time Picker Section */}
        </div>
      </div>

      <p className='text-[#414158] font-semibold test-[16px] text-center max-w-[700px] '>
        It's at picture circle meeting giant. Working weeks an these silently
        an. Deck know cross-pollination back other I quick anyway.
      </p>
      <StyledButton
        sx={{ maxWidth: 300, mx: 'auto' }}
        //   oonClick={handleSubmit}
        // onClick={() => navigate('/bookclass')}
        // disabled
      >
        Confirm Schedule
      </StyledButton>
    </div>
  )
}

const StyledButton = styled(Button)({
  backgroundColor: '#3d8bff', // Set blue color
  color: '#fff', // White text color
  borderRadius: '24px', // Rounded corners to match the image
  padding: '10px 24px', // Adjust padding for size
  textTransform: 'none', // Remove uppercase transformation
  fontSize: '16px', // Set font size for readability
  fontWeight: '500', // Font weight for better readability
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', // Subtle shadow for depth

  '&:hover': {
    backgroundColor: '#3b7ce7', // Slightly darker shade on hover
  },
})

export default ScheduleClass
