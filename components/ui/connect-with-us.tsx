import React from 'react';
import { Instagram, Youtube, Send, Phone, TrendingUp } from 'lucide-react';

export const SocialConnect = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 font-sans w-full relative overflow-hidden bg-transparent">
      {/* Background decorations - Matching Global Theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-3xl mx-auto text-center mb-16 z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">Connect </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">With Us</span>
        </h1>
        <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
          Join our community and stay updated with the latest market insights, signals, and educational content.
        </p>
      </div>

      <div className="relative w-full max-w-4xl z-10">
        {/* 3D Glowing Container */}
        <div
          className={`rounded-[2rem] bg-black/40 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden p-8 md:p-12 transition-all duration-500 hover:scale-[1.01] hover:border-white/20`}
          style={{
            boxShadow: '0 0 50px rgba(79, 70, 229, 0.05), 0 0 80px rgba(244, 63, 94, 0.05)'
          }}
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">

            {/* WhatsApp - Highlighted */}
            <a href="https://wa.me/918446394909?text=Hey,%20I%20want%20to%20learn%20Forex%20trading." target="_blank" rel="noopener noreferrer" className="social-icon whatsapp group">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="icon-container scale-110 border-green-500/50 group-hover:scale-125 duration-300" style={{ boxShadow: '0 0 30px rgba(37, 211, 102, 0.3)' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <span className="icon-label font-bold text-green-400 group-hover:translate-y-1 group-hover:opacity-100">WhatsApp</span>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/smit.bagul/" target="_blank" rel="noopener noreferrer" className="social-icon instagram group">
              <div className="icon-container group-hover:scale-110 duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="icon-label group-hover:translate-y-1 group-hover:opacity-100">Instagram</span>
            </a>

            {/* YouTube */}
            <a href="https://www.youtube.com/@therichroyals" target="_blank" rel="noopener noreferrer" className="social-icon youtube group">
              <div className="icon-container group-hover:scale-110 duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </div>
              <span className="icon-label group-hover:translate-y-1 group-hover:opacity-100">YouTube</span>
            </a>

            {/* Telegram */}
            <a href="https://t.me/TheRichRoyals" target="_blank" rel="noopener noreferrer" className="social-icon telegram group">
              <div className="icon-container group-hover:scale-110 duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <span className="icon-label group-hover:translate-y-1 group-hover:opacity-100">Telegram</span>
            </a>

            {/* Broker Used - Passive Mention */}
            <a href="https://m.dupoin.vip/bYEM6dcuI" target="_blank" rel="noopener noreferrer" className="social-icon broker group">
              <div className="icon-container group-hover:scale-110 duration-300">
                <img
                  src="/dupoin-logo-perfect.png"
                  alt="Dupoin Market"
                  className="w-8 h-8 object-contain transition-opacity block"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
              <span className="icon-label group-hover:translate-y-1 group-hover:opacity-100">Broker Used</span>
            </a>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .social-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        
        .icon-container {
          display: inline-flex;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          transition: all 0.3s ease;
          position: relative;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .icon-label {
          margin-top: 12px;
          color: white;
          font-weight: 500;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        /* Hover Effects */
        .social-icon.instagram:hover .icon-container {
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
          box-shadow: 0 0 20px rgba(225, 48, 108, 0.6);
        }
        
        .social-icon.youtube:hover .icon-container {
          background: #FF0000;
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
        }
        
        .social-icon.telegram:hover .icon-container {
          background: #0088cc;
          box-shadow: 0 0 20px rgba(0, 136, 204, 0.6);
        }

        .social-icon.whatsapp:hover .icon-container {
          background: #25D366;
          box-shadow: 0 0 20px rgba(37, 211, 102, 0.6);
        }

        .social-icon.broker:hover .icon-container {
          background: #33B5A6; 
          box-shadow: 0 0 20px rgba(51, 181, 166, 0.6);
        }
        
        /* Shake Animation */
        .social-icon:hover svg, .social-icon:hover img {
          animation: shake 0.5s;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          20% { transform: translateX(-5px) rotate(-5deg); }
          40% { transform: translateX(5px) rotate(5deg); }
          60% { transform: translateX(-5px) rotate(-5deg); }
          80% { transform: translateX(5px) rotate(5deg); }
        }
        
        .icon-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .social-icon:hover .icon-container::before {
          opacity: 1;
        }
      `}} />
    </div>
  );
};