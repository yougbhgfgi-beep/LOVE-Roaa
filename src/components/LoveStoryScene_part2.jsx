function BoyCharacter({ walking, armRightExtra = "", scene }) {
  return (
    <div className={`relative flex flex-col items-center pt-2 ${walking ? 'animate-[walkCycle_0.8s_infinite]' : scene === 'meeting' ? 'animate-[idleSway_2s_ease-in-out_infinite]' : ''}`} style={{ willChange: 'transform', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-8 bg-[#1a0f08] rounded-[50%_50%_40%_40%] z-0 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.4)]" />
      <div className="absolute top-0 -left-3 w-[18px] h-[22px] bg-[#1a0f08] rounded-full z-0 shadow-[inset_4px_0_8px_rgba(0,0,0,0.3)]" />
      <div className="absolute top-0 -right-3 w-[18px] h-[22px] bg-[#1a0f08] rounded-full z-0 shadow-[inset_-4px_0_8px_rgba(0,0,0,0.3)]" />
      <div className="w-11 h-12 bg-[#f5d6b8] rounded-[46%_46%_42%_42%] relative z-10 shadow-[0_12px_40px_rgba(0,0,0,0.3),inset_0_2px_6px_rgba(255,255,255,0.15)]">
        <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-13 h-6 bg-[#1a0f08] rounded-[60%_60%_20%_20%] z-20 shadow-[0_6px_16px_rgba(0,0,0,0.5)]" />
        <div className="absolute -top-[2px] left-[7px] w-[5px] h-[3px] bg-[#1a0f08] rounded-full z-20" />
        <div className="absolute -top-[2px] right-[5px] w-[5px] h-[3px] bg-[#1a0f08] rounded-full z-20" />
        <div className="absolute top-[10px] left-[7px] w-[5px] h-[1.5px] bg-[#1a0f08] rounded-full rotate-[-5deg]" />
        <div className="absolute top-[10px] right-[7px] w-[5px] h-[1.5px] bg-[#1a0f08] rounded-full rotate-[5deg]" />
        <div className="absolute top-[14px] left-[8px] w-[2.5px] h-[2.5px] bg-[#1a0f08] rounded-full shadow-[0_0_4px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-[14px] right-[8px] w-[2.5px] h-[2.5px] bg-[#1a0f08] rounded-full shadow-[0_0_4px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-[19px] left-1/2 -translate-x-1/2 w-[1px] h-[4px] bg-[#d4a574] rounded-full" />
        <div className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-[4px] h-[2px] bg-[#c2926a] rounded-full" />
        <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-3 h-[4px] bg-[#ecc9a8] rounded-full blur-[1px]" />
      </div>
      <div className="w-3 h-[4px] bg-[#e8c4a0] mx-auto -mt-[1px] z-0 shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
      <div className="relative w-14 h-[72px] z-0 mt-[-2px]">
        <div className="absolute -top-2 -left-[14px] w-[22px] h-[18px] bg-gradient-to-b from-[#1a1a2e] to-[#0f3460] rounded-t-full shadow-[inset_6px_0_12px_rgba(0,0,0,0.4)]" />
        <div className="absolute -top-2 -right-[14px] w-[22px] h-[18px] bg-gradient-to-b from-[#1a1a2e] to-[#0f3460] rounded-t-full shadow-[inset_-6px_0_12px_rgba(0,0,0,0.4)]" />
        <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-t-md shadow-[0_12px_35px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[18px] h-[12px] bg-gradient-to-b from-[#ffffff] to-[#e8e8e8] rounded-sm z-10 shadow-[0_2px_6px_rgba(0,0,0,0.15)]" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 65% 100%, 35% 100%)' }} />
          <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[16px] h-[22px] bg-[#1a1a2e] z-5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 58% 100%, 42% 100%)' }} />
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[6px] h-[14px] bg-gradient-to-b from-[#8b1436] via-[#c42e65] to-[#8b1436] rounded-sm z-10 shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
          <div className="absolute top-[38px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] bg-rose-300/30 rounded-full" />
          <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] bg-rose-300/30 rounded-full" />
          <div className="absolute bottom-[12px] right-[6px] w-[10px] h-[1px] bg-rose-300/15" />
          <div className="absolute top-[8px] left-[4px] w-[3px] h-[28px] bg-rose-300/5 rounded-full" />
          <div className="absolute top-[8px] right-[4px] w-[3px] h-[28px] bg-rose-300/5 rounded-full" />
        </div>
      </div>
      <div className={`absolute -left-[12px] top-[34px] w-[11px] h-[34px] bg-gradient-to-r from-[#16213e] to-[#0f3460] rounded-l-md shadow-[inset_0_0_12px_rgba(0,0,0,0.3)] ${walking ? 'animate-[armSwingRight_0.8s_infinite]' : ''}`} style={{ willChange: 'transform', transformOrigin: 'top center' }} />
      <div className={`absolute -right-[12px] top-[34px] w-[11px] h-[34px] bg-gradient-to-l from-[#16213e] to-[#0f3460] rounded-r-md shadow-[inset_0_0_12px_rgba(0,0,0,0.3)] ${walking ? 'animate-[armSwingLeft_0.8s_infinite]' : armRightExtra}`} style={{ willChange: 'transform', transition: `all 0.8s ${EASE}`, transformOrigin: 'top center' }} />
      <div className="flex space-x-[3px] justify-center -mt-[2px]" dir="ltr">
        <div className={`w-[15px] h-[34px] bg-gradient-to-b from-[#16213e] via-[#0f3460] to-[#0a0a1a] rounded-b-sm shadow-[inset_-2px_0_4px_rgba(0,0,0,0.3)] ${walking ? 'animate-[legLeft_0.8s_infinite]' : ''}`} style={{ willChange: 'transform', transformOrigin: 'top center' }} />
        <div className={`w-[15px] h-[34px] bg-gradient-to-b from-[#16213e] via-[#0f3460] to-[#0a0a1a] rounded-b-sm shadow-[inset_2px_0_4px_rgba(0,0,0,0.3)] ${walking ? 'animate-[legRight_0.8s_infinite]' : ''}`} style={{ willChange: 'transform', transformOrigin: 'top center' }} />
      </div>
      <div className="flex space-x-[3px] justify-center -mt-[1px]" dir="ltr">
        <div className="w-[15px] h-[5px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-sm shadow-[0_3px_6px_rgba(0,0,0,0.5)]" />
        <div className="w-[15px] h-[5px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-sm shadow-[0_3px_6px_rgba(0,0,0,0.5)]" />
      </div>
    </div>
  )
}
