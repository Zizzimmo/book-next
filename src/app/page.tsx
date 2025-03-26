import { Box } from '@mui/material';
import Logo from '../components/Logo';
// import ClassGrade from '../components/ClassGrade'
import MyCard from '../components/MyCard';
import Grade from '../components/Grade';

export default function Home() {
  return (
    <Box className="w-full h-full bg-white">
      <Box className='flex justify-center py-8'>
        <Logo />
      </Box>
      {/* <Box className=''>
        <ClassGrade />
      </Box> */}
      <Box className='' sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grade />
      </Box>
      <Box className='' margin={0}>
        <MyCard
          headingText='Affordable Pricing and Flexible Scheduling'
          paragraphText='We believe that quality education should be accessible to all, which is why we offer our services at affordable prices, making it easier for students like you to access high-quality tutoring without breaking the bank.'
        />
      </Box>
    </Box>
  );
}
