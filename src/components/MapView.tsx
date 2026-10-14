import React, { useEffect, useRef } from 'react';
import maplibregl, { Map as MaplibreMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ConservationUnit, conservationUnits } from '../data/ucs';
import { ucsZoningData, getZoningGeojson, ZoneDetail } from '../data/zoning';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

const customRoutesGeojson = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {
        type: 'trail',
        name: 'Trilha do Pico do Papagaio',
        difficulty: 'Difícil',
        extension: '6 km'
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [-44.1687, -23.1425],
          [-44.1710, -23.1465],
          [-44.1750, -23.1510],
          [-44.1802, -23.1534],
          [-44.1840, -23.1560]
        ]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'trail',
        name: 'Caminho de Mambucaba',
        difficulty: 'Avançado',
        extension: '42 km'
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [-44.6200, -22.9500],
          [-44.6150, -22.9800],
          [-44.6180, -23.0100],
          [-44.6100, -23.0250],
          [-44.5950, -23.0500],
          [-44.5750, -23.0700],
          [-44.5500, -23.1100],
          [-44.5300, -23.1400],
          [-44.5240, -23.1750],
          [-44.5222, -23.1890]
        ]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'trail',
        name: 'Trilha do Ouro (Serra da Bocaina)',
        difficulty: 'Moderada',
        extension: '25 km'
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [-44.6500, -22.8500],
          [-44.6600, -22.8800],
          [-44.6800, -22.9200],
          [-44.7000, -22.9600],
          [-44.7200, -23.0000]
        ]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'navigation',
        name: 'Rota Náutica Paraty - Ilha Grande',
        vessel: 'Escuna / Lancha',
        time: '2h 30m'
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [-44.7120, -23.2180],
          [-44.6500, -23.1600],
          [-44.5500, -23.1200],
          [-44.4500, -23.1000],
          [-44.3300, -23.1400],
          [-44.2000, -23.1360]
        ]
      }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'navigation',
        name: 'Travessia Náutica Angra - Abraão',
        vessel: 'Ferry / Fast Boat',
        time: '45m'
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [-44.3180, -23.0150],
          [-44.2800, -23.0500],
          [-44.2200, -23.0900],
          [-44.1680, -23.1400]
        ]
      }
    }
  ]
};

const ecotourismPoisGeojson = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {
        type: 'peak',
        name: 'Pico do Frade (1560m)',
        emoji: '⛰️'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.2250, -22.9550] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'peak',
        name: 'Pico do Papagaio (982m)',
        emoji: '⛰️'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.1818, -23.1492] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'waterfall',
        name: 'Cachoeira da Feiticeira',
        emoji: '🌊'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.1950, -23.1380] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'beach',
        name: 'Praia de Lopes Mendes',
        emoji: '🏖️'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.1350, -23.1360] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'waterfall',
        name: 'Cachoeira do Tobogã',
        emoji: '🌊'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.7890, -23.2210] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'peak',
        name: 'Pico da Guarita (1840m)',
        emoji: '⛰️'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.6000, -22.9000] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'beach',
        name: 'Praia do Caixa d\'Aço',
        emoji: '🏖️'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.7210, -23.3440] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'scenic',
        name: 'Fiorde Saco do Mamanguá',
        emoji: '⛵'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.6400, -23.2840] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'waterfall',
        name: 'Cachoeira dos Sete Pintores',
        emoji: '🌊'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.1110, -22.9430] }
    },
    {
      type: 'Feature' as const,
      properties: {
        type: 'waterfall',
        name: 'Cachoeira do Crepúsculo',
        emoji: '🌊'
      },
      geometry: { type: 'Point' as const, coordinates: [-44.5900, -23.0300] }
    }
  ]
};

function generateContourCircle(centerX: number, centerY: number, radiusX: number, radiusY: number, elevation: number) {
  const coordinates: [number, number][] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const angle = (i * 2 * Math.PI) / steps;
    const noise = 1.0 + 0.15 * Math.sin(angle * 3) + 0.08 * Math.cos(angle * 5) + 0.05 * Math.sin(angle * 8);
    const x = centerX + radiusX * noise * Math.cos(angle);
    const y = centerY + radiusY * noise * Math.sin(angle);
    coordinates.push([x, y]);
  }
  return {
    type: 'Feature' as const,
    properties: {
      elevation,
      label: `${elevation}m`
    },
    geometry: {
      type: 'LineString' as const,
      coordinates
    }
  };
}

const customContoursGeojson = {
  type: 'FeatureCollection' as const,
  features: [
    // Pico do Frade (1560m) - concentric ridges
    generateContourCircle(-44.2250, -22.9550, 0.003, 0.002, 1500),
    generateContourCircle(-44.2250, -22.9550, 0.007, 0.005, 1200),
    generateContourCircle(-44.2250, -22.9550, 0.013, 0.009, 900),
    generateContourCircle(-44.2250, -22.9550, 0.021, 0.015, 600),
    generateContourCircle(-44.2250, -22.9550, 0.030, 0.022, 300),

    // Pico do Papagaio (982m)
    generateContourCircle(-44.1818, -23.1492, 0.004, 0.003, 900),
    generateContourCircle(-44.1818, -23.1492, 0.008, 0.006, 700),
    generateContourCircle(-44.1818, -23.1492, 0.013, 0.010, 500),
    generateContourCircle(-44.1818, -23.1492, 0.020, 0.015, 300),
    generateContourCircle(-44.1818, -23.1492, 0.028, 0.022, 100),

    // Pico da Guarita (1840m)
    generateContourCircle(-44.6000, -22.9000, 0.004, 0.003, 1800),
    generateContourCircle(-44.6000, -22.9000, 0.009, 0.007, 1500),
    generateContourCircle(-44.6000, -22.9000, 0.016, 0.012, 1200),
    generateContourCircle(-44.6000, -22.9000, 0.025, 0.019, 900),
    generateContourCircle(-44.6000, -22.9000, 0.036, 0.027, 600),
    generateContourCircle(-44.6000, -22.9000, 0.048, 0.037, 300),

    // Additional mountain ranges to fill the Serra do Mar with beautiful contours
    // Cairuçu / Paraty Mirim ridge (near Mamanguá)
    generateContourCircle(-44.6200, -23.3200, 0.005, 0.004, 1000),
    generateContourCircle(-44.6200, -23.3200, 0.011, 0.008, 800),
    generateContourCircle(-44.6200, -23.3200, 0.019, 0.014, 650),
    generateContourCircle(-44.6200, -23.3200, 0.029, 0.022, 400),
    generateContourCircle(-44.6200, -23.3200, 0.040, 0.031, 200),
    
    // Serra da Bocaina inland ridges (Upper Paraty highlands)
    generateContourCircle(-44.7500, -23.0000, 0.006, 0.005, 1400),
    generateContourCircle(-44.7500, -23.0000, 0.014, 0.011, 1100),
    generateContourCircle(-44.7500, -23.0000, 0.024, 0.019, 800),
    generateContourCircle(-44.7500, -23.0000, 0.036, 0.028, 500)
  ]
};

function applyCustomTopographicStyle(map: MaplibreMap) {
  try {
    const style = map.getStyle();
    if (!style || !style.layers) return;

    style.layers.forEach((layer) => {
      const id = layer.id.toLowerCase();
      const type = layer.type;

      // 1. Hide roads & transportation entirely
      const isRoad = id.includes('road') || 
                     id.includes('highway') || 
                     id.includes('street') || 
                     id.includes('path') || 
                     id.includes('rail') || 
                     id.includes('tunnel') || 
                     id.includes('bridge') || 
                     id.includes('transport') || 
                     id.includes('motorway') || 
                     id.includes('link') || 
                     id.includes('route') || 
                     id.includes('transit');

      if (isRoad) {
        try {
          map.setLayoutProperty(layer.id, 'visibility', 'none');
        } catch (e) {}
        return;
      }

      // 2. Water logic: "Mantenha a cor do mar no padrão original. Destaque ao máximo rios, nascentes e cursos d'água."
      const isOceanOrSea = id.includes('ocean') || id.includes('sea') || id.includes('marine') || (id === 'water' && type === 'fill' && !id.includes('river') && !id.includes('creek') && !id.includes('stream'));
      const isWatercourse = id.includes('river') || id.includes('stream') || id.includes('canal') || id.includes('waterway') || id.includes('creek') || id.includes('flow') || id.includes('spring') || id.includes('pool') || id.includes('reservoir') || id.includes('lake');

      if (isOceanOrSea) {
        // Leave oceans, major gulfs and coastal sea fills in their original Voyager style pattern/color!
        return;
      }

      if (isWatercourse) {
        try {
          if (type === 'fill') {
            map.setPaintProperty(layer.id, 'fill-color', '#0284c7'); // highly vibrant water blue
            map.setPaintProperty(layer.id, 'fill-opacity', 0.95);
          } else if (type === 'line') {
            map.setPaintProperty(layer.id, 'line-color', '#0284c7');
            map.setPaintProperty(layer.id, 'line-width', 2.8);
            map.setPaintProperty(layer.id, 'line-opacity', 0.95);
          }
        } catch (e) {}
        return;
      }

      // 3. Highlight preservation areas and forests in deep green tones
      const isForest = id.includes('forest') || 
                       id.includes('wood') || 
                       id.includes('park') || 
                       id.includes('green') || 
                       id.includes('nature') || 
                       id.includes('preservation') || 
                       id.includes('reserve') || 
                       id.includes('national-park') ||
                       id.includes('cropped') ||
                       id.includes('grass') ||
                       id.includes('indigenous') ||
                       id.includes('conservation');

      if (isForest) {
        try {
          if (type === 'fill') {
            map.setPaintProperty(layer.id, 'fill-color', '#064e3b'); // deep emerald forest green
            map.setPaintProperty(layer.id, 'fill-opacity', 0.85);
          }
        } catch (e) {}
        return;
      }

      // 4. Increase contrast of topographic hillshading/relief
      if (type === 'hillshade') {
        try {
          map.setPaintProperty(layer.id, 'hillshade-exaggeration', 1.1);
          map.setPaintProperty(layer.id, 'hillshade-shadow-color', '#022c22');
        } catch (e) {}
        return;
      }

      // 5. Light topographic background to contrast perfectly with deep emerald and active blue
      const isBackground = type === 'background' || id.includes('background') || id === 'basemap' || id.includes('continent') || id.includes('earth') || id.includes('land') || id === 'base';
      if (isBackground && !isForest && !isOceanOrSea && !isWatercourse) {
        try {
          if (type === 'background') {
            map.setPaintProperty(layer.id, 'background-color', '#efebe4');
          } else if (type === 'fill') {
            map.setPaintProperty(layer.id, 'fill-color', '#efebe4');
          }
        } catch (e) {}
      }

      // 6. Urban control: "Mantenha os nomes de vilarejos e bairros para orientação, mas oculte comércios e estabelecimentos urbanos"
      const isPoi = id.includes('poi') || id.includes('shop') || id.includes('amenity') || id.includes('commercial') || id.includes('office') || id.includes('station') || id.includes('restaurant') || id.includes('cafe') || id.includes('hotel') || id.includes('accommodation') || id.includes('hospital') || id.includes('school') || id.includes('transit');
      const isNaturalPoi = id.includes('park') || id.includes('natural') || id.includes('peak') || id.includes('mountain') || id.includes('summit') || id.includes('beach') || id.includes('waterfall') || id.includes('bay') || id.includes('lake') || id.includes('river') || id.includes('sea') || id.includes('ocean');

      if (isPoi && !isNaturalPoi) {
        try {
          map.setLayoutProperty(layer.id, 'visibility', 'none');
        } catch (e) {}
        return;
      }

      // 7. Orientation placenames: Maintain suburbs / villages / hamlets / neighborhoods
      const isPlaceLabel = id.includes('place') || id.includes('suburb') || id.includes('neighborhood') || id.includes('hamlet') || id.includes('village') || id.includes('town');
      if (isPlaceLabel) {
        try {
          map.setLayoutProperty(layer.id, 'visibility', 'visible');
          map.setPaintProperty(layer.id, 'text-color', '#475569'); // high readability slate orientators
          map.setPaintProperty(layer.id, 'text-halo-color', '#ffffff');
          map.setPaintProperty(layer.id, 'text-halo-width', 2.0);
        } catch (e) {}
        return;
      }

      // 8. Natural labels visibility styling: Peaks (brown), parks (green), beaches/waterways (teal/blue) with thick high-contrast white halos
      const isNaturalLabel = id.includes('natural-label') || id.includes('natural_label') || id.includes('park-label') || id.includes('park_label') || id.includes('mountain') || id.includes('peak') || id.includes('water-label') || id.includes('water_label');
      if (isNaturalLabel) {
        try {
          map.setLayoutProperty(layer.id, 'visibility', 'visible');
          if (id.includes('peak') || id.includes('mountain') || id.includes('summit')) {
            map.setPaintProperty(layer.id, 'text-color', '#78350f'); // warm topographical rust brown
            map.setPaintProperty(layer.id, 'text-halo-color', '#ffffff');
            map.setPaintProperty(layer.id, 'text-halo-width', 3.0);
          } else if (id.includes('park') || id.includes('nature') || id.includes('reserve') || id.includes('preservation')) {
            map.setPaintProperty(layer.id, 'text-color', '#064e3b'); // robust deep emerald
            map.setPaintProperty(layer.id, 'text-halo-color', '#ffffff');
            map.setPaintProperty(layer.id, 'text-halo-width', 3.0);
          } else {
            map.setPaintProperty(layer.id, 'text-color', '#0f766e'); // deep teal for coastal/beach features
            map.setPaintProperty(layer.id, 'text-halo-color', '#ffffff');
            map.setPaintProperty(layer.id, 'text-halo-width', 3.0);
          }
        } catch (e) {}
      }
    });
  } catch (error) {
    console.warn("Error applying custom topographic style:", error);
  }
}

type MapViewProps = {
  selectedUc: ConservationUnit | null;
  onSelectUc: (uc: ConservationUnit) => void;
  selectedZone?: ZoneDetail | null;
  onSelectZone?: (zone: ZoneDetail | null) => void;
  isZoningVisible?: boolean;
};

export default function MapView({
  selectedUc,
  onSelectUc,
  selectedZone,
  onSelectZone,
  isZoningVisible = true
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<MaplibreMap | null>(null);
  const onSelectZoneRef = useRef(onSelectZone);
  onSelectZoneRef.current = onSelectZone;

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [-44.20, -23.10],
      zoom: 8.4,
      pitch: 35,
      bearing: 0,
      attributionControl: false
    });

    const map = mapInstance.current;

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
      // Apply clean topographic overrides immediately on load
      applyCustomTopographicStyle(map);

      // 1. Setup lightweight 2D custom vector topographic contour lines (curvas de nível)
      try {
        map.addSource('topo-contours', {
          type: 'geojson',
          data: customContoursGeojson
        });

        // Draw elegant topographic contour lines
        map.addLayer({
          id: 'topo-contours-lines',
          type: 'line',
          source: 'topo-contours',
          paint: {
            'line-color': '#a78b71', // soft topographic rust-brown index contour color
            'line-width': [
              'match',
              ['%', ['get', 'elevation'], 500],
              0, 1.6, // Index contours (e.g. 1500m, 1000m, 500m) are slightly thicker
              1.0     // Intermediate contours are thinner
            ],
            'line-opacity': 0.45,
            'line-dasharray': [3, 2] // classic dashed topographic style
          }
        });

        // Draw elevation text labels along the contour lines representing heights
        map.addLayer({
          id: 'topo-contours-labels',
          type: 'symbol',
          source: 'topo-contours',
          layout: {
            'text-field': ['get', 'label'],
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
            'text-size': 8.5,
            'symbol-placement': 'line',
            'text-max-angle': 30,
            'text-padding': 10,
            'text-keep-upright': true,
            'text-allow-overlap': false
          },
          paint: {
            'text-color': '#a78b71', // matching rust-brown
            'text-halo-color': '#efebe4', // matching land background color for continuous line look
            'text-halo-width': 2.0
          }
        });
      } catch (err) {
        console.warn('Error setting up topographic contours:', err);
      }

      // 2. Add custom Ecotourism POIs source with waterfalls, beaches, peaks, and picos
      try {
        map.addSource('ecotourism-pois', {
          type: 'geojson',
          data: ecotourismPoisGeojson
        });

        // Draw custom Ecotourism POIs Text Labels with massive high-contrast white halos for extreme legibility (Centered, emojis removed)
        map.addLayer({
          id: 'ecotourism-poi-labels',
          type: 'symbol',
          source: 'ecotourism-pois',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 11,
            'text-offset': [0, 0],
            'text-anchor': 'center',
            'text-allow-overlap': true,
            'text-ignore-placement': true
          },
          paint: {
            'text-color': '#0f172a', // very readable dark slate
            'text-halo-color': '#ffffff', // pure white high contrast background halo
            'text-halo-width': 3.0,
            'text-halo-blur': 0.5
          }
        });
      } catch (err) {
        console.warn('Error setting up Ecotourism POIs:', err);
      }

      // Setup custom trails and shipping corridors lines over pristine green & vibrant blue canvas
      map.addSource('scenic-routes', {
        type: 'geojson',
        data: customRoutesGeojson
      });

      // Trails style - dashed deep orange outline with high contrast
      map.addLayer({
        id: 'scenic-trails-line',
        type: 'line',
        source: 'scenic-routes',
        filter: ['==', ['get', 'type'], 'trail'],
        paint: {
          'line-color': '#ea580c', // rich orange-red
          'line-width': 2.8,
          'line-dasharray': [2, 2],
          'line-opacity': 0.95
        }
      });

      // Maritime routes - elegant vibrant sky dotted lines
      map.addLayer({
        id: 'scenic-navigation-line',
        type: 'line',
        source: 'scenic-routes',
        filter: ['==', ['get', 'type'], 'navigation'],
        paint: {
          'line-color': '#0ea5e9', // pristine active ocean sky blue
          'line-width': 2.5,
          'line-dasharray': [3, 4],
          'line-opacity': 0.95
        }
      });

      const markersGeojson = {
        type: 'FeatureCollection' as const,
        features: conservationUnits.map(uc => ({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: uc.coordinates },
          properties: { id: uc.id, name: uc.shortName, category: uc.category }
        }))
      };

      map.addSource('uc-markers', {
        type: 'geojson',
        data: markersGeojson
      });

      // Circular Background Marker (designed with high contrast for Light Voyager basemap)
      map.addLayer({
        id: 'uc-markers-points',
        type: 'circle',
        source: 'uc-markers',
        paint: {
          'circle-radius': 9,
          'circle-color': '#059669', // rich emerald green
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#ffffff' // crisp white border
        }
      });

      // Text label (reoriented with deep charcoal text and solid pure white halo for perfect readability on light map)
      map.addLayer({
        id: 'uc-markers-labels',
        type: 'symbol',
        source: 'uc-markers',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 13,
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#111827', // deep charcoal gray
          'text-halo-color': '#ffffff', // pure white halo
          'text-halo-width': 2.5
        }
      });

      // Compile all background boundaries (all UCs) so they are always visible together
      const allBoundariesFeatures = conservationUnits
        .filter(uc => uc.geojson)
        .flatMap(uc => {
          const geo = uc.geojson;
          if (!geo) return [];
          if (geo.type === 'FeatureCollection') {
            return (geo.features || []).map((f: any) => ({
              ...f,
              properties: { ...f.properties, ucId: uc.id, ucName: uc.shortName }
            }));
          } else if (geo.type === 'Feature') {
            return [{ ...geo, properties: { ...geo.properties, ucId: uc.id, ucName: uc.shortName } }];
          } else if (geo.type && geo.coordinates) {
            // direct geometry
            return [{
              type: 'Feature' as const,
              geometry: geo,
              properties: { ucId: uc.id, ucName: uc.shortName }
            }];
          }
          return [];
        });

      map.addSource('all-uc-boundaries', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: allBoundariesFeatures
        }
      });

      // Render all background boundary lines very thin so they are all visible together
      map.addLayer({
        id: 'all-uc-boundaries-line',
        type: 'line',
        source: 'all-uc-boundaries',
        paint: {
          'line-color': '#059669', // rich emerald green
          'line-width': 1.0,       // super-thin outlines for high density adjacent lines
          'line-opacity': 0.4
        }
      }, 'uc-markers-points');

      // Setup boundary structure for specific active UC static boundaries defined in code
      map.addSource('selected-uc-boundary', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      // Highly prominent green fill with balanced opacity on light background
      map.addLayer({
        id: 'selected-uc-boundary-fill',
        type: 'fill',
        source: 'selected-uc-boundary',
        paint: {
          'fill-color': '#059669', // rich emerald green
          'fill-opacity': 0.16 // soft, elegant highlight fill
        }
      }, 'uc-markers-points');

      // 1. Ambient outer glowing border (bright light-green overlay) - refined & thinner
      map.addLayer({
        id: 'selected-uc-boundary-line-glow',
        type: 'line',
        source: 'selected-uc-boundary',
        paint: {
          'line-color': '#10b981', // bright emerald green
          'line-width': 4,          // narrow glow overlay (down from 10)
          'line-opacity': 0.35,
          'line-blur': 1.5          // soft, tight outer boundary glow
        }
      }, 'uc-markers-points');

      // 2. High resolution solid emerald-green core boundary line - precise & thinner
      map.addLayer({
        id: 'selected-uc-boundary-line-core',
        type: 'line',
        source: 'selected-uc-boundary',
        paint: {
          'line-color': '#047857', // rich deep emerald-green core for sharp visibility
          'line-width': 1.8,       // thinner core outline (down from 3.5) for tight adjacencies
          'line-opacity': 1.0
        }
      }, 'uc-markers-points');

      // Setup dynamic zoning polygons source for the active conservation unit
      map.addSource('active-uc-zoning', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      // Zoning fill polygons with zone specific colors
      map.addLayer({
        id: 'zoning-fills',
        type: 'fill',
        source: 'active-uc-zoning',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.35
        }
      }, 'selected-uc-boundary-fill');

      // Zoning boundary outlines
      map.addLayer({
        id: 'zoning-lines',
        type: 'line',
        source: 'active-uc-zoning',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2.2,
          'line-opacity': 0.95
        }
      }, 'selected-uc-boundary-line-core');

      // Zoning Code Labels
      map.addLayer({
        id: 'zoning-labels',
        type: 'symbol',
        source: 'active-uc-zoning',
        layout: {
          'text-field': ['get', 'code'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-anchor': 'center',
          'text-allow-overlap': true
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': ['get', 'color'],
          'text-halo-width': 3.0
        }
      }, 'uc-markers-points');

      // Click on zoning polygon to inspect details
      map.on('click', 'zoning-fills', (e) => {
        if (!e.features || e.features.length === 0) return;
        const featureProps = e.features[0].properties;
        const ucId = featureProps.ucId;
        const zoneId = featureProps.id;
        const unitZoning = ucsZoningData[ucId];
        if (unitZoning) {
          const zone = unitZoning.zones.find(z => z.id === zoneId);
          if (zone && onSelectZoneRef.current) {
            onSelectZoneRef.current(zone);
          }
        }
      });

      map.on('mouseenter', 'zoning-fills', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'zoning-fills', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', 'uc-markers-points', (e) => {
        if (!e.features || e.features.length === 0) return;
        const ucId = e.features[0].properties.id;
        const targetUc = conservationUnits.find(u => u.id === ucId);
        if (targetUc) {
          onSelectUc(targetUc);
        }
      });

      map.on('mouseenter', 'uc-markers-points', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'uc-markers-points', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [onSelectUc]);

  // Update active static selectedUc boundary overlay
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const updateSelectedBoundary = () => {
      const source = map.getSource('selected-uc-boundary') as maplibregl.GeoJSONSource;
      if (source) {
        source.setData((selectedUc?.geojson as any) || { type: 'FeatureCollection', features: [] });
      }
    };

    if (map.isStyleLoaded()) {
      updateSelectedBoundary();
    } else {
      map.on('load', updateSelectedBoundary);
    }
  }, [selectedUc]);

  // Update active UC zoning overlay
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const updateZoningSource = () => {
      const source = map.getSource('active-uc-zoning') as maplibregl.GeoJSONSource;
      if (source && selectedUc) {
        if (isZoningVisible) {
          source.setData(getZoningGeojson(selectedUc.id) as any);
        } else {
          source.setData({ type: 'FeatureCollection', features: [] });
        }
      }
    };

    if (map.isStyleLoaded()) {
      updateZoningSource();
    } else {
      map.on('load', updateZoningSource);
    }
  }, [selectedUc, isZoningVisible]);

  // Handle flying when selectedUc changes
  useEffect(() => {
    if (selectedUc && mapInstance.current) {
      const isMobile = window.innerWidth < 1024;
      const padding = isMobile 
        ? { top: 0, bottom: window.innerHeight * 0.35, left: 0, right: 0 } // Offset map focus upwards on mobile as card covers bottom 45%+
        : { top: 0, bottom: 0, left: 0, right: window.innerWidth * 0.4 }; // Offset map focus to the left side on desktop as card is on right

      mapInstance.current.flyTo({
        center: selectedUc.coordinates,
        zoom: selectedUc.zoom,
        pitch: selectedUc.pitch,
        bearing: selectedUc.bearing,
        duration: 3500,
        essential: true,
        padding: padding
      });
    }
  }, [selectedUc]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div ref={mapContainer} className="w-full h-full bg-[#efebe4]" />
    </div>
  );
}
