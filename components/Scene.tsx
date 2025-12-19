
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { ChristmasTree } from './ChristmasTree';
import { OrnamentType } from '../types';

interface SceneProps {
  onOrnamentClick: (type: OrnamentType) => void;
}

export const Scene: React.FC<SceneProps> = ({ onOrnamentClick }) => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 10, 25]} fov={40} />
      <color attach="background" args={['#020617']} />
      
      <Suspense fallback={null}>
        <ChristmasTree onOrnamentClick={onOrnamentClick} />
        
        {/* Environment and Lighting */}
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Post Processing for cinematic feel */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Suspense>

      <OrbitControls 
        enablePan={false} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 1.5} 
        minDistance={10} 
        maxDistance={40} 
        autoRotate 
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};
