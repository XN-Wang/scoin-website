import React, { useState, useEffect, useRef } from 'react';

export interface AnimatedCounterProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  labelSuffix?: string;
  /** 前缀字体大小，Tailwind 类名，如 text-xl */
  prefixSize?: string;
  /** 数字字体大小，Tailwind 类名，如 text-4xl md:text-6xl */
  numberSize?: string;
  /** 后缀字体大小，Tailwind 类名 */
  suffixSize?: string;
  /** 标签字体大小，Tailwind 类名 */
  labelSize?: string;
}

const defaultPrefixSize = 'text-2xl md:text-3xl';
const defaultNumberSize = 'text-5xl md:text-7xl lg:text-8xl';
const defaultSuffixSize = 'text-2xl md:text-4xl';
const defaultLabelSize = 'text-[10px] md:text-xs';

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 2400,
  labelSuffix = '',
  prefixSize = defaultPrefixSize,
  numberSize = defaultNumberSize,
  suffixSize = defaultSuffixSize,
  labelSize = defaultLabelSize,
}) => {
  const [count, setCount] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 4);
          setCount(easeOut * end);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setShowSuffix(true);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-baseline bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        <span className={`${prefixSize} font-bold mr-1 opacity-70 mb-2`}>{prefix}</span>
        <span
          ref={elementRef}
          className={`${numberSize} font-black tracking-tighter`}
        >
          {count.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </span>
        <span
          className={`${suffixSize} font-bold ml-2 transition-opacity duration-1000 ${showSuffix ? 'opacity-100' : 'opacity-0'}`}
        >
          {suffix}
        </span>
      </div>
      {labelSuffix && (
        <span className={`${labelSize} font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]`}>
          {labelSuffix}
        </span>
      )}
    </div>
  );
};

export default AnimatedCounter;
