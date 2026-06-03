import FlyingPosters from '../../components/FlyingPosters';

const items = [
  'https://picsum.photos/500/500?grayscale', 
  'https://picsum.photos/600/600?grayscale', 
  'https://picsum.photos/400/400?grayscale'
];

export default function AboutHero() {
    return (

<div style={{ height: '600px', position: 'relative' }}>
  <FlyingPosters items={items}
  items={["https://picsum.photos/500/500?grayscale","https://picsum.photos/600/600?grayscale","https://picsum.photos/400/400?grayscale"]}
  planeWidth={320}
  planeHeight={320}
  distortion={3}
  scrollEase={0.01}
  cameraFov={45}
  cameraZ={20}
/>
</div>
    )}