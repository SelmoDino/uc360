import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Compass, Mountain, Leaf, FileText, ExternalLink, Layers, ShieldAlert, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConservationUnit, conservationUnits } from '../data/ucs';
import { ucsZoningData, ZoneDetail } from '../data/zoning';

type SliderUIProps = {
  activeUc: ConservationUnit;
  onSelect: (uc: ConservationUnit) => void;
  onSelectZone?: (zone: ZoneDetail) => void;
};

export default function SliderUI({ activeUc, onSelect, onSelectZone }: SliderUIProps) {
  const currentIndex = conservationUnits.findIndex(u => u.id === activeUc.id);
  const [activeTab, setActiveTab] = useState('sobre');
  const [activeSubTab, setActiveSubTab] = useState('paisagem');
  const [galleryIdx, setGalleryIdx] = useState(0);

  const galleryImages = activeUc.id === 'supbig' && activeTab === 'licenciamento'
    ? [
        '/SUPBIG1/1.jpg',
        '/SUPBIG1/2.jpg',
        '/SUPBIG1/3.jpg',
        '/SUPBIG1/4.jpg'
      ]
    : activeUc.id === 'supbig' && activeTab === 'fiscalizacao'
      ? [
          '/SUPBIG2/5.jpg',
          '/SUPBIG2/7.jpg',
          '/SUPBIG2/8.jpg'
        ]
      : activeUc.gallery && activeUc.gallery.length > 0
        ? activeUc.gallery
        : [activeUc.imageUrl];

  // Reset gallery index when active unit, tab, or subtab changes
  useEffect(() => {
    setGalleryIdx(0);
  }, [activeUc.id, activeTab, activeSubTab]);

  // Reset activeTab to 'sobre' when activeUc changes
  useEffect(() => {
    setActiveTab('sobre');
  }, [activeUc.id]);

  const nextGalleryPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setGalleryIdx(prev => (prev + 1) % galleryImages.length);
  };

  const prevGalleryPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setGalleryIdx(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const isGalleryActive = activeUc.id === 'supbig'
    ? (activeTab === 'fiscalizacao' || activeTab === 'licenciamento')
    : activeTab === 'turismo';

  const tabs = activeUc.id === 'supbig'
    ? [
        { id: 'sobre', label: 'Sobre' },
        { id: 'zoneamento', label: 'Zoneamento Regional' },
        { id: 'atribuicoes', label: 'Atribuições' },
        { id: 'licenciamento', label: 'Licenciamento Ambiental' },
        { id: 'fiscalizacao', label: 'Fiscalização Ambiental' }
      ]
    : [
        { id: 'sobre', label: 'Sobre a Unidade' },
        { id: 'zoneamento', label: 'Zoneamento' },
        { id: 'recursos', label: 'Recursos e Valores' },
        { id: 'turismo', label: activeUc.id === 'esec-tamoios' ? 'Acesso Científico' : activeUc.id === 'rebio-praia-do-sul' ? 'Paisagem' : 'Turismo' },
        { id: 'projetos', label: 'Projetos' },
        { id: 'plano', label: 'Plano de Manejo' }
      ];

  const goNext = () => {
    const nextIdx = (currentIndex + 1) % conservationUnits.length;
    onSelect(conservationUnits[nextIdx]);
    setActiveTab('sobre'); // reset tab
  };

  const goPrev = () => {
    const prevIdx = (currentIndex - 1 + conservationUnits.length) % conservationUnits.length;
    onSelect(conservationUnits[prevIdx]);
    setActiveTab('sobre');
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
      
      {/* Top Banner with Responsive Unit's Tab Menu */}
      <header className="relative z-30 w-full pointer-events-none pt-3 sm:pt-4 pb-1 shrink-0 flex flex-col gap-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
          
          {/* Menu (Unit's Tabs Menu): Adapts to page width */}
          <div className="bg-black/45 backdrop-blur-xl px-4 py-1.5 sm:py-2.5 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between pointer-events-auto">
            <div className="hidden lg:flex flex-col text-left mr-5 shrink-0">
              <span className="text-xs uppercase tracking-widest font-black text-[#34d399] flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" /> Menu da Unidade
              </span>
              <span className="text-[9px] text-white/40 uppercase tracking-widest font-semibold font-mono">Informações Ativas</span>
            </div>

            {/* Tab Selector Buttons */}
            <div className="flex gap-1.5 sm:gap-2.5 overflow-x-auto hide-scrollbar max-w-full pb-0.5 scroll-smooth w-full lg:w-auto">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id === 'turismo') {
                        setActiveSubTab(activeUc.id === 'rebio-praia-do-sul' ? 'paisagem' : 'ecoturismo');
                      } else {
                        setActiveSubTab('paisagem');
                      }
                    }}
                    className={`shrink-0 px-3 py-1.5 h-8 sm:h-8.5 rounded-full relative overflow-hidden transition-all duration-300 flex items-center gap-1.5 border text-xs cursor-pointer ${
                      isActive 
                        ? 'bg-[#10b981]/15 border-[#10b981] text-[#34d399] font-extrabold shadow-[0_0_10px_-2px_rgba(16,185,129,0.3)]' 
                        : 'bg-black/35 hover:bg-white/10 border-white/10 text-white/70 hover:text-white font-semibold'
                    }`}
                  >
                    <span className={`text-[9px] font-mono leading-none font-bold ${isActive ? 'text-[#34d399]' : 'text-white/45'}`}>
                      0{idx + 1}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </header>
      
      {/* Background Image Layer (Right Half with Fade) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeUc.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-y-0 right-0 w-full md:w-[65%] z-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
          }}
        >
          <img 
            src={activeUc.imageUrl} 
            alt={activeUc.abbr} 
            className="w-full h-full object-cover"
            onError={(e) => {
              if (activeUc.gallery && activeUc.gallery.length > 0 && e.currentTarget.src !== activeUc.gallery[0]) {
                e.currentTarget.src = activeUc.gallery[0];
              }
            }}
          />
          <div className="absolute inset-0 bg-ink/40"></div>
        </motion.div>
      </AnimatePresence>



      {/* Main Content Area: Centered or Right-aligned Glass Card */}
      <div className="relative z-20 flex-1 flex flex-col lg:flex-row justify-center lg:justify-end items-center px-4 sm:px-8 xl:px-20 gap-6 lg:gap-8 pointer-events-none w-full mt-2 mb-4 overflow-hidden">
        
        {/* Gallery Slideshow (Visible only on Landscape "Paisagem" or "Turismo") */}
        <AnimatePresence>
          {isGalleryActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex-1 w-full h-[28vh] sm:h-[35vh] lg:h-[480px] xl:h-[550px] min-h-[220px] md:min-h-[300px] relative rounded-3xl overflow-hidden border border-white/10 bg-black/45 backdrop-blur-xl shadow-2xl flex items-center justify-center group/gal pointer-events-auto"
            >
              {/* Blurred background image for ambient lighting */}
              <div className={`absolute inset-0 scale-110 blur-2xl pointer-events-none transition-opacity duration-300 ${
                activeUc.id === 'supbig' ? 'opacity-[0.85]' : 'opacity-35'
              }`}>
                <img 
                  src={galleryImages[galleryIdx] || activeUc.imageUrl} 
                  alt="" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    if (e.currentTarget.src !== activeUc.imageUrl) {
                      e.currentTarget.src = activeUc.imageUrl;
                    }
                  }}
                />
              </div>

              {/* Main high resolution slide image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={galleryIdx}
                  src={galleryImages[galleryIdx] || activeUc.imageUrl}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className={`absolute inset-0 rounded-3xl ${
                    activeUc.id === 'supbig'
                      ? 'object-cover w-[82%] h-[92%] m-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10'
                      : 'object-cover w-full h-full'
                  }`}
                  alt={`Slide ${activeUc.shortName} - ${galleryIdx + 1}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e.currentTarget.src !== activeUc.imageUrl) {
                      e.currentTarget.src = activeUc.imageUrl;
                    }
                  }}
                />
              </AnimatePresence>

              {/* Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35 pointer-events-none" />

              {/* Left Navigation Arrow */}
              <button
                onClick={prevGalleryPhoto}
                className="absolute left-4 w-11 h-11 rounded-full bg-black/55 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#10b981] hover:text-white transition-all active:scale-95 cursor-pointer z-35 shadow-lg group-hover/gal:opacity-100 opacity-90 lg:opacity-0 group-hover/gal:translate-x-0 -translate-x-1 lg:-translate-x-1 duration-300"
                title="Foto anterior"
              >
                <ChevronLeft size={22} className="group-hover:scale-110 transition-transform" />
              </button>

              {/* Right Navigation Arrow */}
              <button
                onClick={nextGalleryPhoto}
                className="absolute right-4 w-11 h-11 rounded-full bg-black/55 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#10b981] hover:text-white transition-all active:scale-95 cursor-pointer z-35 shadow-lg group-hover/gal:opacity-100 opacity-90 lg:opacity-0 group-hover/gal:translate-x-0 translate-x-1 lg:translate-x-1 duration-300"
                title="Próxima foto"
              >
                <ChevronRight size={22} className="group-hover:scale-110 transition-transform" />
              </button>

              {/* Top Details Pill Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30 pointer-events-none">
                <span className="text-xs uppercase tracking-widest font-black text-white bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  {activeUc.id === 'supbig' && activeTab === 'licenciamento' ? 'Licenciamento Ambiental' : 'Paisagem Natural'}
                </span>
                <span className="text-[11px] font-mono font-extrabold text-[#34d399] bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                  {galleryIdx + 1} / {galleryImages.length}
                </span>
              </div>

              {/* Bottom Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/5">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryIdx(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      galleryIdx === idx ? 'bg-[#34d399] w-5' : 'bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Ir para foto ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Card (Glass Card) */}
        <div className="w-full max-w-lg xl:max-w-xl shrink-0 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${activeUc.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-black/35 backdrop-blur-xl p-5 sm:p-7 rounded-3xl border border-white/10 shadow-2xl text-white h-[45vh] sm:h-[48vh] lg:h-[480px] xl:h-[550px] min-h-[340px] md:min-h-[440px] flex flex-col justify-start pointer-events-auto"
            >
              {/* Unified Header: Logo, Category and Title (Visible on all screen sizes) */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10 shrink-0">
                {activeUc.logoUrl && (
                  <img 
                    src={activeUc.logoUrl} 
                    alt={`Logo ${activeUc.shortName}`} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className={`w-[53px] h-[53px] sm:w-[71px] sm:h-[71px] object-contain drop-shadow-md rounded-xl p-1 shrink-0 ${
                      activeUc.id === 'supbig' ? 'bg-white' : 'bg-black/25'
                    }`}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full inline-block font-extrabold uppercase tracking-widest text-[#a3f3b9] mb-1">
                    {activeUc.category}
                  </div>
                  <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight truncate">
                    {activeUc.name.replace(activeUc.category, '').trim()}
                  </h1>
                </div>
              </div>

              {/* Gestor da Unidade */}
              <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl mb-4 text-xs font-semibold shrink-0">
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-black flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sea" /> Gestor da Unidade
                </span>
                <span className="text-[#a3f3b9] bg-white/10 px-3 py-1 rounded-lg border border-white/10 text-[16.5px] font-bold truncate max-w-[210px] sm:max-w-md">
                  {activeUc.gestor || 'Não designado'}
                </span>
              </div>

              {/* Sub Tabs for Turismo (visible on all screens when activeTab is turismo) */}
              {activeTab === 'turismo' && activeUc.id !== 'rebio-praia-do-sul' && (
                <div className="flex gap-1.5 mb-4 p-1 bg-white/5 rounded-xl border border-white/5 shrink-0">
                  <button 
                    onClick={() => setActiveSubTab('ecoturismo')} 
                    className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeSubTab === 'ecoturismo' ? 'bg-[#a3f3b9]/25 text-[#a3f3b9]' : 'text-white/60 hover:text-white/80'}`}
                  >
                    {activeUc.id === 'esec-tamoios' ? '3.1 Acesso Científico' : '3.1 Ecoturismo'}
                  </button>
                  <button 
                    onClick={() => setActiveSubTab('paisagem')} 
                    className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeSubTab === 'paisagem' ? 'bg-[#a3f3b9]/25 text-[#a3f3b9]' : 'text-white/60 hover:text-white/80'}`}
                  >
                    3.2 Paisagem
                  </button>
                </div>
              )}

              {/* SCROLLABLE INNER BODY PORTION - Fades on inner tab/subtab transitions */}
              <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-${activeSubTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {activeTab === 'sobre' && (
                      <div className="space-y-4">
                        <div>
                          <div className="hidden lg:inline-flex py-1 px-3 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 w-fit">
                            {activeUc.category}
                          </div>
                          
                          <h2 className="hidden lg:block text-3xl font-bold leading-tight mb-2 tracking-tight">
                            {activeUc.name.replace(activeUc.category, '').trim()}
                          </h2>

                          <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed font-normal">
                            {activeUc.presentation.description}
                          </p>
                        </div>

                        {activeUc.id !== 'supbig' && (
                          <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex flex-col">
                                <span className="text-[9px] text-white/50 uppercase tracking-widest font-extrabold">Dimensão</span>
                                <span className="text-xs font-semibold">{activeUc.presentation.dimensao}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[9px] text-white/50 uppercase tracking-widest font-extrabold">Localização</span>
                                <span className="text-xs font-semibold">{activeUc.presentation.localizacao}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                              <div className="flex flex-col">
                                <span className="text-[9px] text-white/50 uppercase tracking-widest font-extrabold">Abrangência</span>
                                <span className="text-xs font-semibold">{activeUc.presentation.abrangencia}</span>
                              </div>
                              {activeUc.presentation.regiaoHidrografica && (
                                <div className="flex flex-col">
                                  <span className="text-[9px] text-white/50 uppercase tracking-widest font-extrabold">Região Hidrográfica</span>
                                  <span className="text-xs font-semibold text-sea font-bold">{activeUc.presentation.regiaoHidrografica}</span>
                                </div>
                              )}
                            </div>
                            {activeUc.presentation.mosaico && (
                              <div className="pt-2 border-t border-white/5 flex flex-col">
                                <span className="text-[9px] text-white/50 uppercase tracking-widest font-extrabold">Mosaicos Integrantes</span>
                                <span className="text-xs font-semibold text-[#a3f3b9] font-bold">{activeUc.presentation.mosaico}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {activeUc.presentation.visitacao && activeUc.id !== 'supbig' && (
                          <div className="mt-2 pt-3 border-t border-white/10">
                            <h4 className="text-[10px] text-[#ffb07c] uppercase tracking-widest font-black mb-2 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb07c]" /> Regras de Visitação e Acesso
                            </h4>
                            <div className="bg-[#ffb07c]/10 p-3 rounded-xl border border-[#ffb07c]/20 text-[11px] leading-relaxed text-white/90">
                              {activeUc.presentation.visitacao}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'atribuicoes' && activeUc.supbigSpecial && (
                      <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-1 tracking-tight">
                          Atribuições
                        </h2>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#a3f3b9] mb-4 uppercase tracking-widest">
                          Competências Institucionais
                        </h3>
                        <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed font-normal antialiased">
                          {activeUc.supbigSpecial.atribuicoes}
                        </p>
                      </div>
                    )}

                    {activeTab === 'licenciamento' && activeUc.supbigSpecial && (
                      <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-1 tracking-tight">
                          Licenciamento Ambiental
                        </h2>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#a3f3b9] mb-4 uppercase tracking-widest">
                          Prevenção e Sustentabilidade
                        </h3>
                        <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed font-normal antialiased">
                          {activeUc.supbigSpecial.licenciamento}
                        </p>
                      </div>
                    )}

                    {activeTab === 'fiscalizacao' && activeUc.id === 'supbig' && activeUc.supbigSpecial && (
                      <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-1 tracking-tight">
                          Fiscalização Ambiental
                        </h2>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#a3f3b9] mb-4 uppercase tracking-widest">
                          Segurança e Monitoramento dos Ecossistemas
                        </h3>
                        
                        <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed font-normal antialiased">
                          A fiscalização ambiental desempenha papel fundamental na proteção dos ecossistemas da Costa Verde, atuando na prevenção, identificação e repressão de atividades que possam causar degradação ambiental. Por meio de ações de monitoramento, vistorias técnicas e aplicação da legislação vigente, a SUPBIG busca assegurar a conservação dos recursos naturais, da biodiversidade e dos serviços ecossistêmicos essenciais à região. Se encontra dividida em dois núcleos, sendo eles:
                        </p>

                        <div className="space-y-3 pt-2">
                          <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl flex gap-3.5 items-start">
                            <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0 mt-1.5" />
                            <div className="text-xs sm:text-[13px] leading-relaxed">
                              <strong className="text-white font-black block mb-0.5">Pós Licença</strong>
                              <span className="text-white/75">Compete a este núcleo fiscalizar se as condicionantes das licenças ambientais emitidas pelo INEA estão sendo cumpridas.</span>
                            </div>
                          </div>

                          <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl flex gap-3.5 items-start">
                            <span className="w-2 h-2 rounded-full bg-sea shrink-0 mt-1.5" />
                            <div className="text-xs sm:text-[13px] leading-relaxed">
                              <strong className="text-white font-black block mb-0.5">Atendimento</strong>
                              <span className="text-white/75">Compete a este núcleo o atendimento a demandas ministeriais, da Ouvidoria do INEA e demais órgãos competentes.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'zoneamento' && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <h2 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight">
                              Zoneamento Ambiental
                            </h2>
                            <h3 className="text-xs font-semibold text-[#a3f3b9] uppercase tracking-widest mt-0.5">
                              Normas e Usos do Plano de Manejo
                            </h3>
                          </div>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                            <Layers size={11} /> {ucsZoningData[activeUc.id]?.zones.length || 0} Zonas
                          </span>
                        </div>

                        <p className="text-white/80 text-xs leading-relaxed font-normal">
                          {ucsZoningData[activeUc.id]?.summary || 'Zonas territoriais com regras específicas de conservação, uso público e pesquisa.'}
                        </p>

                        <div className="space-y-2.5 max-h-[220px] sm:max-h-[250px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
                          {ucsZoningData[activeUc.id]?.zones.map((zone) => (
                            <div
                              key={zone.id}
                              onClick={() => onSelectZone && onSelectZone(zone)}
                              className="bg-white/5 hover:bg-white/10 transition-all p-3 rounded-2xl border border-white/10 flex flex-col gap-1.5 cursor-pointer group"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="px-2 py-0.5 rounded-md font-mono font-black text-xs text-white"
                                    style={{ backgroundColor: zone.color }}
                                  >
                                    {zone.code}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                                    {zone.name}
                                  </span>
                                </div>
                                <span className="text-[10px] text-white/50 font-mono">
                                  {zone.areaPercent}
                                </span>
                              </div>
                              <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                                {zone.description}
                              </p>
                              <div className="flex items-center gap-2 pt-1">
                                <span className="text-[9px] font-semibold text-emerald-400/90 flex items-center gap-1">
                                  <CheckCircle2 size={10} /> {zone.allowedActivities.length} Permitidas
                                </span>
                                <span className="text-white/30">•</span>
                                <span className="text-[9px] font-semibold text-rose-400/90 flex items-center gap-1">
                                  <AlertTriangle size={10} /> {zone.forbiddenActivities.length} Restrições
                                </span>
                                <span className="ml-auto text-[10px] text-emerald-400 group-hover:translate-x-0.5 transition-transform font-bold">
                                  Ver Detalhes →
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'recursos' && (
                      <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-1 tracking-tight">
                          Recursos e Valores
                        </h2>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#a3f3b9] mb-4 uppercase tracking-widest">
                          Patrimônio Socio-Biodiverso
                        </h3>
                        
                        <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-normal antialiased">
                          {activeUc.recursos.socio}
                        </p>
                      </div>
                    )}

                    {activeTab === 'turismo' && (
                      <div className="space-y-4">
                        {activeSubTab === 'ecoturismo' ? (
                          <>
                            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 tracking-tight">
                              {activeUc.id === 'esec-tamoios' ? 'Acesso Científico' : 'Ecoturismo'}
                            </h2>

                            <div className="space-y-5">
                              <div>
                                <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#a3f3b9] mb-3 flex items-center gap-2">
                                  <MapPin size={14} /> {activeUc.id === 'esec-tamoios' ? 'Acessos Autorizados' : 'Principais Trilhas'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {activeUc.trails && activeUc.trails.length > 0 ? (
                                    activeUc.trails.slice(0, 5).map((trail, idx) => (
                                      <span key={`trail-${idx}`} className="bg-black/40 border border-white/5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium">
                                        {trail}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-white/45 text-xs">
                                      {activeUc.id === 'esec-tamoios' ? 'Sem acessos registrados.' : 'Sem trilhas cadastradas.'}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-sea mb-3 flex items-center gap-2">
                                  <Mountain size={14} /> {activeUc.id === 'esec-tamoios' ? 'Pontos Científicos' : 'Pontos Turísticos'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {activeUc.pointsOfInterest && activeUc.pointsOfInterest.length > 0 ? (
                                    activeUc.pointsOfInterest.slice(0, 5).map((poi, idx) => (
                                      <span key={`poi-${idx}`} className="bg-black/40 border border-white/5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium text-white/90">
                                        {poi}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-white/45 text-xs">
                                      {activeUc.id === 'esec-tamoios' ? 'Sem pontos científicos cadastrados.' : 'Sem pontos turísticos cadastrados.'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-1 tracking-tight">
                              Paisagem Natural
                            </h2>
                            <h3 className="text-xs sm:text-sm font-semibold text-[#a3f3b9] mb-4 uppercase tracking-widest">
                              Galeria e Beleza Cênica
                            </h3>
                            <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-normal antialiased">
                              {activeUc.recursos.paisagem}
                            </p>
                          </>
                        )}
                      </div>
                    )}

                    {activeTab === 'projetos' && (
                      <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2 tracking-tight">
                          Projetos
                        </h2>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                          {activeUc.projetos.description}
                        </p>
                        <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                          {activeUc.projetos.items.map((project, idx) => (
                            <div key={idx} className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col gap-1">
                              <div className="flex items-center gap-2.5">
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: project.color === 'sea' ? '#a3f3e9' : project.color }} />
                                <span className="text-xs sm:text-sm font-bold text-white leading-tight">{project.title}</span>
                              </div>
                              <p className="text-[11px] sm:text-xs text-white/70 pl-4.5 leading-normal">{project.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'plano' && (
                      <div className="space-y-4 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-center gap-2.5 mb-2.5">
                            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                              Plano de Manejo
                            </h2>
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
                              <FileText className="w-3 h-3" /> PDF
                            </span>
                          </div>
                          
                          <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                            {activeUc.planoDeManejo.description}
                          </p>

                          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-xs space-y-2">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                              <span className="text-white/50">Órgão Regulador:</span>
                              <span className="text-white/90 font-medium">
                                {activeUc.id === 'esec-tamoios' || activeUc.id === 'ngi-paraty' ? 'ICMBio (Federal)' : 'INEA (Estadual)'}
                              </span>
                            </div>
                            <div className="flex justify-between pt-1">
                              <span className="text-white/50">Status de Gestão:</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#34d399] font-bold text-[9px] border border-emerald-500/30 uppercase tracking-wide">
                                Minuta Homologada / Ativa
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <a 
                          href={activeUc.planoDeManejo.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 bg-[#10b981] hover:bg-[#059669] transition-all rounded-xl text-xs sm:text-sm font-semibold border border-white/20 shadow-lg w-full sm:w-fit text-center flex items-center justify-center gap-2 text-white active:scale-95"
                        >
                          <FileText className="w-4 h-4" />
                          Acessar Documento Oficial
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Selector & Controls Navigation */}
      <footer className="relative z-35 w-full pb-5 pt-3 pointer-events-none shrink-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row gap-4 items-center w-full">
          
          {/* Arrow controls container with deep glass effect */}
          <div className="flex gap-2 items-center bg-black/60 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shrink-0 shadow-2xl pointer-events-auto">
            <button 
              onClick={goPrev} 
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#10b981] hover:text-[#34d399] flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer border border-white/10"
              title="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={goNext} 
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#34d399] transition-all active:scale-95 cursor-pointer"
              title="Próxima"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* New main menu of conservation units which adapts to page width beautifully */}
          <div className="flex-1 bg-black/60 backdrop-blur-xl px-4 py-2.5 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl flex items-center justify-between pointer-events-auto w-full">
            <div className="hidden lg:flex flex-col text-left mr-5 shrink-0">
              <span className="text-xs uppercase tracking-widest font-black text-[#10b981] flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" /> Unidades de Conservação
              </span>
              <span className="text-[9px] text-white/40 uppercase tracking-widest font-semibold font-mono">Territórios Preservados</span>
            </div>

            {/* Desktop & Tablet: Horizontally scrollable buttons matching the principal style */}
            <div className="hidden sm:flex gap-2 overflow-x-auto hide-scrollbar max-w-full pb-0.5 scroll-smooth w-full lg:w-auto">
              {conservationUnits.map((uc, idx) => {
                const isActive = activeUc.id === uc.id;
                return (
                  <button
                    key={uc.id}
                    onClick={() => {
                      onSelect(uc);
                      setActiveTab('sobre');
                    }}
                    className={`shrink-0 px-3.5 py-1.5 h-9 rounded-full relative overflow-hidden transition-all duration-300 flex items-center gap-1.5 border text-xs cursor-pointer ${
                      isActive 
                        ? 'bg-[#10b981]/20 border-[#10b981] text-[#34d399] font-extrabold shadow-[0_0_12px_-2px_rgba(16,185,129,0.4)]' 
                        : 'bg-black/45 hover:bg-white/10 border-white/10 text-white/70 hover:text-white font-semibold'
                    }`}
                  >
                    <span className={`text-[9px] font-mono leading-none font-bold ${isActive ? 'text-[#34d399]' : 'text-white/45'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{uc.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile (xs screens): Clean Select Dropdown to adapt beautifully to page width */}
            <div className="flex sm:hidden w-full items-center justify-between gap-2">
              <span className="text-xs text-[#34d399] font-extrabold flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" /> UC:
              </span>
              <select
                value={activeUc.id}
                onChange={(e) => {
                  const target = conservationUnits.find(u => u.id === e.target.value);
                  if (target) {
                    onSelect(target);
                    setActiveTab('sobre');
                  }
                }}
                className="flex-1 bg-black/75 text-white border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-bold outline-none cursor-pointer focus:border-[#10b981]"
              >
                {conservationUnits.map((uc, uIdx) => (
                  <option key={uc.id} value={uc.id} className="bg-neutral-900 text-white font-semibold">
                    {String(uIdx + 1).padStart(2, '0')}. {uc.shortName} ({uc.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
