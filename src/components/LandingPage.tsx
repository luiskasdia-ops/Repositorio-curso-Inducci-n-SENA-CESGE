import { useState } from 'react';
import { GraduationCap, ClipboardCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { ApprenticeRecord } from '../data/senaData';
import senaCampusHero from '../assets/images/sena_campus_hero_1794325196344.jpg';

export interface ApprenticeRegistrationData {
  name: string;
  document: string;
  ficha: string;
  program: string;
}

interface LandingPageProps {
  apprentices: ApprenticeRecord[];
  onRegisterAndEnterAprendiz: (data: ApprenticeRegistrationData) => void;
  onSelectInstructor: () => void;
}

export function LandingPage({
  apprentices,
  onRegisterAndEnterAprendiz,
  onSelectInstructor,
}: LandingPageProps) {
  const [showAprendizForm, setShowAprendizForm] = useState(false);
  const [name, setName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [ficha, setFicha] = useState('');
  const [program, setProgram] = useState('');
  const [formError, setFormError] = useState('');

  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [instructorUser, setInstructorUser] = useState('');
  const [instructorPass, setInstructorPass] = useState('');
  const [instructorError, setInstructorError] = useState('');

  const handleSubmitAprendiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !documentNumber.trim() || !ficha.trim() || !program.trim()) {
      setFormError('Por favor completa todos los campos requeridos para continuar.');
      return;
    }
    setFormError('');
    onRegisterAndEnterAprendiz({
      name: name.trim(),
      document: documentNumber.trim(),
      ficha: ficha.trim(),
      program: program.trim(),
    });
  };

  const handleSubmitInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (instructorUser.trim() === 'instructor.sena' && instructorPass === 'Sena2026*') {
      setInstructorError('');
      onSelectInstructor();
    } else {
      setInstructorError('Usuario o contraseña incorrectos. Usa las credenciales genéricas.');
    }
  };

  return (
    <div className="space-y-10 py-4">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-10 flex flex-col justify-between transition-colors">
          <div>
            <p className="text-xs font-medium text-[#2E8B00] dark:text-[#4ADE80]">
              Servicio Nacional de Aprendizaje · Ficha 2847192
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-3 tracking-tight text-balance">
              Plataforma de Inducción y Seguimiento SENA
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed max-w-2xl">
              Bienvenido al entorno interactivo de formación institucional. Selecciona tu rol
              para acceder a los módulos de normatividad e imagen del SENA, o para supervisar el
              avance de los aprendices.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Aprendices Registrados</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white font-mono-tabular mt-0.5">
                {apprentices.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Módulos</p>
              <p className="text-xl font-bold text-[#2E8B00] dark:text-[#4ADE80] font-mono-tabular mt-0.5">
                04
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Instructor Encargado</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white font-mono-tabular mt-0.5">
                01
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden min-h-[260px]">
          <img
            src={senaCampusHero}
            alt="Aprendices SENA colaborando en el patio del centro de formación"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Selecciona tu rol de ingreso
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Cada aprendiz registra su perfil para guardar su progreso y el instructor encargado
            revisa el avance general.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Aprendiz Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-colors">
            {!showAprendizForm ? (
              <>
                <div>
                  <div className="w-11 h-11 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#2E8B00] dark:text-[#4ADE80]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                    Soy Aprendiz
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    Registra tus datos de identificación para guardar tu perfil y progreso en la
                    inducción institucional, normatividad y cuestionarios.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAprendizForm(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2E8B00] hover:bg-[#257000] rounded-lg transition-colors"
                  >
                    Ingresar como Aprendiz
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmitAprendiz} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Registro de Aprendiz
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAprendizForm(false)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Volver
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="apr-name"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="apr-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Camila Andrea Torres"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="apr-doc"
                        className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                      >
                        Número de documento
                      </label>
                      <input
                        id="apr-doc"
                        type="text"
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        placeholder="Ej. 1.023.456.789"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="apr-ficha"
                        className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                      >
                        Número de ficha
                      </label>
                      <input
                        id="apr-ficha"
                        type="text"
                        value={ficha}
                        onChange={(e) => setFicha(e.target.value)}
                        placeholder="Ej. 2847192"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="apr-program"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Programa de formación
                    </label>
                    <input
                      id="apr-program"
                      type="text"
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      placeholder="Ej. Análisis y Desarrollo de Software"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2E8B00] hover:bg-[#257000] rounded-lg transition-colors"
                >
                  Guardar perfil y continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Instructor Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-colors">
            {!showInstructorForm ? (
              <>
                <div>
                  <div className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200">
                    <ClipboardCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                    Soy Instructor Encargado
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    Supervisa el avance individual y grupal de todos los aprendices de la ficha,
                    revisa puntajes de evaluaciones y exporta reportes en CSV.
                  </p>

                  <div className="mt-5 p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                    Acceso único de coordinación para la revisión de la Ficha{' '}
                    <span className="font-mono-tabular font-semibold text-slate-900 dark:text-white">
                      2847192
                    </span>
                    .
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowInstructorForm(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    Ingresar como Instructor
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmitInstructor} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Acceso Instructor
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowInstructorForm(false);
                      setInstructorError('');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Volver
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="inst-user"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Usuario
                    </label>
                    <input
                      id="inst-user"
                      type="text"
                      value={instructorUser}
                      onChange={(e) => setInstructorUser(e.target.value)}
                      placeholder="Ej. instructor.sena"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inst-pass"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Contraseña
                    </label>
                    <input
                      id="inst-pass"
                      type="password"
                      value={instructorPass}
                      onChange={(e) => setInstructorPass(e.target.value)}
                      placeholder="Ingresa la contraseña"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#39A900]"
                    />
                  </div>
                </div>

                {instructorError && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {instructorError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  Iniciar sesión
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
