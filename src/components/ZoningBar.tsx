import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, X, ShieldAlert, CheckCircle2, AlertTriangle, Compass, MapPin, Eye, EyeOff, ChevronDown, Sparkles } from 'lucide-react';
import { ConservationUnit } from '../data/ucs';
import { ucsZoningData, ZoneDetail } from '../data/zoning';

type ZoningBarProps = {
  activeUc: ConservationUnit;
  selectedZone: ZoneDetail | null;
  onSelectZone: (zone: ZoneDetail | null) => void;
  isZoningVisible: boolean;
  onToggleZoning: () => void;
  onFlyToCoordinates?: (coords: [number, number], zoom?: number) => void;
};

export default function ZoningBar({
  activeUc,
  selectedZone,
  onSelectZone,
  isZoningVisible,
  onToggleZoning,
  onFlyToCoordinates
}: ZoningBarProps) {
  const [isBarExpanded, setIsBarExpanded] = useState(true);
  const unitZoning = ucsZoningData[activeUc.id];

  if (!unitZoning || !unitZoning.zones || unitZoning.zones.length === 0) {
    return null;
  }

  const handleZoneClick = (zone: ZoneDetail) => {
    if (selectedZone?.id === zone.id) {
      onSelectZone(null);
    } else {
      onSelectZone(zone);
      if (onFlyToCoordinates) {
        onFlyToCoordinates(zone.coordinates, 13);
      }
    }
  };

  return (
    <>
      {/* Floating Zoning Bar Above the Map */}
      <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-auto z-30 pointer-events-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/55 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-2.5 sm:p-3 text-white"
        >
          {/* Header Row: Title & Toggle controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers size={17} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400 font-mono">
                    Zoneamento Oficial
                  </span>
                  <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full text-white/70 font-semibold">
                    Plano de Manejo
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                  {activeUc.shortName}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Show/Hide Map Layer Toggle */}
              <button
                onClick={onToggleZoning}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isZoningVisible
                    ? 'bg-emerald-500/25 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/35'
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                }`}
                title={isZoningVisible ? 'Ocultar polígonos no mapa' : 'Exibir polígonos no mapa'}
              >
                {isZoningVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                <span className="hidden sm:inline">{isZoningVisible ? 'No Mapa' : 'Oculto'}</span>
              </button>

              {/* Collapse/Expand button */}
              <button
                onClick={() => setIsBarExpanded(!isBarExpanded)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                title={isBarExpanded ? 'Recolher zonas' : 'Expandir zonas'}
              >
                <ChevronDown size={15} className={`transition-transform duration-300 ${isBarExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Expandable Zones Chips Row */}
          <AnimatePresence>
            {isBarExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pt-1 border-t border-white/10"
              >
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {unitZoning.zones.map((zone) => {
                    const isSelected = selectedZone?.id === zone.id;
                    return (
                      <button
                        key={zone.id}
                        onClick={() => handleZoneClick(zone)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-white text-gray-900 border-white shadow-lg shadow-white/10 scale-102 font-bold'
                            : 'bg-white/5 hover:bg-white/15 border-white/10 text-white/90'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: zone.color }}
                        />
                        <span className="font-mono font-black text-[11px] opacity-80">
                          {zone.code}
                        </span>
                        <span className="truncate max-w-[120px] sm:max-w-[160px]">
                          {zone.name.replace(/Zona (de|da)?/i, '').trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Zone Details Modal / Drawer after click */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-4 top-24 sm:top-20 sm:left-6 sm:right-auto sm:w-[480px] max-h-[80vh] z-40 bg-gray-950/90 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-white overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Modal Top Header with color bar */}
            <div className="relative p-5 pb-4 border-b border-white/10 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-black font-mono text-base shadow-lg shrink-0 text-white border border-white/20"
                  style={{ backgroundColor: selectedZone.color }}
                >
                  {selectedZone.code}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white/90"
                      style={{ backgroundColor: `${selectedZone.color}40`, border: `1px solid ${selectedZone.color}60` }}
                    >
                      {selectedZone.protectionLevel}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                    {selectedZone.name}
                  </h2>
                  <p className="text-xs text-white/50 mt-0.5 font-mono">
                    {selectedZone.areaPercent}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => onSelectZone(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer shrink-0"
                title="Fechar detalhes"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm scrollbar-thin scrollbar-thumb-white/20">
              {/* Description */}
              <div className="bg-white/5 rounded-2xl p-3.5 border border-white/5">
                <p className="text-white/85 leading-relaxed">
                  {selectedZone.description}
                </p>
              </div>

              {/* Objectives */}
              {selectedZone.objectives && selectedZone.objectives.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} />
                    Objetivos da Zona
                  </h4>
                  <ul className="space-y-1.5 bg-black/30 rounded-2xl p-3 border border-white/5">
                    {selectedZone.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/80 text-xs leading-snug">
                        <span className="text-emerald-400 mt-0.5 font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Allowed Activities */}
              {selectedZone.allowedActivities && selectedZone.allowedActivities.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-300 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Atividades Permitidas
                  </h4>
                  <div className="space-y-1.5 bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-3">
                    {selectedZone.allowedActivities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2 text-emerald-100/90 text-xs leading-snug">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Forbidden Activities / Restrictions */}
              {selectedZone.forbiddenActivities && selectedZone.forbiddenActivities.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-rose-300 mb-2 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-rose-400" />
                    Restrições e Usos Proibidos
                  </h4>
                  <div className="space-y-1.5 bg-rose-950/30 border border-rose-500/20 rounded-2xl p-3">
                    {selectedZone.forbiddenActivities.map((forb, i) => (
                      <div key={i} className="flex items-start gap-2 text-rose-100/90 text-xs leading-snug">
                        <ShieldAlert size={13} className="text-rose-400 shrink-0 mt-0.5" />
                        <span>{forb}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Footer */}
            <div className="p-3.5 bg-black/50 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-[11px] text-white/40 flex items-center gap-1">
                <MapPin size={12} />
                {selectedZone.coordinates[1].toFixed(4)}, {selectedZone.coordinates[0].toFixed(4)}
              </span>

              {onFlyToCoordinates && (
                <button
                  onClick={() => onFlyToCoordinates(selectedZone.coordinates, 13.5)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md shadow-emerald-500/20"
                >
                  <Compass size={14} />
                  Focar no Mapa
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
