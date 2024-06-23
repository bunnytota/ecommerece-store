import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import LinearProgress from '@mui/material/LinearProgress';
import { client, urlFor } from '../lib/client'; // Ensure this path is correct

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper({ initialImages }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState([]);
  const [images, setImages] = useState(initialImages || []);
  const [loading, setLoading] = useState(true);
  const maxSteps = images.length;

  useEffect(() => {
    if (!initialImages || initialImages.length === 0) {
      client.fetch(`*[_type == "carousel"]{title, images[]{label, asset}}`)
        .then((data) => {
          console.log('Fetched data:', data);
          if (data && data.length > 0) {
            const fetchedImages = data[0].images.map(img => ({
              label: img.label,
              src: urlFor(img.asset).url()
            }));
            setImages(fetchedImages);
            setProgress(new Array(fetchedImages.length).fill(0));
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setProgress(new Array(initialImages.length).fill(0));
      setLoading(false);
    }
  }, [initialImages]);

  useEffect(() => {
    if (loading || maxSteps === 0) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = [...oldProgress];
        if (newProgress[activeStep] === 100) {
          handleNext();
          return newProgress.map((_, idx) => (idx === activeStep ? 0 : newProgress[idx]));
        }
        const diff = 100 / 120;
        newProgress[activeStep] = Math.min(newProgress[activeStep] + diff, 100);
        return newProgress;
      });
    }, 1000 / 60);

    return () => {
      clearInterval(timer);
    };
  }, [activeStep, loading, maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
    setProgress((prevProgress) => prevProgress.map((_, idx) => (idx === step ? 0 : prevProgress[idx])));
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (maxSteps === 0) {
    return <Box>No images available</Box>;
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: {
          xs: '30vh',
           sm:'40vh',// height for mobile devices
          md: '100vh',// height for larger devices
        '@media (min-width: 911px) and (max-width: 1024px)': {
            height: '43vh', // height for iPad
          },
      
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        mt: '73px',
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((step, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              aspectRatio: '16/10', // Maintain aspect ratio
              overflow: 'hidden',
            }}
          >
            {Math.abs(activeStep - index) <= 2 && (
              <Box
                component="img"
                src={step.src}
                alt={step.label}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Maintain aspect ratio
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'fallback_image_url';
                }}
              />
            )}
          </Box>
        ))}
      </AutoPlaySwipeableViews>
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
          borderRadius: 1,
        }}
      >
        {progress.map((value, index) => (
          <LinearProgress
            key={index}
            variant="determinate"
            value={value}
            sx={{
              width: '20%',
              marginX: 0.5,
              bgcolor: 'grey.700',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'white',
              },
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Button size="small" onClick={handleBack} sx={{ color: 'white' }}>
          <KeyboardArrowLeft />
        </Button>
        <Button size="small" onClick={handleNext} sx={{ color: 'white' }}>
          <KeyboardArrowRight />
        </Button>
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    const data = await client.fetch(`*[_type == "carousel"]{title, images[]{label, asset}}`);
    const images = (data && data.length > 0) ? data[0].images.map(img => ({
      label: img.label,
      src: urlFor(img.asset).url()
    })) : [];

    return {
      props: {
        initialImages: images,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialImages: [],
      },
    };
  }
}

export default SwipeableTextMobileStepper;
