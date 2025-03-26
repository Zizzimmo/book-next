"use client";
import styled from '@emotion/styled';
import { Box, Button, ImageListItem, Stack, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
import TutorSelectionModal from './TutorSelectionModal';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

interface MyCardProps {
  headingText: string;
  paragraphText: string;
  imageUrl?: string;
}

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #F6515B 0%, #A040C1 51.11%, #2F89FD 100%)',
  borderRadius: 40,
  color: '#fff',
  padding: '12px 20px',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(to right, #ff4080, #008cff)',
  },
}));

const MyCard: React.FC<MyCardProps> = ({ headingText, paragraphText, imageUrl }) => {
  const [activeImage, setActiveImage] = useState('Rectangle.png');
  const [isModalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Handle image switch every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prevImage) =>
        prevImage === 'Rectangle.png' ? 'learning.jpg' : 'Rectangle.png'
      );
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setActiveImage('learning.jpg'), // Swipe left to next image
    onSwipedRight: () => setActiveImage('Rectangle.png'), // Swipe right to previous image
  });

  return (
    <>
      <Box
        className="container"
        maxWidth="xl"
        margin={0}
        padding={{ xs: '8px', sm: '24px', md: '32px' }}  // Reduced padding in mobile view
      >
        <Stack
          spacing={{ xs: 2, sm: 4, md: 8 }}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="stretch"
          justifyContent="center"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'stretch',
            gap: { xs: 2, sm: 4 },  // Added some space between image and content on mobile view
          }}
        >
          {/* Image List */}
          <ImageListItem
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '50%' },
              height: 'auto', // Ensures that the image grows in height proportionally
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
            {...swipeHandlers} // Apply swipe handlers only on mobile view
          >
            <Image
              className="rounded-lg"
              src={`/${activeImage}`}
              alt={headingText}
              style={{
                borderRadius: '12px',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </ImageListItem>

          {/* Card Content */}
          <CardContent
            sx={{
              textAlign: 'center',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1, // Ensures content and image are the same height
              maxWidth: { xs: '100%', sm: '50%' },  // 100% width on mobile for content
              padding: { xs: '16px', sm: '24px' }, // Slightly reduced padding on mobile
            }}
          >
            <Typography
              color="#171717"
              fontWeight={700}
              fontSize={{ xs: '20px', sm: '24px', md: '26px' }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {headingText}
            </Typography>
            <Typography
              color="#414158"
              fontWeight={400}
              fontSize={{ xs: '14px', sm: '16px', md: '18px' }}
              variant="body2"
            >
              {paragraphText}
            </Typography>
          </CardContent>
        </Stack>

        <Box className="mx-auto" pt={{ xs: 4, sm: 6, md: 8 }} textAlign="center">
          <GradientButton variant="contained" onClick={handleModalOpen}>
            Book a Free Class
          </GradientButton>
        </Box>

        {/* Image Navigation Dots */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: activeImage === 'Rectangle.png' ? '#F6515B' : '#ddd',
                transition: 'background-color 0.3s ease',
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: activeImage === 'learning.jpg' ? '#F6515B' : '#ddd',
                transition: 'background-color 0.3s ease',
              }}
            />
          </Box>
        </Box>
      </Box>

      {isModalOpen && <TutorSelectionModal open={isModalOpen} onClose={() => setModalOpen(false)} />}
      {open && <BookingModal onClose={handleClose} open={open} />}
    </>
  );
};

export default MyCard;
