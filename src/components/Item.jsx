import React, { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const asciiShapes = [
  '¯\\_(ツ)_/¯',
  '(╯°□°）╯︵ ┻━┻',
  '┬─┬ ノ( ゜-゜ノ)',
  '(•_•) ( •_•)>⌐■-■ (⌐■_■)',
  'ಠ_ಠ',
  '(づ｡◕‿‿◕｡)づ',
  'ʕ•ᴥ•ʔ',
  '(ง ͠° ͟ل͜ ͡°)ง',
  '⎝ᄽ⏝⏠⎠',
  '⎝⏠⏝⏠⎠',
];

const getRandomAsciiShape = () => {
  const randomIndex = Math.floor(Math.random() * asciiShapes.length);
  return asciiShapes[randomIndex];
};

const Item = ({ src, type, style }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const handleIframeLoad = (event) => {
    const iframe = event.target;
    try {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      if (iframeDocument.body.innerHTML.includes('404')) {
        setError(true);
      }
    } catch (e) {
      // Cross-origin error, assume the iframe loaded correctly
    }
  };

  return (
    <div className="full-page-item show">
      {error ? (
        <Box sx={{ textAlign: 'center', position: 'relative', width: '100%', height: '100%' }}>
          <Typography variant="h1" component="div" sx={{ fontFamily: 'monospace' }}>
            404
          </Typography>
          <Typography variant="h6" component="div">
            Oops, this link is broken!
          </Typography>
          {Array.from({ length: 10 }).map((_, index) => (
            <Typography
              key={index}
              variant="body1"
              component="div"
              sx={{
                position: 'absolute',
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
                fontFamily: 'monospace',
              }}
            >
              {getRandomAsciiShape()}
            </Typography>
          ))}
        </Box>
      ) : (
        type === 'image' ? (
          <img src={src} alt="Gallery Item" style={style} />
        ) : (
          <iframe src={src} title="Gallery Item" style={style} />
        )
      )}
    </div>
  );
};

export default Item;