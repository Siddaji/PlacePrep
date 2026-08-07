import React, { useEffect, useRef, useState } from "react";

const ORBIT_ITEMS = [
  // Orbit 1: Inner Arc (Rx = 320, Ry = 210)
  {
    id: "js",
    name: "JS",
    type: "js",
    rx: 320,
    ry: 210,
    angle: 3.3,
    speed: 0.00045,
    customClass: "bg-[#F7DF1E] text-black font-black px-2.5 py-1 text-sm rounded-md shadow-xl shadow-yellow-500/20",
  },
  {
    id: "python",
    name: "Python",
    type: "python",
    rx: 320,
    ry: 210,
    angle: 2.1,
    speed: 0.00045,
    customClass: "bg-[#1E293B] border border-blue-400/50 text-[#38BDF8] px-2.5 py-1 text-xs font-bold rounded-lg shadow-xl flex items-center gap-1.5",
  },
  {
    id: "spring",
    name: "Spring",
    type: "leaf",
    rx: 320,
    ry: 210,
    angle: 1.05,
    speed: 0.00045,
    customClass: "bg-[#102A18] border border-emerald-500/50 text-emerald-400 p-2 rounded-full shadow-xl shadow-emerald-950/50",
  },
  {
    id: "react",
    name: "React",
    type: "react",
    rx: 320,
    ry: 210,
    angle: 0.0,
    speed: 0.00045,
    customClass: "bg-[#0F172A] border border-cyan-400/50 text-[#38BDF8] px-2.5 py-1 text-xs font-bold rounded-full shadow-xl flex items-center gap-1.5",
  },
  {
    id: "paypal",
    name: "PayPal",
    type: "paypal",
    rx: 320,
    ry: 210,
    angle: 5.4,
    speed: 0.00045,
    customClass: "bg-[#003087] border border-blue-400/40 text-white p-2.5 rounded-xl shadow-xl shadow-blue-900/40",
  },
  {
    id: "shield",
    name: "LeetCode",
    type: "shield",
    rx: 320,
    ry: 210,
    angle: 4.2,
    speed: 0.00045,
    customClass: "bg-[#1E1E24] border border-zinc-700 text-amber-400 p-2 rounded-xl shadow-xl",
  },

  // Orbit 2: Middle Arc (Rx = 560, Ry = 370)
  {
    id: "visa",
    name: "VISA",
    type: "visa",
    rx: 560,
    ry: 370,
    angle: 1.57, // Top center
    speed: -0.00035,
    customClass: "bg-[#1A1F71] border border-blue-400/30 text-white font-black text-xs px-3.5 py-1.5 rounded-md shadow-xl shadow-blue-950/60 tracking-widest",
  },
  {
    id: "netflix",
    name: "Netflix",
    type: "netflix",
    rx: 560,
    ry: 370,
    angle: 0.9,
    speed: -0.00035,
    customClass: "bg-black border border-red-600/60 text-[#E50914] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-black tracking-wider",
  },
  {
    id: "java",
    name: "Java",
    type: "java",
    rx: 560,
    ry: 370,
    angle: 0.25, // Right side
    speed: -0.00035,
    customClass: "bg-[#1E232A] border border-[#E76F00]/50 text-[#E76F00] p-2.5 rounded-2xl shadow-xl",
  },
  {
    id: "atlassian",
    name: "Atlassian",
    type: "atlassian",
    rx: 560,
    ry: 370,
    angle: 5.8,
    speed: -0.00035,
    customClass: "bg-[#0052CC]/20 border border-[#0052CC]/60 text-[#4C9AFF] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold flex items-center gap-1.5",
  },
  {
    id: "google",
    name: "Google",
    type: "google",
    rx: 560,
    ry: 370,
    angle: 5.2,
    speed: -0.00035,
    customClass: "bg-[#18181B] border border-zinc-700 text-white px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-semibold",
  },
  {
    id: "swiggy",
    name: "Swiggy",
    type: "swiggy",
    rx: 560,
    ry: 370,
    angle: 4.4,
    speed: -0.00035,
    customClass: "bg-[#FC8019]/20 border border-[#FC8019]/60 text-[#FC8019] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold",
  },
  {
    id: "adobe",
    name: "Adobe",
    type: "adobe",
    rx: 560,
    ry: 370,
    angle: 3.75, // Bottom left
    speed: -0.00035,
    customClass: "bg-[#FF0000] text-white p-2.5 rounded-lg shadow-xl shadow-red-950/60",
  },
  {
    id: "amazon",
    name: "Amazon",
    type: "amazon",
    rx: 560,
    ry: 370,
    angle: 2.8,
    speed: -0.00035,
    customClass: "bg-[#18181B] border border-amber-500/40 text-amber-400 px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold",
  },

  // Orbit 3: Outer Arc (Rx = 800, Ry = 520)
  {
    id: "microsoft",
    name: "Microsoft",
    type: "microsoft",
    rx: 800,
    ry: 520,
    angle: 0.8,
    speed: 0.00025,
    customClass: "bg-[#18181B] border border-zinc-700 text-white px-3.5 py-1.5 rounded-full shadow-xl text-xs font-semibold flex items-center gap-2",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    type: "nvidia",
    rx: 800,
    ry: 520,
    angle: 1.5,
    speed: 0.00025,
    customClass: "bg-[#76B900]/15 border border-[#76B900]/50 text-[#76B900] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-extrabold tracking-wide",
  },
  {
    id: "apple",
    name: "Apple",
    type: "apple",
    rx: 800,
    ry: 520,
    angle: 2.2,
    speed: 0.00025,
    customClass: "bg-[#27272A] border border-zinc-600 text-white p-2.5 rounded-full shadow-xl",
  },
  {
    id: "flipkart",
    name: "Flipkart",
    type: "flipkart",
    rx: 800,
    ry: 520,
    angle: 2.9,
    speed: 0.00025,
    customClass: "bg-[#2874F0]/20 border border-[#2874F0]/60 text-[#2874F0] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold",
  },
  {
    id: "meta",
    name: "Meta",
    type: "meta",
    rx: 800,
    ry: 520,
    angle: 3.5,
    speed: 0.00025,
    customClass: "bg-[#0668E1]/20 border border-[#0668E1]/50 text-[#0668E1] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold flex items-center gap-2",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    type: "phonepe",
    rx: 800,
    ry: 520,
    angle: 4.2,
    speed: 0.00025,
    customClass: "bg-[#5F259F]/25 border border-[#5F259F]/60 text-[#A855F7] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold",
  },
  {
    id: "goldman",
    name: "Goldman Sachs",
    type: "goldman",
    rx: 800,
    ry: 520,
    angle: 4.8,
    speed: 0.00025,
    customClass: "bg-[#7399C6]/20 border border-[#7399C6]/40 text-[#A2C4EC] px-3.5 py-1.5 rounded-lg shadow-xl text-xs font-bold",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    type: "razorpay",
    rx: 800,
    ry: 520,
    angle: 5.4,
    speed: 0.00025,
    customClass: "bg-[#0C2340] border border-[#0284C7]/50 text-[#38BDF8] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold",
  },
  {
    id: "uber",
    name: "Uber",
    type: "uber",
    rx: 800,
    ry: 520,
    angle: 5.9,
    speed: 0.00025,
    customClass: "bg-black border border-zinc-700 text-white px-4 py-1.5 rounded-full shadow-xl text-xs font-extrabold tracking-wider",
  },

  // Orbit 4: Far Outer Arc (Rx = 1040, Ry = 680)
  {
    id: "salesforce",
    name: "Salesforce",
    type: "salesforce",
    rx: 1040,
    ry: 680,
    angle: 0.5,
    speed: -0.0002,
    customClass: "bg-[#00A1E0]/15 border border-[#00A1E0]/50 text-[#38BDF8] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold",
  },
  {
    id: "cisco",
    name: "Cisco",
    type: "cisco",
    rx: 1040,
    ry: 680,
    angle: 1.8,
    speed: -0.0002,
    customClass: "bg-[#1BA0D7]/15 border border-[#1BA0D7]/50 text-[#38BDF8] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-extrabold",
  },
  {
    id: "jpmorgan",
    name: "J.P. Morgan",
    type: "jpmorgan",
    rx: 1040,
    ry: 680,
    angle: 3.1,
    speed: -0.0002,
    customClass: "bg-[#1E293B] border border-zinc-600 text-zinc-200 px-3.5 py-1.5 rounded-md shadow-xl text-xs font-bold",
  },
  {
    id: "spotify",
    name: "Spotify",
    type: "spotify",
    rx: 1040,
    ry: 680,
    angle: 4.5,
    speed: -0.0002,
    customClass: "bg-[#1DB954]/15 border border-[#1DB954]/50 text-[#1DB954] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold flex items-center gap-1.5",
  },
  {
    id: "stripe",
    name: "Stripe",
    type: "stripe",
    rx: 1040,
    ry: 680,
    angle: 5.7,
    speed: -0.0002,
    customClass: "bg-[#635BFF]/20 border border-[#635BFF]/50 text-[#818CF8] px-3.5 py-1.5 rounded-full shadow-xl text-xs font-bold",
  },
];

export default function CompanyTagsBackground() {
  const containerRef = useRef(null);
  const badgeRefs = useRef([]);
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let animationFrameId;
    const state = ORBIT_ITEMS.map((item) => ({ ...item }));

    const updateDimensionsAndScale = () => {
      const w = window.innerWidth;
      const calculatedScale = Math.min(1, Math.max(0.55, w / 1440));
      setScale(calculatedScale);
      return calculatedScale;
    };

    const initialScale = updateDimensionsAndScale();
    window.addEventListener("resize", updateDimensionsAndScale);

    // Initial position pass before enabling opacity to prevent FOUC / top-left jumps
    const positionAllBadges = (currentScale) => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || 600;

      const cx = width / 2;
      const cy = height * 0.45;

      state.forEach((item, idx) => {
        const el = badgeRefs.current[idx];
        if (!el) return;

        const currentRx = item.rx * currentScale;
        const currentRy = item.ry * currentScale;

        const x = cx + Math.cos(item.angle) * currentRx;
        const y = cy - Math.sin(item.angle) * currentRy;

        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      });
    };

    // Synchronously place badges on initial setup
    positionAllBadges(initialScale);
    setIsReady(true);

    const animate = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || 600;

      const cx = width / 2;
      const cy = height * 0.45;

      const currentScale = Math.min(1, Math.max(0.55, width / 1440));

      state.forEach((item, idx) => {
        const el = badgeRefs.current[idx];
        if (!el) return;

        item.angle += item.speed;

        const currentRx = item.rx * currentScale;
        const currentRy = item.ry * currentScale;

        const x = cx + Math.cos(item.angle) * currentRx;
        const y = cy - Math.sin(item.angle) * currentRy;

        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateDimensionsAndScale);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const renderIcon = (type, name) => {
    switch (type) {
      case "js":
        return <span className="font-extrabold tracking-tighter">JS</span>;
      case "python":
        return (
          <>
            <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M11.898 1c-4.475 0-4.202 1.942-4.202 1.942l.006 2.012h4.258v.606H6.012S2 5.064 2 9.588s3.504 4.382 3.504 4.382h1.036v-1.463s-.058-1.748 1.718-1.748h2.934s1.603.03 1.603-1.545V5.212S13.25 1 11.898 1zm-1.18 1.343c.382 0 .692.31.692.692 0 .381-.31.692-.692.692a.692.692 0 0 1 0-1.384zm.822 18.995c4.475 0 4.202-1.942 4.202-1.942l-.006-2.012h-4.258v-.606h5.948S21.5 17.276 21.5 12.752s-3.504-4.382-3.504-4.382h-1.036v1.463s.058 1.748-1.718 1.748h-2.934s-1.603-.03-1.603 1.545v3.992s-.454 4.212.898 4.212zm1.18-1.343a.692.692 0 1 1 0-1.384.692.692 0 0 1 0 1.384z" />
            </svg>
            <span>Python</span>
          </>
        );
      case "react":
        return (
          <>
            <svg className="w-4 h-4 shrink-0 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <ellipse cx="12" cy="12" rx="10" ry="4" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
              <circle cx="12" cy="12" r="2" className="fill-current" />
            </svg>
            <span>React</span>
          </>
        );
      case "leaf":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.001 2.002c-4.418 0-8 3.582-8 8 0 .895.147 1.754.418 2.556L3.5 18.5a1 1 0 0 0 1.414 1.414l5.942-5.918c.803.27 1.662.418 2.557.418 4.418 0 8-3.582 8-8 0-2.438-1.093-4.619-2.825-6.096A9.957 9.957 0 0 0 17.001 2.002z" />
          </svg>
        );
      case "paypal":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a1.282 1.282 0 0 1 1.265-1.082h6.29c3.308 0 5.626.853 6.425 2.368.736 1.393.528 3.32-.576 5.313-1.228 2.217-3.238 3.535-5.69 3.535H9.863l-1.353 7.027a.641.641 0 0 1-.634.456z" />
          </svg>
        );
      case "shield":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm0 2.18L5 6.3v4.7c0 4.27 2.94 8.27 7 9.32 4.06-1.05 7-5.05 7-9.32V6.3l-7-3.12z" />
          </svg>
        );
      case "visa":
        return <span>VISA</span>;
      case "netflix":
        return <span>NETFLIX</span>;
      case "java":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.87.194 4.859-.21 0 0 .58.334 1.25.646-2.834.81-7.234.722-8.528-.152 1.056-.474 1.766-.998 1.766-.998zm-1.03-2.658s-1.12.654.516.822c2.19.225 3.978.225 6.698-.124 0 0 .422.31.954.534-3.565.803-8.825.646-9.923-.27 1.248-.482 1.755-.962 1.755-.962zm10.793-1.89s.854.743-.787 1.298c-3.056 1.034-8.898 1.056-11.752.126 0 0-.585-.597 1.487-.978 2.457-.453 7.828-.48 11.052-.446z" />
          </svg>
        );
      case "atlassian":
        return (
          <>
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M6.776 12.016c-.23-.298-.673-.342-.958-.094L.272 16.74a.625.625 0 0 0-.083.856l6.096 7.942a.625.625 0 0 0 .964-.035l5.587-7.802a.625.625 0 0 0-.098-.838l-6.04-4.847zM11.66 2.083a.625.625 0 0 0-.964.035L.235 16.702a.625.625 0 0 0 .098.838l6.04 4.847c.23.298.673.342.958.094l10.463-9.136a.625.625 0 0 0 .083-.856L11.66 2.083z"/>
            </svg>
            <span>Atlassian</span>
          </>
        );
      case "adobe":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M13.966 22h6.034l-8.001-19.999h-3.998l8.001 19.999zm-3.932-9.822l2.365 5.922h-4.731l2.366-5.922zm-6.034 9.822h6.034l-8.001-19.999h-3.998l8.001 19.999z" />
          </svg>
        );
      case "google":
        return (
          <>
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google</span>
          </>
        );
      case "amazon":
        return <span>amazon</span>;
      case "microsoft":
        return (
          <>
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0">
              <span className="bg-[#F25022] rounded-[0.5px]" />
              <span className="bg-[#7FBA00] rounded-[0.5px]" />
              <span className="bg-[#00A4EF] rounded-[0.5px]" />
              <span className="bg-[#FFB900] rounded-[0.5px]" />
            </div>
            <span>Microsoft</span>
          </>
        );
      case "apple":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.36-.58.68-1.09 1.76-.95 2.81 1.01.08 2.06-.57 2.68-1.32z" />
          </svg>
        );
      case "meta":
        return (
          <>
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 10.15c-1.58-2.61-3.32-4.15-5.26-4.15C3.33 6 1 8.87 1 12.5S3.33 19 6.74 19c1.94 0 3.68-1.54 5.26-4.15 1.58 2.61 3.32 4.15 5.26 4.15 3.41 0 5.74-2.87 5.74-6.5S20.67 6 17.26 6c-1.94 0-3.68 1.54-5.26 4.15zm-5.26 6.85C4.7 17 3 15.11 3 12.5S4.7 8 6.74 8c1.23 0 2.45 1.03 3.73 3.01-1.28 1.98-2.5 3.01-3.73 3.01zm10.52 0c-1.23 0-2.45-1.03-3.73-3.01 1.28-1.98 2.5-3.01 3.73-3.01 2.04 0 3.74 1.89 3.74 4.51s-1.7 4.51-3.74 4.51z"/>
            </svg>
            <span>Meta</span>
          </>
        );
      case "uber":
        return <span>UBER</span>;
      case "spotify":
        return (
          <>
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.218.358-.684.471-1.042.253-2.861-1.748-6.462-2.144-10.702-1.176-.407.094-.813-.16-.907-.566-.094-.407.16-.813.566-.907 4.643-1.061 8.628-.607 11.832 1.353.358.219.471.684.253 1.043zm1.472-3.273c-.274.446-.86.588-1.306.313-3.275-2.013-8.269-2.597-12.144-1.421-.502.152-1.026-.134-1.178-.636-.152-.502.134-1.026.636-1.178 4.425-1.343 9.932-.693 13.679 1.616.446.275.588.861.313 1.306zm.127-3.408c-3.928-2.333-10.413-2.549-14.187-1.404-.603.183-1.237-.168-1.42-.771-.183-.603.168-1.237.771-1.42 4.332-1.315 11.488-1.059 15.997 1.618.543.322.723 1.025.401 1.568-.322.542-1.025.723-1.562.409z"/>
            </svg>
            <span>Spotify</span>
          </>
        );
      default:
        return <span>{name}</span>;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* SVG Concentric Orbital Ring Lines */}
      <svg className="absolute inset-0 w-full h-full stroke-zinc-800/80 fill-none">
        <ellipse
          cx="50%"
          cy="45%"
          rx={320 * scale}
          ry={210 * scale}
          strokeWidth="1"
          strokeDasharray="4 6"
          className="opacity-50"
        />
        <ellipse
          cx="50%"
          cy="45%"
          rx={560 * scale}
          ry={370 * scale}
          strokeWidth="1.2"
          className="opacity-40"
        />
        <ellipse
          cx="50%"
          cy="45%"
          rx={800 * scale}
          ry={520 * scale}
          strokeWidth="1"
          strokeDasharray="6 10"
          className="opacity-25"
        />
        <ellipse
          cx="50%"
          cy="45%"
          rx={1040 * scale}
          ry={680 * scale}
          strokeWidth="1"
          strokeDasharray="8 12"
          className="opacity-15"
        />
      </svg>

      {/* Orbiting Badges */}
      {ORBIT_ITEMS.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => (badgeRefs.current[idx] = el)}
          className={`absolute left-0 top-0 will-change-transform ${item.customClass}`}
        >
          {renderIcon(item.type, item.name)}
        </div>
      ))}

      {/* Hero Radial Contrast Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,_transparent_15%,_#0B0B0B_85%)] pointer-events-none z-[1]" />

      {/* Bottom Fade Mask to seamlessly merge into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-transparent pointer-events-none z-[1]" />
    </div>
  );
}
