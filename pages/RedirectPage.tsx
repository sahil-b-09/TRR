import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Replace this with the actual published Google Sheet CSV URL
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT-PLACEHOLDER/pub?gid=0&single=true&output=csv';
// Fallback link if the sheet fails to load
const FALLBACK_LINK = 'https://chat.whatsapp.com/LFzFie1XbED5EI0UcziSBV?mode=gi_t';

export const RedirectPage = () => {
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchLink = async () => {
            try {
                // In a real scenario, we'll fetch the CSV here.
                // For now, we simulate a small delay to show the animation, then use the fallback.
                // const response = await fetch(GOOGLE_SHEET_CSV_URL);
                // const csvText = await response.text();
                // const link = csvText.split('\n')[0].split(',')[0].trim(); // Get first cell
                
                await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network request
                
                // If we had a real sheet, we'd use `link` here.
                const finalLink = FALLBACK_LINK; 
                setRedirectUrl(finalLink);
                
                // Automatically redirect
                window.location.href = finalLink;
            } catch (err) {
                console.error("Failed to fetch WhatsApp link", err);
                setError(true);
                setRedirectUrl(FALLBACK_LINK);
                // Redirect to fallback even on error
                window.location.href = FALLBACK_LINK;
            }
        };

        fetchLink();
    }, []);

    return (
        <div className="min-h-screen bg-[#ece5dd] sm:bg-gray-100 flex items-center justify-center p-4 font-sans select-none">
            
            {/* WhatsApp-themed Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md bg-white sm:rounded-2xl sm:shadow-2xl overflow-hidden flex flex-col h-[100dvh] sm:h-auto border border-gray-100 relative"
            >
                {/* Header (WhatsApp Green) */}
                <div className="bg-[#075e54] text-white p-4 flex items-center gap-4 shadow-sm z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex flex-shrink-0 items-center justify-center overflow-hidden">
                        <img src="/dupoin-logo-perfect.png" alt="TRR" className="w-6 h-6 object-contain filter brightness-0 invert opacity-80" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-semibold text-lg truncate leading-tight">The Rich Royals</h1>
                        <p className="text-white/70 text-sm truncate">Premium Trading Community</p>
                    </div>
                </div>

                {/* Content Area with WhatsApp Chat Background */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center relative bg-[#efe7dd]">
                    {/* Seamless WhatsApp Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
                         style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")', backgroundSize: '300px' }} />
                    
                    <div className="relative z-10 w-full flex flex-col items-center text-center">
                        
                        {/* WhatsApp Icon Pulse */}
                        <div className="relative mb-8 mt-4">
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-[#25D366] rounded-full blur-xl"
                            />
                            <div className="relative w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                        </div>

                        {/* Status Bubbles like WhatsApp Messages */}
                        <div className="w-full max-w-[280px] space-y-3">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="bg-white p-3 rounded-tr-xl rounded-b-xl rounded-tl-sm shadow-sm text-sm text-[#303030] text-left relative"
                            >
                                <span className="absolute top-0 -left-2 w-0 h-0 border-[6px] border-transparent border-t-white border-r-white"></span>
                                Opening secure connection...
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="bg-[#dcf8c6] p-3 rounded-bl-xl rounded-t-xl rounded-br-sm shadow-sm text-sm text-[#303030] text-right self-end ml-auto relative"
                            >
                                <span className="absolute top-0 -right-2 w-0 h-0 border-[6px] border-transparent border-t-[#dcf8c6] border-l-[#dcf8c6]"></span>
                                Preparing invitation link...
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="bg-white p-3 rounded-tr-xl rounded-b-xl rounded-tl-sm shadow-sm text-sm text-[#303030] text-left relative flex items-center justify-between"
                            >
                                <span className="absolute top-0 -left-2 w-0 h-0 border-[6px] border-transparent border-t-white border-r-white"></span>
                                <span>Redirecting to WhatsApp</span>
                                <div className="flex gap-1">
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-[#075e54] rounded-full" />
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: 0.15 }} className="w-1.5 h-1.5 bg-[#075e54] rounded-full" />
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 bg-[#075e54] rounded-full" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Fallback Button */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="mt-12 text-center"
                        >
                            <p className="text-gray-500 text-xs mb-3 font-medium">If you are not redirected automatically:</p>
                            <a 
                                href={redirectUrl || FALLBACK_LINK}
                                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg active:scale-95"
                            >
                                Continue to Chat
                            </a>
                        </motion.div>

                    </div>
                    
                    {/* Bottom Encryption Notice */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-1.5 text-[11px] text-[#8e8e8e] font-medium z-10">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"/></svg>
                        End-to-end encrypted
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
