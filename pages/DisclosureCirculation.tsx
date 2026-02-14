import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Language } from '../types';
import { translations } from '../translations/index';

interface Props { lang: Language; }

type Currency = 'HK' | 'US';
type ChartRange = '7' | '30' | '365';

const LAST_UPDATED = '2024-12-31 24:00';

const METRICS_HK = {
  totalIssued: 'HK$1.25B',
  currentCirculation: 'HK$1.25B',
  change7d: '+HK$12M',
  change30d: '+HK$85.4M',
};
const METRICS_US = {
  totalIssued: '$0.85B',
  currentCirculation: '$0.85B',
  change7d: '+$8.2M',
  change30d: '+$42.1M',
};

const BREAKDOWN_HK = [
  { period: '7d', issued: 'HK$8.4B', redeemed: 'HK$5.8B', change: '+HK$2.6B', positive: true },
  { period: '30d', issued: 'HK$28.2B', redeemed: 'HK$29.9B', change: '-HK$1.8B', positive: false },
  { period: '365d', issued: 'HK$264.7B', redeemed: 'HK$247.5B', change: '+HK$17.2B', positive: true },
];
const BREAKDOWN_US = [
  { period: '7d', issued: '$8.4B', redeemed: '$5.8B', change: '+$2.6B', positive: true },
  { period: '30d', issued: '$28.2B', redeemed: '$29.9B', change: '-$1.8B', positive: false },
  { period: '365d', issued: '$264.7B', redeemed: '$247.5B', change: '+$17.2B', positive: true },
];

function generateChartData(range: ChartRange, currency: Currency): { date: string; issued: number; redeemed: number }[] {
  const points = range === '7' ? 7 : range === '30' ? 30 : 52;
  const base = currency === 'HK' ? 1.25 : 0.85;
  const data: { date: string; issued: number; redeemed: number }[] = [];
  let issued = base * 0.98;
  let redeemed = base * 0.96;
  for (let i = 0; i < points; i++) {
    issued += (Math.random() - 0.45) * 0.08;
    redeemed += (Math.random() - 0.48) * 0.07;
    issued = Math.max(issued, base * 0.9);
    redeemed = Math.max(redeemed, base * 0.88);
    data.push({
      date: range === '365' ? `W${i + 1}` : `D${i + 1}`,
      issued: Math.round(issued * 100) / 100,
      redeemed: Math.round(redeemed * 100) / 100,
    });
  }
  return data;
}

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  }),
};
const itemFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const DisclosureCirculation: React.FC<Props> = ({ lang }) => {
  const t = (key: string) => translations[key]?.[lang] || key;
  const [currency, setCurrency] = useState<Currency>('HK');
  const [chartRange, setChartRange] = useState<ChartRange>('365');

  const metrics = currency === 'HK' ? METRICS_HK : METRICS_US;
  const breakdown = currency === 'HK' ? BREAKDOWN_HK : BREAKDOWN_US;
  const chartData = useMemo(() => generateChartData(chartRange, currency), [chartRange, currency]);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' });

  const metricCards = [
    { label: t('disc_total_issued'), value: metrics.totalIssued, color: 'text-slate-900' },
    { label: t('disc_in_circulation'), value: metrics.currentCirculation, color: 'text-slate-900' },
    { label: t('disc_7d_change'), value: metrics.change7d, color: 'text-[#10B981]' },
    { label: t('disc_30d_change'), value: metrics.change30d, color: 'text-[#10B981]' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          className="mb-10"
          initial="hidden"
          animate="visible"
          variants={container}
          aria-labelledby="circulation-heading"
        >
          <motion.h1
            id="circulation-heading"
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-3"
            variants={itemFade}
            style={{ letterSpacing: '0.02em' }}
          >
            {t('sub_circulation')}
          </motion.h1>
          <motion.p className="text-slate-600 text-lg max-w-2xl mb-2" variants={itemFade} style={{ lineHeight: 1.6 }}>
            {t('disc_reserves_subtitle')}
          </motion.p>
          <motion.p className="text-slate-500 text-sm" variants={itemFade}>
            {t('disc_last_updated')} {LAST_UPDATED}
          </motion.p>
          <motion.div className="flex flex-wrap items-center justify-end gap-6 mt-8" variants={itemFade}>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button onClick={() => setCurrency('HK')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'HK' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-HK</button>
              <button onClick={() => setCurrency('US')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'US' ? 'bg-white shadow-sm text-scoin-primary' : 'text-slate-500 hover:text-slate-800'}`}>Scoin-US</button>
            </div>
          </motion.div>
        </motion.header>

        {/* Left-Right Layout: Chart fixed (left) | Data Cards scrollable (right, no scrollbar) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 lg:gap-12 lg:items-stretch lg:min-h-0 lg:h-[calc(100vh-12rem)]">
          {/* Left: Fixed Trend Chart (does not stretch) */}
          <motion.section
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 order-2 lg:order-1 lg:self-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            aria-labelledby="chart-heading"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 id="chart-heading" className="text-xl font-bold text-slate-900" style={{ letterSpacing: '0.02em' }}>
                {t('disc_issued')} vs {t('disc_redeemed')}
              </h2>
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value as ChartRange)}
                className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] outline-none"
                aria-label={lang === 'EN' ? 'Chart time range' : '圖表時間範圍'}
              >
                <option value="7">7 {lang === 'EN' ? 'Day' : '日'}</option>
                <option value="30">30 {lang === 'EN' ? 'Day' : '日'}</option>
                <option value="365">365 {lang === 'EN' ? 'Day' : '日'}</option>
              </select>
            </div>
            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="circ-issuedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0066FF" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="circ-redeemedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9D4EDD" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#9D4EDD" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 12,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                    labelStyle={{ color: '#334155' }}
                    formatter={(value: number, name: string) => [`${Number(value).toFixed(2)}B`, name === 'issued' ? t('disc_issued') : t('disc_redeemed')]}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 16 }}
                    formatter={(value: string) => <span className="text-slate-700 text-sm font-medium">{value === 'issued' ? t('disc_issued') : t('disc_redeemed')}</span>}
                  />
                  <Area type="monotone" dataKey="issued" stroke="#0066FF" strokeWidth={2} fill="url(#circ-issuedGrad)" name="issued" isAnimationActive animationDuration={1200} animationEasing="ease-out" />
                  <Area type="monotone" dataKey="redeemed" stroke="#9D4EDD" strokeWidth={2} fill="url(#circ-redeemedGrad)" name="redeemed" isAnimationActive animationDuration={1200} animationEasing="ease-out" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {/* Right: Data Cards — scrollable, scrollbar hidden */}
          <div
            ref={cardsRef}
            className="space-y-6 order-1 lg:order-2 lg:min-h-0 lg:overflow-y-auto scrollbar-hide"
          >
            {/* 2x2 Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {metricCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
                  initial={{ opacity: 0, y: 24 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.12)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                >
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{card.label}</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currency}-${card.label}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-lg md:text-xl font-black ${card.color}`}
                    >
                      {card.value}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            {/* Issuance & Redemption Breakdown — 3 cards */}
            <div className="space-y-4" aria-labelledby="breakdown-heading">
              <h2 id="breakdown-heading" className="sr-only">{t('disc_composition')}</h2>
              {breakdown.map((row, i) => (
                <motion.div
                  key={row.period}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.32 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                >
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">
                    {row.period === '7d' ? t('disc_7d_change') : row.period === '30d' ? t('disc_30d_change') : (lang === 'EN' ? '365 Day Change' : '365日變化')}
                  </span>
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">{t('disc_issued')}</p>
                      <p className="text-sm font-bold text-[#0066FF]">{row.issued}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">{t('disc_redeemed')}</p>
                      <p className="text-sm font-bold text-[#9D4EDD]">{row.redeemed}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">{t('disc_change_circulation')}</p>
                      <p className={`text-sm font-bold ${row.positive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {row.change}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclosureCirculation;
