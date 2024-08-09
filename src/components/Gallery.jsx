import React, { useState, useEffect, useCallback } from 'react';
import Item from './Item';
import { IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

const Gallery = ({ urls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const [isInactive, setIsInactive] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenDimension, setFullScreenDimension] = useState('100vh');
  const [waveActive, setWaveActive] = useState(false);

  const getItemIndex = useCallback((index) => {
    if (index < 0) return urls.length + index;
    if (index >= urls.length) return index - urls.length;
    return index;
  }, [urls.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => getItemIndex(prevIndex - 1));
  }, [getItemIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => getItemIndex(prevIndex + 1));
  }, [getItemIndex]);

  useEffect(() => {
    const handleInactivity = () => {
      setShowArrows(false);
      setIsInactive(true);
    };

    const resetInactivityTimer = () => {
      setShowArrows(true);
      setIsInactive(false);
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleInactivity, 15000);
    };

    let inactivityTimer = setTimeout(handleInactivity, 15000);
    window.addEventListener('mousemove', resetInactivityTimer);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetInactivityTimer);
    };
  }, []);

  useEffect(() => {
    let slideshowTimer;
    if (isInactive) {
      slideshowTimer = setInterval(handleNext, 5000);
    } else {
      clearInterval(slideshowTimer);
    }
    return () => clearInterval(slideshowTimer);
  }, [isInactive, handleNext]);

  const toggleFullScreen = useCallback((e) => {
    if (e) {
      e.stopPropagation(); // Prevent event from bubbling up
    }
    setIsFullScreen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isFullScreen) {
        toggleFullScreen();
      }
    };

    if (isFullScreen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullScreen, toggleFullScreen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > window.innerHeight) {
        setFullScreenDimension('100vh');
      } else {
        setFullScreenDimension('100vw');
      }
    };

    handleResize(); // Set initial dimension
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWaveActive(true);
      setTimeout(() => setWaveActive(false), 15000); // Wave duration
    }, 45000); // Interval between waves

    return () => clearInterval(waveInterval);
  }, []);

  const renderCarouselItem = (index, position) => {
    const itemIndex = getItemIndex(index);
    const { url, type, title } = urls[itemIndex];
    return (
      <div 
        className={`carousel-item ${position}`} 
        onClick={() => position === 'center' ? toggleFullScreen() : setCurrentIndex(itemIndex)}
      >
        {title && (
          <div className="item-title-container">
            <div className="item-title">{title.toUpperCase()}</div>
          </div>
        )}
        <Item 
          src={url} 
          type={type} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: position === 'center' ? 'calc(90vh - 80px)' : 'calc(80vh - 80px)', 
            objectFit: 'contain' 
          }}
        />
      </div>
    );
  };

  const handleFullScreenPrev = (e) => {
    e.stopPropagation();
    handlePrev();
  };

  const handleFullScreenNext = (e) => {
    e.stopPropagation();
    handleNext();
  };

  const renderFullScreenInfo = () => {
    const currentItem = urls[currentIndex];
    return (
      <div className="fullscreen-info">
        {currentItem.title && <Typography variant="h6">{currentItem.title}</Typography>}
        {currentItem.description && <Typography variant="body2">{currentItem.description}</Typography>}
        <div className="fullscreen-info-buttons">
          {currentItem.link && (
            <Button variant="contained" color="primary" href={currentItem.link} size="small">
              Learn More
            </Button>
          )}
          {currentItem.shop && (
            <Button variant="contained" color="secondary" href={currentItem.shop} size="small">
              Shop
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`full-page-container ${waveActive ? 'wave-active' : ''}`}>
      <div className="carousel-container">
        {renderCarouselItem(currentIndex - 1, 'left')}
        {renderCarouselItem(currentIndex, 'center')}
        {renderCarouselItem(currentIndex + 1, 'right')}

        {!isFullScreen && (
          <>
            <IconButton onClick={handlePrev} className="nav-button prev-button" sx={{ opacity: showArrows ? 1 : 0 }}>
              <ArrowBackIcon />
            </IconButton>
            
            <IconButton onClick={handleNext} className="nav-button next-button" sx={{ opacity: showArrows ? 1 : 0 }}>
              <ArrowForwardIcon />
            </IconButton>
          </>
        )}
      </div>

      {isFullScreen && (
        <div className="fullscreen-overlay" onClick={toggleFullScreen}>
          <div className="fullscreen-content">
            <div className="fullscreen-image-container">
              <Item 
                src={urls[currentIndex].url} 
                type={urls[currentIndex].type} 
                style={{ 
                  maxWidth: '100vw', 
                  maxHeight: '100vh', 
                  width: 'auto', 
                  height: fullScreenDimension,
                  objectFit: 'contain'
                }}
              />
              <IconButton 
                className="fullscreen-nav-button fullscreen-prev-button" 
                onClick={handleFullScreenPrev}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton 
                className="fullscreen-nav-button fullscreen-next-button" 
                onClick={handleFullScreenNext}
              >
                <ArrowForwardIcon />
              </IconButton>
            </div>
            {renderFullScreenInfo()}
          </div>
          <IconButton 
            className="close-button" 
            onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Gallery;