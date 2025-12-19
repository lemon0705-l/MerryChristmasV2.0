
import React from 'react';
import { WishResponse } from '../types';

interface OverlayProps {
  wish: WishResponse | null;
  loading: boolean;
  onCloseWish: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ wish, loading, onCloseWish }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold tracking-tighter text-white drop-shadow-lg">
            DIGITAL <span className="text-red-500">XMAS</span>
          </h1>
          <p className="text-sm font-medium text-emerald-400 opacity-80">STAY COZY • STAY MAGICAL</p>
        </div>
        <div className="flex space-x-4 pointer-events-auto">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all">
            <i className="fa-solid fa-music"></i>
          </button>
        </div>
      </header>

      {/* Instructions */}
      {!wish && !loading && (
        <div className="flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="text-xl font-light tracking-widest text-white/60">TOUCH AN ORNAMENT FOR MAGIC</p>
            <div className="mt-2 h-1 w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
          </div>
        </div>
      )}

      {/* Wish Display */}
      {(wish || loading) && (
        <div className="pointer-events-auto flex items-center justify-center">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-black/40 p-1 border border-white/10 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-gold-500 to-green-500"></div>
            
            <div className="p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                  <p className="mt-4 text-emerald-400 font-medium">Summoning Holiday Spirit...</p>
                </div>
              ) : (
                <>
                  <button 
                    onClick={onCloseWish}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                  >
                    <i className="fa-solid fa-xmark text-xl"></i>
                  </button>
                  <i className="fa-solid fa-quote-left text-4xl text-emerald-500/30 mb-2"></i>
                  <p className="text-2xl font-serif italic text-white leading-relaxed">
                    "{wish?.message}"
                  </p>
                  <div className="mt-6 flex items-center justify-end">
                    <div className="h-px w-12 bg-white/20 mr-4"></div>
                    <span className="text-sm font-bold tracking-widest text-emerald-400 uppercase">
                      — {wish?.author}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <footer className="flex items-end justify-between">
        <div className="max-w-xs space-y-2">
          <p className="text-xs font-mono text-white/40 leading-tight">
            SYSTEM_STATUS: MERRY<br />
            AMBIENT_LIGHT: BREATHING<br />
            MAGIC_LEVEL: 100%
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-white/30">Crafted with Digital Snow</p>
          <p className="text-sm font-bold text-white">NORTH POLE V2.0</p>
        </div>
      </footer>
    </div>
  );
};
