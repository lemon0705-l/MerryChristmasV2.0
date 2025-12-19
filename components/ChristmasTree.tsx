
import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointLight, Float, MeshWobbleMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { OrnamentType, OrnamentData } from '../types';
import { Star, Ball, GiftBox, CandyCane, Snowman, Sock } from './Ornaments';

interface ChristmasTreeProps {
  onOrnamentClick: (type: OrnamentType) => void;
}

export const ChristmasTree: React.FC<ChristmasTreeProps> = ({ onOrnamentClick }) => {
  const ornaments: OrnamentData[] = useMemo(() => {
    const data: OrnamentData[] = [];
    const layers = 15;
    const itemsPerLayer = 10;
    const treeHeight = 12;
    const baseRadius = 5;

    const types = Object.values(OrnamentType);
    const colors = ['#e11d48', '#16a34a', '#fbbf24', '#f8fafc', '#9333ea'];

    for (let i = 0; i < layers; i++) {
      const y = (i / layers) * treeHeight;
      const layerRadius = baseRadius * (1 - i / layers);
      const layerCount = itemsPerLayer * (1 - i / layers) + 3;

      for (let j = 0; j < layerCount; j++) {
        const angle = (j / layerCount) * Math.PI * 2 + (i * 0.5);
        const x = Math.cos(angle) * layerRadius;
        const z = Math.sin(angle) * layerRadius;
        
        data.push({
          id: `ornament-${i}-${j}`,
          type: types[Math.floor(Math.random() * types.length)],
          position: [x, y, z],
          color: colors[Math.floor(Math.random() * colors.length)],
          scale: 0.3 + Math.random() * 0.4
        });
      }
    }
    return data;
  }, []);

  return (
    <group position={[0, -5, 0]}>
      {/* Main Tree Structure - stylized as a glowing cone of light */}
      <mesh position={[0, 6, 0]}>
        <coneGeometry args={[5.5, 12, 32, 1, true]} />
        <meshStandardMaterial 
          color="#064e3b" 
          transparent 
          opacity={0.15} 
          wireframe
        />
      </mesh>
      
      {/* Tree Trunk */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.8, 1, 1, 16]} />
        <meshStandardMaterial color="#3f2305" />
      </mesh>

      {/* Ornaments */}
      {ornaments.map((orn) => {
        const props = {
          key: orn.id,
          position: orn.position,
          color: orn.color,
          scale: orn.scale,
          type: orn.type,
          onClick: () => onOrnamentClick(orn.type)
        };

        switch (orn.type) {
          case OrnamentType.STAR: return <Star {...props} />;
          case OrnamentType.BALL: return <Ball {...props} />;
          case OrnamentType.GIFT: return <GiftBox {...props} />;
          case OrnamentType.CANDY_CANE: return <CandyCane {...props} />;
          case OrnamentType.SNOWMAN: return <Snowman {...props} />;
          case OrnamentType.SOCK: return <Sock {...props} />;
          default: return <Ball {...props} />;
        }
      })}

      {/* Topper Star */}
      <Star 
        type={OrnamentType.STAR} 
        position={[0, 12.5, 0]} 
        color="#fbbf24" 
        scale={1.5} 
        onClick={() => onOrnamentClick(OrnamentType.STAR)} 
      />

      {/* Atmospheric Lights */}
      <Sparkles count={150} scale={[12, 14, 12]} size={4} speed={0.2} color="#fbbf24" />
      
      {/* Warm Breathing Light Points */}
      <pointLight position={[2, 3, 2]} intensity={20} color="#fbbf24" />
      <pointLight position={[-2, 7, -2]} intensity={20} color="#e11d48" />
      <pointLight position={[0, 1, -3]} intensity={15} color="#16a34a" />
    </group>
  );
};
