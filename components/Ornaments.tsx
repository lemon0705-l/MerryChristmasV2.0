
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { OrnamentType } from '../types';

interface OrnamentProps {
  type: OrnamentType;
  position: [number, number, number];
  color: string;
  scale: number;
  onClick: () => void;
}

export const Star: React.FC<OrnamentProps> = ({ position, color, scale, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 1;
    const innerRadius = 0.4;
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 3
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
    }
  });

  return (
    <group position={position} ref={meshRef} onClick={onClick}>
      <mesh geometry={starGeometry} rotation={[0, 0, 0]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={1.5} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      <Sparkles count={15} scale={1.5} size={3} speed={0.6} color={color} />
    </group>
  );
};

export const Ball: React.FC<OrnamentProps> = ({ position, color, scale, onClick }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh position={position} scale={scale} onClick={onClick}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.2} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
};

export const GiftBox: React.FC<OrnamentProps> = ({ position, color, scale, onClick }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5}>
      <group position={position} scale={scale} onClick={onClick}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]} scale={[1.1, 0.1, 1.1]}>
           <boxGeometry />
           <meshStandardMaterial color="gold" />
        </mesh>
        <mesh position={[0, 0, 0]} scale={[1.1, 1.1, 0.1]}>
           <boxGeometry />
           <meshStandardMaterial color="gold" />
        </mesh>
      </group>
    </Float>
  );
};

export const CandyCane: React.FC<OrnamentProps> = ({ position, color, scale, onClick }) => {
  return (
    <group position={position} scale={scale} rotation={[0, 0, Math.PI / 4]} onClick={onClick}>
      <mesh>
        <torusGeometry args={[0.4, 0.1, 16, 100, Math.PI]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.4, -0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export const Snowman: React.FC<OrnamentProps> = ({ position, scale, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      <mesh position={[0, -0.4, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.2, 0.3, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.2, 0.3, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0, 0.2, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.05, 0.2, 8]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
};

export const Sock: React.FC<OrnamentProps> = ({ position, color, scale, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.1, -0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};
