
import React, { useState, useCallback } from 'react';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';
import { OrnamentType, WishResponse } from './types';
import { generateChristmasWish } from './services/geminiService';

const App: React.FC = () => {
  const [wish, setWish] = useState<WishResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOrnamentClick = useCallback(async (type: OrnamentType) => {
    setLoading(true);
    setWish(null);
    try {
      const result = await generateChristmasWish(type);
      setWish(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseWish = useCallback(() => {
    setWish(null);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
      {/* 3D Experience */}
      <div className="absolute inset-0">
        <Scene onOrnamentClick={handleOrnamentClick} />
      </div>

      {/* UI Controls */}
      <Overlay 
        wish={wish} 
        loading={loading} 
        onCloseWish={handleCloseWish} 
      />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-emerald-900/20 blur-[100px]"></div>
      <div className="pointer-events-none absolute -top-48 -right-48 h-96 w-96 rounded-full bg-red-900/20 blur-[100px]"></div>
    </div>
  );
};

export default App;
