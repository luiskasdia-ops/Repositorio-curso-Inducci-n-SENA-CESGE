import { useState, useEffect } from 'react';
import { CheckCircle2, BookOpen, Award, Users, Moon, Sun, PlayCircle, X } from 'lucide-react';
import {
  INDUCTION_MODULES,
  INITIAL_APPRENTICES,
  ApprenticeRecord,
} from './data/senaData';
import { ImagenInstitucionalStage } from './components/ImagenInstitucionalStage';
import { NormatividadStage } from './components/NormatividadStage';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { SeguimientoDashboard } from './components/SeguimientoDashboard';
import { LandingPage, ApprenticeRegistrationData } from './components/LandingPage';
import senaCampusHero from './assets/images/sena_campus_hero_1794325196344.jpg';

type ViewMode = 'landing' | 'aprendiz' | 'seguimiento';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [selectedApprenticeId, setSelectedApprenticeId] = useState<string>(
    INITIAL_APPRENTICES[0].id
  );
  const [activeModuleId, setActiveModuleId] = useState<string>(INDUCTION_MODULES[0].id);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sena_theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [isBlurring, setIsBlurring] = useState(false);
  const [showVideoManual, setShowVideoManual] = useState(false);
  const [apprentices, setApprentices] = useState<ApprenticeRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sena_induccion_apprentices_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return INITIAL_APPRENTICES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('sena_induccion_apprentices_v1', JSON.stringify(apprentices));
    } catch {
      // ignore storage errors
    }
  }, [apprentices]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('sena_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  const handleToggleDarkMode = () => {
    setIsBlurring(true);
    setTimeout(() => {
      setIsDark((prev) => !prev);
      setTimeout(() => {
        setIsBlurring(false);
      }, 220);
    }, 140);
  };

  const currentLearner =
    apprentices.find((a) => a.id === selectedApprenticeId) || apprentices[0];
  const activeModule =
    INDUCTION_MODULES.find((m) => m.id === activeModuleId) || INDUCTION_MODULES[0];

  const completedModulesCount = INDUCTION_MODULES.filter(
    (m) => currentLearner.progressByModule[m.id]
  ).length;
  const overallProgress = Math.round(
    (completedModulesCount / INDUCTION_MODULES.length) * 100
  );

  const handleCompleteModuleQuiz = (moduleId: string, scorePercent: number) => {
    setApprentices((prev) =>
      prev.map((apr) => {
        if (apr.id !== currentLearner.id) return apr;
        return {
          ...apr,
          progressByModule: {
            ...apr.progressByModule,
            [moduleId]: scorePercent >= 60 ? true : apr.progressByModule[moduleId],
          },
          scoresByModule: {
            ...apr.scoresByModule,
            [moduleId]: scorePercent,
          },
          lastActivity: 'Justo ahora',
        };
      })
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-[filter,background-color,color] duration-300 ${
        isBlurring ? 'blur-md' : 'blur-0'
      }`}
    >
      {/* Top Bar Contract: 3 zones */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              setViewMode('landing');
            }}
            className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0"
          >
            <img
              src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e"
              alt="Logo SENA"
              className="w-[34px] h-[34px] object-contain"
            />
            SENA Inducción
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              type="button"
              onClick={() => {
                setViewMode('aprendiz');
                setActiveModuleId('imagen-institucional');
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Imagen Institucional
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('aprendiz');
                setActiveModuleId('normatividad-aprendiz');
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Normatividad
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('aprendiz');
                setActiveModuleId('historia-mision-vision');
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Historia y Misión
            </button>
            <button
              type="button"
              onClick={() => setViewMode('seguimiento')}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Seguimiento
            </button>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowVideoManual(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <PlayCircle className="w-4 h-4 text-[#2E8B00] dark:text-[#4ADE80]" />
              Video Manual
            </button>
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className="px-4 py-2 text-xs font-medium text-white bg-[#2E8B00] hover:bg-[#257000] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {viewMode === 'landing' ? 'Inicio' : 'Cambiar Rol'}
            </button>
            <button
              type="button"
              onClick={handleToggleDarkMode}
              aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {viewMode === 'landing' ? (
          <LandingPage
            apprentices={apprentices}
            onRegisterAndEnterAprendiz={(data: ApprenticeRegistrationData) => {
              const existing = apprentices.find(
                (a) => a.document.trim() === data.document.trim()
              );
              if (existing) {
                setSelectedApprenticeId(existing.id);
              } else {
                const newId = `apr-${Date.now()}`;
                const newRecord: ApprenticeRecord = {
                  id: newId,
                  name: data.name,
                  document: data.document,
                  ficha: data.ficha,
                  program: data.program,
                  progressByModule: {
                    'imagen-institucional': false,
                    'normatividad-aprendiz': false,
                    'historia-mision-vision': false,
                    'bienestar-canales': false,
                  },
                  scoresByModule: {},
                  lastActivity: 'Recién registrado',
                };
                setApprentices((prev) => [newRecord, ...prev]);
                setSelectedApprenticeId(newId);
              }
              setViewMode('aprendiz');
            }}
            onSelectInstructor={() => setViewMode('seguimiento')}
          />
        ) : viewMode === 'seguimiento' ? (
          <SeguimientoDashboard apprentices={apprentices} />
        ) : (
          <>
            {/* Hero Split */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-colors">
                <div>
                  <p className="text-xs font-medium text-[#2E8B00] dark:text-[#4ADE80]">
                    Centro de Formación · Ficha {currentLearner.ficha}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight text-balance">
                    Inducción Institucional SENA
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed max-w-2xl">
                    Bienvenido, <strong>{currentLearner.name}</strong>. Explora los símbolos
                    institucionales, comprende el Reglamento del Aprendiz y verifica tu
                    aprendizaje mediante cuestionarios interactivos.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Avance Total</p>
                    <p className="text-xl font-bold text-[#2E8B00] dark:text-[#4ADE80] font-mono-tabular mt-0.5">
                      {overallProgress}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Módulos Aprobados</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white font-mono-tabular mt-0.5">
                      {completedModulesCount} / {INDUCTION_MODULES.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Programa</p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate">
                      {currentLearner.program}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden min-h-[240px]">
                <img
                  src={senaCampusHero}
                  alt="Aprendices SENA colaborando en el patio del centro de formación"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </section>

            {/* Module Selector Strip */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Ruta de Aprendizaje
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Selecciona un módulo para interactuar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {INDUCTION_MODULES.map((mod) => {
                  const isActive = mod.id === activeModuleId;
                  const isCompleted = currentLearner.progressByModule[mod.id];
                  const score = currentLearner.scoresByModule[mod.id];

                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setActiveModuleId(mod.id)}
                      className={`text-left p-5 rounded-xl border transition-colors flex flex-col justify-between ${
                        isActive
                          ? 'bg-white dark:bg-slate-900 border-[#39A900] ring-1 ring-[#39A900]'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-mono-tabular font-semibold text-[#2E8B00] dark:text-[#4ADE80]">
                            {mod.number}.
                          </span>
                          <span>{mod.duration}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                          {mod.title}
                        </h3>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[#2E8B00] dark:text-[#4ADE80] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completado
                          </span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">Pendiente</span>
                        )}
                        {score !== undefined && (
                          <span className="font-mono-tabular font-semibold text-slate-700 dark:text-slate-300">
                            {score}%
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Active Module Interactive Stage */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {activeModule.number}. {activeModule.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{activeModule.summary}</p>
                </div>
              </div>

              {activeModule.id === 'imagen-institucional' && <ImagenInstitucionalStage />}
              {activeModule.id === 'normatividad-aprendiz' && <NormatividadStage />}

              {activeModule.id === 'historia-mision-vision' && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                    <BookOpen className="w-5 h-5 text-[#2E8B00] mb-3" />
                    <h3 className="text-base font-bold text-slate-900">1957 · Fundación</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Creado mediante el Decreto-Ley 118 por iniciativa de Rodolfo Martínez Tono
                      para brindar formación técnica gratuita a los trabajadores colombianos.
                    </p>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                    <Award className="w-5 h-5 text-[#2E8B00] mb-3" />
                    <h3 className="text-base font-bold text-slate-900">Misión Institucional</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Invertir en el desarrollo social y técnico de los trabajadores colombianos,
                      ofreciendo formación profesional integral para la incorporación laboral y
                      productiva.
                    </p>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                    <Users className="w-5 h-5 text-[#2E8B00] mb-3" />
                    <h3 className="text-base font-bold text-slate-900">Formación Integral</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Articula el saber (conocimiento), el saber hacer (habilidades técnicas) y el
                      saber ser (valores y ética ciudadana).
                    </p>
                  </div>
                </div>
              )}

              {activeModule.id === 'bienestar-canales' && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Bienestar al Aprendiz
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Acompañamiento integral en salud, psicología, enfermería, deportes, cultura y
                      convocatorias de apoyos de sostenimiento para garantizar tu permanencia.
                    </p>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Plataformas Oficiales
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Gestiona tu estado académico y certificados en{' '}
                      <strong>SENA Sofía Plus</strong> y accede a tus ambientes virtuales de
                      aprendizaje en <strong>Zajuna</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Interactive Quiz for the active module */}
              <InteractiveQuiz
                key={activeModule.id}
                moduleTitle={activeModule.title}
                questions={activeModule.quiz}
                previousScore={currentLearner.scoresByModule[activeModule.id]}
                onComplete={(score) => handleCompleteModuleQuiz(activeModule.id, score)}
              />
            </section>
          </>
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>SENA Inducción Institucional · Prototipo Educativo</span>
          <span>Servicio Nacional de Aprendizaje · Colombia</span>
        </div>
      </footer>

      {/* Floating Video Manual Modal */}
      {showVideoManual && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-manual-title"
          onClick={() => setShowVideoManual(false)}
        >
          <div
            className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3
                  id="video-manual-title"
                  className="text-base font-bold text-slate-900 dark:text-white"
                >
                  Video Manual de la Plataforma
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Guía rápida de uso para aprendices e instructores
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoManual(false)}
                aria-label="Cerrar video manual"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-slate-950">
              <video
                controls
                autoPlay
                playsInline
                className="w-full aspect-video rounded-lg bg-black"
                poster={senaCampusHero}
              >
                <source src="/assets/aistudio/2026__17_17_af6b744b.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video HTML5.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
