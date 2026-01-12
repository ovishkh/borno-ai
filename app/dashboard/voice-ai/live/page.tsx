"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Mic, PhoneOff, MoreVertical, Volume2, Presentation, User, X, Download, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const toBanglaDigit = (num: number) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => banglaDigits[parseInt(d)] || d).join('');
};

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${toBanglaDigit(m)}:${s < 10 ? '০' : ''}${toBanglaDigit(s)}`;
};

export default function LiveCallPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'connecting' | 'talking' | 'listening'>('connecting');
  const [transcript, setTranscript] = useState<{role: 'ai' | 'user', text: string}[]>([]);
  const [whiteboard, setWhiteboard] = useState<{title: string, content: string, type: 'text' | 'formula'} | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!showCheatSheet) {
        interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [showCheatSheet]);

  // Simulation Logic
  useEffect(() => {
    // 1. Initial Connection
    const t1 = setTimeout(() => {
      setStatus('talking');
      addMessage('ai', "আসসালামু আলাইকুম! আমি তোমার AI শিক্ষক। আজকে আমরা পদার্থবিজ্ঞানের কোন টপিকটি বুঝব?");
    }, 2000);

    // 2. User Speaks
    const t2 = setTimeout(() => {
      setStatus('listening');
    }, 5000);

    // 3. User Transcript
    const t3 = setTimeout(() => {
        addMessage('user', "স্যার, 'পড়ন্ত বস্তুর সূত্র' বা Free Fall নিয়ে আমার সমস্যা হচ্ছে। এটা একটু বুঝিয়ে দেবেন?");
        setStatus('connecting');
    }, 9000);

    // 4. AI Responds (Concept)
    const t4 = setTimeout(() => {
        setStatus('talking');
        addMessage('ai', "অবশ্যই! গ্যালিলিওর পড়ন্ত বস্তুর সূত্রগুলো খুব মজার।");
    }, 11000);

    const t5 = setTimeout(() => {
        addMessage('ai', "প্রথম সূত্রটি হলো: স্থির অবস্থান থেকে বিনা বাধায় পড়ন্ত সকল বস্তু সমান সময়ে সমান পথ অতিক্রম করে।");
        setWhiteboard({
            title: "১ম সূত্র (Jorota)",
            content: "স্থির বস্তু → স্থির থাকবে\n(বিনা বাধায়)",
            type: 'text'
        });
    }, 15000);

    // 5. AI Asks Question
    const t6 = setTimeout(() => {
        addMessage('ai', "আচ্ছা বলতো, পৃথিবীতে অভিকর্ষজ ত্বরণ 'g' এর আদর্শ মান কত?");
        setStatus('listening');
        setWhiteboard({
            title: "Question",
            content: "g = ?",
            type: 'formula'
        });
    }, 22000);

    // 6. User Answers
    const t7 = setTimeout(() => {
        addMessage('user', "এটা ৯.৮ মিটার/সেকেন্ড স্কয়ার (9.8 ms⁻²)।");
        setStatus('connecting');
    }, 27000);

    // 7. AI Praises & Math
    const t8 = setTimeout(() => {
        setStatus('talking');
        addMessage('ai', "একদম সঠিক! শাবাশ। এবার চলো একটা গানিতিক সূত্র দেখি।");
        setWhiteboard({
            title: "Constant",
            content: "g = 9.8 ms⁻²",
            type: 'formula'
        });
    }, 29000);

    const t9 = setTimeout(() => {
        addMessage('ai', "উচ্চতা বের করার সূত্রটি হলো: h = ut + ½gt²।");
        setWhiteboard({
            title: "Height Formula",
            content: "h = ut + ½gt²",
            type: 'formula'
        });
    }, 33000);

    // 8. User Clarification
    const t10 = setTimeout(() => {
        setStatus('listening');
    }, 38000);

    const t11 = setTimeout(() => {
        addMessage('user', "এখানে 'u' মানে কী স্যার?");
        setStatus('connecting');
    }, 41000);

    // 9. AI Clarifies
    const t12 = setTimeout(() => {
        setStatus('talking');
        addMessage('ai', "খুব ভালো প্রশ্ন! 'u' হলো আদিবেগ (Initial Velocity)।");
        setWhiteboard({
            title: "Variable",
            content: "u = Initial Velocity\n(আদিবেগ)",
            type: 'text'
        });
    }, 43000);

    const t13 = setTimeout(() => {
        addMessage('ai', "যেহেতু বস্তুটা আমরা স্থির অবস্থান থেকে ফেলছি, তাই এখানে u = 0 হবে। বুঝতে পেরেছ?");
        setWhiteboard({
            title: "Fixed Position",
            content: "u = 0 ms⁻¹",
            type: 'formula'
        });
    }, 47000);

    // 10. User final confirmation
    const t14 = setTimeout(() => {
        setStatus('listening');
    }, 52000);

    const t15 = setTimeout(() => {
        addMessage('user', "জি স্যার, এখন ক্লিয়ার! ধন্যবাদ।");
        setStatus('connecting');
    }, 55000);

    const t16 = setTimeout(() => {
        setStatus('talking');
        addMessage('ai', "তোমাকে ধন্যবাদ! আরও কোনো প্রশ্ন থাকলে করতে পারো।");
        setWhiteboard(null); // Clear whiteboard
    }, 57000);

    const timers = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16];

    return () => {
        timers.forEach(t => clearTimeout(t));
    };
  }, []);

  const addMessage = (role: 'ai' | 'user', text: string) => {
      setTranscript(prev => [...prev, { role, text }]);
  };

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleEndCall = () => {
    setShowCheatSheet(true);
  };

  const closeCheatSheet = () => {
      router.push('/dashboard/voice-ai');
  };

  if (showCheatSheet) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl">

                {/* Modal Header */}
                <div className="bg-white p-6 pb-2 text-center border-b border-gray-50">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                         <Presentation className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">দুর্দান্ত সেশন! 🎉</h2>
                    <p className="text-gray-500 text-sm">তোমার পদার্থবিজ্ঞান শেখার অগ্রগতি</p>
                </div>

                <div className="p-6 space-y-6 bg-gray-50/50">

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                             <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">সময়</p>
                             <p className="text-xl font-bold text-gray-900">{toBanglaDigit(seconds)} সেকেন্ড</p>
                         </div>
                         <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                             <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">স্কোর</p>
                             <div className="flex items-center justify-center gap-1">
                                <span className="text-xl font-bold text-green-600">৯৫</span>
                                <span className="text-xs text-gray-400">/১০০</span>
                             </div>
                         </div>
                    </div>

                    {/* Visual Performance Graph */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                        <div className="flex justify-between items-end h-24 gap-2 px-2">
                             <div className="w-full bg-teal-100 rounded-t-lg h-[40%] relative group">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">শুরু</div>
                             </div>
                             <div className="w-full bg-teal-300 rounded-t-lg h-[60%] relative group">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">ব্যাখ্যা</div>
                             </div>
                             <div className="w-full bg-teal-500 rounded-t-lg h-[80%] relative group">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">প্রশ্ন</div>
                             </div>
                             <div className="w-full bg-teal-600 rounded-t-lg h-[100%] relative group">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">উত্তর</div>
                             </div>
                        </div>
                        <p className="text-center text-xs text-gray-400 font-medium">সেশন এনগেজমেন্ট গ্রাফ</p>
                    </div>

                    {/* Takeaways */}
                    <div className="space-y-3">
                         <h4 className="text-sm font-bold text-gray-900 ml-1">আজকের লার্নিং সামারি</h4>
                         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                             <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
                                 <Presentation className="w-5 h-5 text-yellow-600" />
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-gray-800 mb-1">পড়ন্ত বস্তুর সূত্র (Free Fall)</p>
                                 <p className="text-xs text-gray-500 leading-relaxed">
                                     স্থির অবস্থান থেকে বিনা বাধায় পড়ন্ত সকল বস্তু সমান সময়ে সমান পথ অতিক্রম করে।
                                 </p>
                                 <div className="mt-3 flex gap-2">
                                     <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-mono text-gray-600 font-bold border border-gray-200">h = ut + ½gt²</span>
                                     <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-mono text-gray-600 font-bold border border-gray-200">g = 9.8 ms⁻²</span>
                                 </div>
                             </div>
                         </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                         <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                             <Share2 className="w-4 h-4" /> শেয়ার
                         </button>
                         <button className="flex items-center justify-center gap-2 py-3 bg-teal-600 rounded-xl font-bold text-white hover:bg-teal-700 shadow-lg shadow-teal-200 transition-colors">
                             <Download className="w-4 h-4" /> পিডিএফ
                         </button>
                    </div>
                </div>

                <button onClick={closeCheatSheet} className="w-full py-4 bg-white text-gray-400 font-bold hover:bg-gray-50 hover:text-gray-600 transition-colors border-t border-gray-100 text-sm">
                    ড্যাশবোর্ডে ফিরে যান
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black/95 text-white flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/20 blur-[100px] transition-all duration-700 ${status === 'talking' ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-teal-500/30 blur-[80px] transition-all duration-300 ${status === 'listening' ? 'scale-150 opacity-100' : 'scale-50 opacity-20'}`}></div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex justify-between items-center p-6 backdrop-blur-sm">
         <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'connecting' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <div>
                 <span className="font-mono text-sm tracking-widest text-gray-400 block leading-none">LIVE CLASS</span>
                 <span className="text-[10px] text-teal-300 font-bold tracking-wider">FRIENDLY COACH MODE</span>
            </div>
         </div>
         <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-semibold font-mono tracking-wider">
            {formatTime(seconds)}
         </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-4">

         {/* AI Whiteboard - Dynamic Visuals */}
         {whiteboard && (
             <div className="absolute top-4 right-4 md:right-auto md:top-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 max-w-[200px] md:max-w-xs animate-in slide-in-from-top-5 fade-in duration-500 shadow-2xl">
                 <div className="flex items-center gap-2 mb-2 text-teal-300 border-b border-white/10 pb-1">
                     <Presentation className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase">{whiteboard.title}</span>
                 </div>
                 <div className={`text-center font-bold ${whiteboard.type === 'formula' ? 'text-xl md:text-2xl font-mono text-white' : 'text-sm text-gray-200 whitespace-pre-line'}`}>
                     {whiteboard.content}
                 </div>
             </div>
         )}

         {/* Status Text */}
         <div className="mb-12 text-center h-8">
            {status === 'connecting' && <span className="text-gray-400 animate-pulse">সংযোগ তৈরি হচ্ছে...</span>}
            {status === 'talking' && <span className="text-teal-300 font-bold text-lg tracking-wider">AI শিক্ষক কথা বলছেন...</span>}
            {status === 'listening' && <span className="text-emerald-300 font-bold text-lg tracking-wider">শুনছি...</span>}
         </div>

         {/* The Orb / Visualizer */}
         <div className="relative mb-16">
            {/* Multiple rings for pulsing effect */}
            <div className={`w-48 h-48 rounded-full border-2 border-teal-500/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${status === 'talking' ? 'scale-[2] opacity-20' : 'scale-100 opacity-0'}`} />
            <div className={`w-48 h-48 rounded-full border-2 border-teal-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 delay-100 ${status === 'talking' ? 'scale-[1.5] opacity-40' : 'scale-100 opacity-0'}`} />

            {/* Main Center circle */}
            <div
                className={`w-48 h-48 rounded-full bg-gradient-to-br from-teal-600 to-teal-600 shadow-[0_0_60px_rgba(79,70,229,0.5)] flex items-center justify-center transition-all duration-300
                ${status === 'talking' ? 'scale-110' : 'scale-100'}
                ${status === 'listening' ? 'ring-4 ring-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.5)] from-emerald-600 to-teal-600' : ''}
            `}>
                <Mic className={`w-16 h-16 text-white transition-all duration-300 ${status === 'talking' ? 'animate-bounce' : ''}`} />
            </div>

            {/* Simulated Waveform Bars (only visible when talking) */}
            {status === 'talking' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 flex items-center justify-center gap-1">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1 bg-white/50 rounded-full animate-[bounce_1s_infinite]" style={{ height: `${Math.random() * 40 + 20}px`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
            )}
         </div>

         {/* Real-time Transcript Area */}
         <div className="w-full max-w-2xl h-48 bg-gradient-to-t from-black via-black/50 to-transparent p-4 overflow-hidden absolute bottom-24 flex items-end justify-center">
             <div className="space-y-3 w-full text-center" ref={scrollRef}>
                 {transcript.slice(-2).map((msg, idx) => (
                    <div key={idx} className={`animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        <p className={`text-lg md:text-xl font-medium ${msg.role === 'ai' ? 'text-white' : 'text-gray-400 italic'}`}>
                            {msg.role === 'user' ? '❝ ' : ''}
                            {msg.text}
                            {msg.role === 'user' ? ' ❞' : ''}
                        </p>
                    </div>
                 ))}
             </div>
         </div>

      </div>

      {/* Controls */}
      <div className="relative z-20 bg-white/10 backdrop-blur-md p-6 pb-10 flex justify-center items-center gap-8 rounded-t-3xl border-t border-white/5">
        <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all">
            <Volume2 className="w-6 h-6 text-white" />
        </button>

        <button
            onClick={handleEndCall}
            className="p-6 rounded-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 hover:scale-110 transition-all"
        >
            <PhoneOff className="w-8 h-8 text-white" fill="white" />
        </button>

        <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all">
            <MoreVertical className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
