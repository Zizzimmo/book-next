import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
  dialogHeight?: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  dialogHeight = '650px',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      scroll="body"
      sx={{
        '& .MuiDialog-paper': {
          height: dialogHeight,
          maxHeight: '90vh',
          borderRadius: 10,
          padding: '16px',
          margin: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', 
          '@media (max-width:600px)': { 
            padding: '8px',
          },
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        size="small"
        sx={{
          position: 'absolute',
          top: -10,
          right: '50%',
          color: '#000',
          backgroundColor: '#fff',
          borderRadius: '50%',
          boxShadow: 3,
          zIndex: 1301,
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
          marginBottom: '16px',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Title */}
      {title && (
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 24,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '@media (max-width:600px)': {
              fontSize: 20, 
            },
          }}
        >
          {title}
        </DialogTitle>
      )}

      {/* Children */}
      <DialogContent
        sx={{
          height: 'calc(500px - 128px)',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          flexGrow: 1,
          '@media (max-width:600px)': { 
            height: 'calc(400px - 40px)',
          },
        }}
      >
        {children}
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ justifyContent: 'center', display: 'grid', marginTop: 'auto' }}>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default ReusableModal;
