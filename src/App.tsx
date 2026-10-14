import { useState } from 'react';
import MapView from './components/MapView';
import SliderUI from './components/SliderUI';
import ZoningBar from './components/ZoningBar';
import { ConservationUnit, conservationUnits } from './data/ucs';
import { ZoneDetail } from './data/zoning';

export default function App() {
  const [activeUc, setActiveUc] = useState<ConservationUnit>(conservationUnits[0]);
  const [selectedZone, setSelectedZone] = useState<ZoneDetail | null>(null);
  const [isZoningVisible, setIsZoningVisible] = useState(true);

  const handleSelectUc = (uc: ConservationUnit) => {
    setActiveUc(uc);
    setSelectedZone(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-sand font-sans">
      
      {/* Background Interactive Map */}
      <MapView 
        selectedUc={activeUc} 
        onSelectUc={handleSelectUc}
        selectedZone={selectedZone}
        onSelectZone={setSelectedZone}
        isZoningVisible={isZoningVisible}
      />

      {/* Modern Interactive Zoning Bar & Detail Cards - Placed Above the Map */}
      <ZoningBar
        activeUc={activeUc}
        selectedZone={selectedZone}
        onSelectZone={setSelectedZone}
        isZoningVisible={isZoningVisible}
        onToggleZoning={() => setIsZoningVisible(prev => !prev)}
      />

      {/* Modern Slider UI Overlay */}
      <SliderUI 
        activeUc={activeUc} 
        onSelect={handleSelectUc}
        onSelectZone={setSelectedZone}
      />

    </div>
  );
}
