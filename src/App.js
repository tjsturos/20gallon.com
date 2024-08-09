import React from 'react';
import { styled } from '@mui/system';
import Gallery from './components/Gallery';

// Import images
import alaskaImg from './assets/images/alaska-1.png';
import idahoImg from './assets/images/idaho-1.png';
import michiganImg from './assets/images/michigan-1.png';
import missouriImg from './assets/images/missouri-1.png';
import nebraskaImg from './assets/images/nebraska-1.png';
import northDakotaImg from './assets/images/north-dakota-1.png';
import oregonImg from './assets/images/oregon-1.png';
import southDakotaImg from './assets/images/south-dakota-1.png';
import utahImg from './assets/images/utah-1.png';
import vermontImg from './assets/images/vermont-1.png';

const FullWidthContainer = styled('div')({
  maxWidth: '100% !important',
  padding: 0,
  height: '100vh',
});

const urls = [
  { url: alaskaImg, type: 'image', title: 'Alaska', description: 'A beautiful view of Alaska.', link: 'https://example.com/alaska', shop: 'https://example.com/shop-alaska' },
  { url: idahoImg, type: 'image', title: 'Idaho', description: 'A beautiful view of Idaho.', link: 'https://example.com/idaho', shop: 'https://example.com/shop-idaho' },
  { url: michiganImg, type: 'image', title: 'Michigan', description: 'A beautiful view of Michigan.', link: 'https://example.com/michigan', shop: 'https://example.com/shop-michigan' },
  { url: missouriImg, type: 'image', title: 'Missouri', description: 'A beautiful view of Missouri.', link: 'https://example.com/missouri', shop: 'https://example.com/shop-missouri' },
  { url: nebraskaImg, type: 'image', title: 'Nebraska', description: 'A beautiful view of Nebraska.', link: 'https://example.com/nebraska', shop: 'https://example.com/shop-nebraska' },
  { url: northDakotaImg, type: 'image', title: 'North Dakota', description: 'A beautiful view of North Dakota.', link: 'https://example.com/north-dakota', shop: 'https://example.com/shop-north-dakota' },
  { url: oregonImg, type: 'image', title: 'Oregon', description: 'A beautiful view of Oregon.', link: 'https://example.com/oregon', shop: 'https://example.com/shop-oregon' },
  { url: southDakotaImg, type: 'image', title: 'South Dakota', description: 'A beautiful view of South Dakota.', link: 'https://example.com/south-dakota', shop: 'https://example.com/shop-south-dakota' },
  { url: utahImg, type: 'image', title: 'Utah', description: 'A beautiful view of Utah.', link: 'https://example.com/utah', shop: 'https://example.com/shop-utah' },
  { url: vermontImg, type: 'image', title: 'Vermont', description: 'A beautiful view of Vermont.', link: 'https://example.com/vermont', shop: 'https://example.com/shop-vermont' },
];

const App = () => (
  <FullWidthContainer>
    <Gallery urls={urls} />
  </FullWidthContainer>
);

export default App;