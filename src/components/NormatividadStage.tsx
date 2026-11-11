import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { NORMATIVIDAD_CASES } from '../data/senaData';

type NormTab = 'derechos' | 'deberes' | 'casos';

export function NormatividadStage() {
  const [activeTab, setActiveTab] = useState<NormTab>('derechos');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Reglamento del Aprendiz SENA · Acuerdo 009 de 2024
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Explora tus derechos, deberes, medidas formativas y resuelve casos prácticos vigentes.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {(
            [
              { id: 'derechos', label: 'Derechos' },
              { id: 'deberes', label: 'Deberes y Prohibiciones' },
              { id: 'casos', label: 'Simulador de Casos' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
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
        {activeTab === 'derechos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
              <img
                src="/src/assets/images/sena_normatividad_visual_1794325196211.jpg"
                alt="Aprendices SENA en taller revisando normativa en tableta digital"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xl font-bold text-slate-900">
                Principales Derechos del Aprendiz
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    Formación Integral Gratuita
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Recibir formación profesional acorde con el programa, con acceso a ambientes,
                    equipos y materiales.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    Debido Proceso y Defensa
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Ser escuchado, presentar descargos y solicitar revisión de evaluaciones por
                    conducto regular.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    Bienestar y Apoyos
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Acceder a servicios de enfermería, psicología, deporte, cultura y convocatorias
                    de sostenimiento.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    Certificación Oportuna
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Obtener el título o certificado una vez aprobadas las etapas lectiva y
                    productiva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deberes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h4 className="text-base font-bold text-slate-900">Deberes Esenciales</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Cumplir con todas las actividades académicas y de etapa productiva.</li>
                <li>• Portar el carné institucional en lugar visible dentro del Centro.</li>
                <li>• Utilizar los Elementos de Protección Personal (EPP) en talleres y laboratorios.</li>
                <li>• Respetar a instructores, compañeros y personal administrativo.</li>
                <li>• Cuidar las instalaciones, herramientas y equipos asignados.</li>
              </ul>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h4 className="text-base font-bold text-slate-900">Prohibiciones Clave</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Plagiar trabajos, suplantar identidad o alterar documentos académicos.</li>
                <li>• Ingresar o consumir sustancias psicoactivas o bebidas alcohólicas.</li>
                <li>• Faltar injustificadamente 3 días consecutivos (causal de deserción).</li>
                <li>• Usar equipos institucionales para fines comerciales o no autorizados.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'casos' && (
          <div className="space-y-6">
            {NORMATIVIDAD_CASES.map((item, idx) => {
              const selectedIdx = selectedAnswers[item.id];
              return (
                <div
                  key={item.id}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                >
                  <p className="text-xs font-semibold text-[#2E8B00]">
                    Caso práctico 0{idx + 1}
                  </p>
                  <p className="text-sm font-medium text-slate-900">{item.situation}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {item.options.map((opt, optIdx) => {
                      const isPicked = selectedIdx === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((prev) => ({ ...prev, [item.id]: optIdx }))
                          }
                          className={`text-left p-3.5 rounded-lg border text-xs leading-relaxed transition-colors ${
                            isPicked
                              ? opt.isCorrect
                                ? 'border-[#39A900] bg-emerald-50 text-slate-900'
                                : 'border-red-400 bg-red-50 text-slate-900'
                              : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  {selectedIdx !== undefined && (
                    <div
                      className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
                        item.options[selectedIdx].isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-slate-800'
                          : 'bg-amber-50 border-amber-200 text-slate-800'
                      }`}
                    >
                      {item.options[selectedIdx].isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#2E8B00] shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <span>{item.options[selectedIdx].feedback}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
