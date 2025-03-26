/* eslint-disable react/prop-types */
"use client";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Define the props interface
interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  imageSrc?: string;
  details?: Record<string, string>;
  actionLinkText?: string;
  onActionLinkClick?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  title = 'Your free class has been booked!',
  message = 'Login to your account to see the details of your upcoming meeting/class',
  imageSrc = '',
  details = {},
  actionLinkText = 'Login',
  onActionLinkClick,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '24px',
          padding: '16px',
          backgroundColor: 'gray.200',
          color: 'white',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        aria-label='close'
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'white',
          backgroundColor: '#1E2A5E',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#1E2A5E',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        {/* Title */}
        <Typography
          variant='h5'
          align='center'
          sx={{
            fontWeight: 700,
            fontSize: '1.5rem',
            marginBottom: '16px',
            color: '#171717',
          }}
        >
          {title}
        </Typography>

        {/* Illustration */}
        <Box display='flex' justifyContent='center' mb={2}>
          <img
            src={imageSrc}
            alt='Confirmation Illustration'
            style={{ maxWidth: '80%', borderRadius: '12px' }}
          />
        </Box>

        {/* Details Section */}
        {Object.keys(details).length > 0 && (
          <Box
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '16px',
              color: '#1E2A5E',
              mb: 3,
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: 700,
                fontSize: '16px',
                color: '#171717',
                mb: 2,
              }}
            >
              Class details
            </Typography>
            {Object.entries(details).map(([key, value], index) => (
              <Box
                display='flex'
                justifyContent='space-between'
                mb={1}
                key={index}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#414158',
                  }}
                  variant='body2'
                >
                  {key}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#171717',
                  }}
                  variant='body2'
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Additional Message */}
        <Typography
          align='center'
          variant='body2'
          sx={{ color: '#414158', fontWeight: 400, fontSize: '16px' }}
        >
          <span
            style={{
              color: '#3198F5',
              fontWeight: 400,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={onActionLinkClick}
          >
            {actionLinkText}
          </span>{' '}
          {message}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;