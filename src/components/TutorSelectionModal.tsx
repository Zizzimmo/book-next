import { useState } from 'react';
import ReusableModal from './ReusableModal';
import { Typography, Button, styled, Box, useMediaQuery } from '@mui/material';
import { IconContext } from 'react-icons';
import { FaRegFileAlt, FaOpencart, FaChalkboardTeacher, FaCode, FaDraftingCompass, FaCheckSquare } from 'react-icons/fa';
import { TbMoodKid, TbSquareRoot2 } from 'react-icons/tb';
import { IoLanguageOutline, IoCarOutline, IoHomeOutline, IoGridOutline } from 'react-icons/io5';
import { CgBoy, CgGym } from 'react-icons/cg';
import { PiCookingPot } from 'react-icons/pi';
import { CiBasketball, CiMusicNote1 } from 'react-icons/ci';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import BookingFormContent from './BookingFormContent';

interface TutorSelectionModalProps {
  open: boolean;
  onClose: () => void;
}

const TutorSelectionModal = ({ open, onClose }: TutorSelectionModalProps) => {
  const [view, setView] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const isMobile = useMediaQuery('(max-width:600px)');

  // Handle next view
  const handleNextView = () => {
    if (isValidSelection(view)) {
      setView((prev) => prev + 1);
    }
  };

  // Handle previous view
  const handlePrevView = () => {
    setView((prev) => prev - 1);
  };

  // Check if the selection is valid for the current view
  const isValidSelection = (view: number): boolean => {
    const selections = selectedOptions[view];
    switch (view) {
      case 1:
        return selections.length > 0; // At least one option selected
      case 2:
        return selections.length === 1 || (selections.length === 2 && selections.includes('Specialized Subjects')); // One or two selections, with "Specialized Subjects" as one
      case 3:
        return selections.length === 1; // Only one selection allowed
      default:
        return true; // View 4 is not relevant for selection validation
    }
  };

const handleOptionClick = (view: number, label: string) => {
  setSelectedOptions((prev) => {
    const currentSelections = prev[view];
    const isSelected = currentSelections.includes(label);

    if (view === 1) {
      // Multiple selection allowed in View 1
      return {
        ...prev,
        [view]: isSelected ? currentSelections.filter((item) => item !== label) : [...currentSelections, label],
      };
    }

    if (view === 2) {
      // For View 2, allow "Specialized Subjects" and one grade or just one grade
      if (label === 'Specialized Subjects (Music, Coding, Language)') {
        // If selecting/deselecting "Specialized Subjects", add/remove it
        if (isSelected) {
          return {
            ...prev,
            [view]: currentSelections.filter((item) => item !== label),
          };
        }
        return {
          ...prev,
          [view]: [...currentSelections, label],
        };
      }

      // If selecting a grade level, ensure no other grades are selected unless "Specialized Subjects" is selected
      if (['Pre-K to Grade 3', 'Grades 4 — 8', 'Grades 9 — 12'].includes(label)) {
        // Check if a grade level is already selected
        const gradeSelected = currentSelections.some((item) =>
          ['Pre-K to Grade 3', 'Grades 4 — 8', 'Grades 9 — 12'].includes(item)
        );

        // Don't allow selecting multiple grade levels unless "Specialized Subjects" is selected
        if (gradeSelected && !currentSelections.includes('Specialized Subjects (Music, Coding, Language)')) {
          // If a grade is selected and "Specialized Subjects" is not in the selection, prevent adding another grade
          return prev;
        }

        // Allow the grade selection if it’s not already selected
        if (isSelected) {
          return {
            ...prev,
            [view]: currentSelections.filter((item) => item !== label),
          };
        }

        return {
          ...prev,
          [view]: [...currentSelections, label],
        };
      }
    }

    if (view === 3) {
      // Only one selection allowed for View 3
      return {
        ...prev,
        [view]: [label], // Ensure only one selection is made
      };
    }

    return prev;
  });
};

  const viewContent: Record<number, { title: string; subtitle: string; options: { icon: JSX.Element; label: string }[] | JSX.Element }> = {
    1: {
      title: 'What area does your child need assistance with?',
      subtitle: "Let's set up a free trial session with the perfect tutor!",
      options: [
        { icon: <TbSquareRoot2 />, label: 'Maths' },
        { icon: <CgGym />, label: 'Gym/Sports' },
        { icon: <IoLanguageOutline />, label: 'Languages' },
        { icon: <FaRegFileAlt />, label: 'Examinations' },
        { icon: <PiCookingPot />, label: 'Culinary' },
        { icon: <CiBasketball />, label: 'Life/Skills' },
        { icon: <IoCarOutline />, label: 'Driving' },
        { icon: <HiOutlineComputerDesktop />, label: 'Computing' },
        { icon: <CiMusicNote1 />, label: 'Music' },
        { icon: <FaOpencart />, label: 'Arts/Craft' },
      ],
    },
    2: {
      title: 'Which school level is your child currently in?',
      subtitle: "Let's help you find the perfect tutor for your child",
      options: [
        { icon: <TbMoodKid />, label: 'Pre-K to Grade 3' },
        { icon: <CgBoy />, label: 'Grades 4 — 8' },
        { icon: <FaChalkboardTeacher />, label: 'Grades 9 — 12' },
        { icon: <FaCode />, label: 'Specialized Subjects (Music, Coding, Language)' },
      ],
    },
    3: {
      title: 'What is the main goal for getting a tutor?',
      subtitle: 'We want to ensure we find the right tutor for your child',
      options: [
        { icon: <FaCheckSquare />, label: 'Improve grades' },
        { icon: <FaDraftingCompass />, label: 'Prepare for exams' },
        { icon: <IoHomeOutline />, label: 'Assist with homework' },
        { icon: <IoGridOutline />, label: 'Other reasons' },
      ],
    },
    4: {
      title: 'Book a free (subject) class with us',
      subtitle: 'Limited spots available',
      options: <BookingFormContent />,
    },
  };

  const { title, subtitle, options } = viewContent[view];

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title={
        <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
          <Button onClick={handlePrevView} sx={{ padding: 0, position: 'absolute', left: 0 }}>
            <span style={{ fontSize: '16px' }}>←</span>
          </Button>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              fontSize={isMobile ? '14px' : '20px'}
              color="#171717"
              fontWeight="bold"
              sx={{
                whiteSpace: 'nowrap', // Prevent wrapping
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={isMobile ? '10px' : '14px'} // Adjusted font size
              color="#414158"
              sx={{
                whiteSpace: 'nowrap', // Prevent wrapping
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>
      }
      actions={view === 4 ? (
        <StyledButton variant="contained" onClick={handlePrevView}>
          Back
        </StyledButton>
      ) : (
        <StyledButton variant="contained" onClick={handleNextView} disabled={!isValidSelection(view)}>
          Continue
        </StyledButton>
      )}
    >
      {Array.isArray(options) ? (
        <Box display="grid" gridTemplateColumns={isMobile ? '1fr' : 'repeat(2, 1fr)'} gap={2} mt={2}>
          {options.map((option, index) => {
            const isSelected = selectedOptions[view].includes(option.label);
            return (
              <StyledOption
                key={index}
                onClick={() => handleOptionClick(view, option.label)}
                selected={isSelected}
              >
                <IconContext.Provider value={{ size: isMobile ? '1.2em' : '1.5em', style: { marginRight: '8px' } }}>
                  {option.icon}
                </IconContext.Provider>
                {option.label}
              </StyledOption>
            );
          })}
        </Box>
      ) : (
        <Box mt={2}>{options}</Box>
      )}
    </ReusableModal>
  );
};

const StyledOption = styled(Button)<{ selected?: boolean }>(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #DBDCF0',
  borderRadius: '8px',
  backgroundColor: selected ? '#3d8bff' : 'white',
  color: selected ? '#fff' : '#333',
  fontWeight: '500',
  fontSize: '16px',
  textAlign: 'left',
  '&:hover': {
    backgroundColor: selected ? '#3b7ce7' : '#DBDCF0',
  },
}));

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

export default TutorSelectionModal;
