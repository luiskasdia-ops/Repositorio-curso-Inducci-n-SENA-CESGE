import { useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { HIMNO_VERSES } from '../data/senaData';

type SymbolTab = 'escudo' | 'bandera' | 'logosimbolo' | 'himno';

export function ImagenInstitucionalStage() {
  const [activeTab, setActiveTab] = useState<SymbolTab>('escudo');
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handlePlayVerse = (index: number) => {
    setActiveVerseIndex(index);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const verse = HIMNO_VERSES[index];
      const utterance = new SpeechSynthesisUtterance(
        `${verse.title}. ${verse.lines.join('. ')}`
      );
      utterance.lang = 'es-CO';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Explorador Multimedia: Símbolos Institucionales
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Selecciona cada elemento para conocer su significado oficial y uso correcto.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {(
            [
              { id: 'escudo', label: 'Escudo' },
              { id: 'bandera', label: 'Bandera' },
              { id: 'logosimbolo', label: 'Logo-símbolo' },
              { id: 'himno', label: 'Himno' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                handleStopSpeech();
                setActiveTab(tab.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'escudo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                alt="Escudo oficial del SENA"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-contain"
              />
            </div>
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xl font-bold text-slate-900">
                El Escudo del SENA y los Sectores Económicos
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Diseñado cuando se fundó el SENA, el escudo refleja los tres grandes sectores
                económicos en los que la institución forma talento humano para el país:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs font-semibold text-[#2E8B00]">Piñón</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">Sector Industria</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Representa la manufactura, mecánica, tecnología y transformación productiva.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs font-semibold text-[#2E8B00]">Caduceo</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">Comercio y Servicios</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Asociado a la gestión administrativa, logística, finanzas y turismo.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs font-semibold text-[#2E8B00]">Ramo de Café</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">Sector Agropecuario</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Simboliza el sector primario, extractivo y la riqueza agrícola nacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bandera' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl h-64 p-8">
              <div className="w-full max-w-xs aspect-[3/2] bg-white border border-slate-300 shadow-sm rounded flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 rounded-full border-2 border-[#39A900] flex items-center justify-center text-[#2E8B00] font-bold text-xs">
                  SENA
                </div>
                <span className="text-[11px] text-slate-500 mt-2">Escudo en el centro</span>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xl font-bold text-slate-900">La Bandera Institucional</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                La bandera del SENA es de color <strong>blanco</strong> y lleva en el centro el
                escudo de la institución. Su diseño sobrio transmite los valores fundamentales de la
                convivencia formativa:
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular text-xs font-semibold text-[#2E8B00] mt-0.5">
                    01.
                  </span>
                  <span>
                    <strong>Color Blanco:</strong> Simboliza la paz, la tranquilidad y la libertad
                    en los ambientes de aprendizaje.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular text-xs font-semibold text-[#2E8B00] mt-0.5">
                    02.
                  </span>
                  <span>
                    <strong>Uso Protocolario:</strong> Se iza en ceremonias de certificación,
                    actos cívicos y eventos oficiales de cada Centro de Formación.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'logosimbolo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl h-64 p-8">
              <div className="text-center">
                <img
                  src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e"
                  alt="Logo-símbolo oficial del SENA"
                  className="w-28 h-28 mx-auto object-contain"
                />
                <p className="text-xs font-medium text-slate-500 mt-3">
                  El aprendiz como centro y los tres caminos
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xl font-bold text-slate-900">
                Logo-símbolo y Manual de Identidad
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                El logo-símbolo representa gráficamente los enfoques de la formación que imparte el
                SENA, donde el <strong>aprendiz es el protagonista</strong> de su propio proceso.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">Verde SENA (#39A900)</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Color institucional principal que evoca esperanza, crecimiento y sostenibilidad.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">Los Tres Caminos</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Simbolizan las oportunidades hacia el conocimiento, el trabajo y el emprendimiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'himno' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                <iframe
                  src="https://www.youtube.com/embed/PvwEJWhSjYE"
                  title="Himno del SENA"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-900">
                  Letra por estrofas
                </h4>
                {isSpeaking ? (
                  <button
                    type="button"
                    onClick={handleStopSpeech}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                    Detener lectura
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePlayVerse(activeVerseIndex)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2E8B00] hover:bg-[#257000] rounded-lg transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Leer estrofa
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {HIMNO_VERSES.map((verse, idx) => (
                  <button
                    key={verse.title}
                    type="button"
                    onClick={() => setActiveVerseIndex(idx)}
                    className={`text-center px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      activeVerseIndex === idx
                        ? 'border-[#39A900] bg-emerald-50/50 text-slate-900'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {verse.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs font-semibold text-[#2E8B00]">
                  {HIMNO_VERSES[activeVerseIndex].title}
                </p>
                <div className="mt-3 space-y-1.5 text-lg font-medium text-slate-900 leading-relaxed">
                  {HIMNO_VERSES[activeVerseIndex].lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-700">Significado formativo</p>
                <p className="text-sm text-slate-600 mt-1">
                  {HIMNO_VERSES[activeVerseIndex].meaning}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
