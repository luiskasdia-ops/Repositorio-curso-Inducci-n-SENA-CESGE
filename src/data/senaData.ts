export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InductionModule {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  category: 'imagen' | 'normatividad' | 'identidad' | 'bienestar';
  summary: string;
  quiz: QuizQuestion[];
}

export interface ApprenticeRecord {
  id: string;
  name: string;
  document: string;
  ficha: string;
  program: string;
  progressByModule: Record<string, boolean>;
  scoresByModule: Record<string, number>;
  lastActivity: string;
}

export const INDUCTION_MODULES: InductionModule[] = [
  {
    id: 'imagen-institucional',
    number: '01',
    title: 'Imagen e Identidad Institucional',
    subtitle: 'Símbolos patrios del SENA: Escudo, Bandera, Logo-símbolo e Himno',
    duration: '15 min',
    category: 'imagen',
    summary:
      'Conoce el significado de cada símbolo que representa al Servicio Nacional de Aprendizaje y cómo proyectar la imagen institucional con orgullo y respeto.',
    quiz: [
      {
        id: 'q-img-1',
        question: '¿Qué representan los tres elementos del Escudo del SENA (piñón, caduceo y café)?',
        options: [
          'Los tres sectores económicos: industria, comercio/servicios y agropecuario',
          'Las tres regiones geográficas principales de Colombia',
          'Los tres niveles de formación: operario, técnico y tecnólogo',
          'Los tres valores centrales: respeto, justicia y solidaridad',
        ],
        correctIndex: 0,
        explanation:
          'El piñón representa el sector industria; el caduceo, el sector comercio y servicios; y el ramo de café, el sector primario y extractivo (agropecuario).',
      },
      {
        id: 'q-img-2',
        question: '¿Cuál es el significado del color blanco en la Bandera del SENA?',
        options: [
          'Riqueza natural y biodiversidad',
          'Paz, tranquilidad y libertad',
          'Innovación tecnológica y ciencia',
          'Disciplina y rigor académico',
        ],
        correctIndex: 1,
        explanation:
          'La bandera del SENA es de color blanco y lleva en el centro el escudo institucional; el blanco simboliza la paz, la tranquilidad y la libertad.',
      },
      {
        id: 'q-img-3',
        question: '¿Qué representa el Logo-símbolo del SENA (la figura humana y los tres caminos)?',
        options: [
          'La estructura jerárquica de los centros de formación',
          'El aprendiz como centro del proceso y los caminos hacia el conocimiento y el trabajo',
          'La conexión entre el SENA y las empresas privadas',
          'Los tres trimestres de la etapa lectiva',
        ],
        correctIndex: 1,
        explanation:
          'El logo-símbolo muestra al aprendiz en el centro, proyectando los tres caminos que representan la formación integral, la libertad y la responsabilidad.',
      },
    ],
  },
  {
    id: 'normatividad-aprendiz',
    number: '02',
    title: 'Normatividad y Reglamento del Aprendiz',
    subtitle: 'Acuerdo 009 de 2024: Derechos, deberes, enfoque formativo y debido proceso',
    duration: '20 min',
    category: 'normatividad',
    summary:
      'Comprende el Reglamento del Aprendiz SENA vigente (Acuerdo 009 de 2024), que rige la convivencia, los derechos, deberes, medidas formativas y el debido proceso.',
    quiz: [
      {
        id: 'q-norm-1',
        question: '¿Cuál es el acuerdo vigente que adopta el Reglamento del Aprendiz SENA y cuál es su enfoque principal?',
        options: [
          'Acuerdo 009 de 2024, con enfoque formativo, preventivo y garantista del debido proceso',
          'Acuerdo 007 de 2012, con enfoque exclusivamente sancionatorio',
          'Decreto 118 de 1957, sobre contratación laboral',
          'Resolución 001 de 2020, sobre educación virtual únicamente',
        ],
        correctIndex: 0,
        explanation:
          'El Acuerdo 009 de 2024 es el Reglamento del Aprendiz SENA vigente; prioriza el diálogo, las medidas formativas y el respeto al debido proceso.',
      },
      {
        id: 'q-norm-2',
        question: 'Según el Acuerdo 009 de 2024, ¿qué ocurre ante inasistencias injustificadas reiteradas (como 3 días consecutivos)?',
        options: [
          'Se activa el seguimiento de permanencia y el debido proceso por posible deserción',
          'Se expulsa automáticamente al aprendiz sin derecho a ser escuchado',
          'No tiene ningún efecto si el aprendiz aprueba el examen final',
          'Se traslada automáticamente a otro centro de formación',
        ],
        correctIndex: 0,
        explanation:
          'El reglamento vigente establece el acompañamiento previo y el debido proceso para verificar causas antes de declarar la deserción.',
      },
      {
        id: 'q-norm-3',
        question: '¿Qué debe hacer un aprendiz si tiene un desacuerdo con una evaluación o medida formativa según el Acuerdo 009 de 2024?',
        options: [
          'Abandonar el ambiente de formación inmediatamente',
          'Presentar solicitud de revisión respetuosa siguiendo el conducto regular y el debido proceso',
          'Ignorar la calificación y esperar al siguiente trimestre',
          'Solicitar cambio de ficha sin justificación',
        ],
        correctIndex: 1,
        explanation:
          'El Acuerdo 009 de 2024 garantiza el debido proceso, el derecho a la defensa, a ser escuchado y a solicitar revisión siguiendo el conducto regular.',
      },
      {
        id: 'q-norm-4',
        question: '¿Cuál de las siguientes opciones corresponde a un deber fundamental del aprendiz SENA?',
        options: [
          'Portar la identificación institucional y usar los Elementos de Protección Personal (EPP) en talleres',
          'Elegir libremente el horario de los instructores',
          'Eximir la etapa productiva por buen promedio',
          'Utilizar los equipos del centro para fines comerciales personales',
        ],
        correctIndex: 0,
        explanation:
          'Portar la identificación, cuidar los bienes institucionales y usar los EPP son deberes esenciales para la seguridad y convivencia.',
      },
    ],
  },
  {
    id: 'historia-mision-vision',
    number: '03',
    title: 'Historia, Misión y Visión SENA',
    subtitle: 'Desde 1957 transformando el talento humano de Colombia',
    duration: '12 min',
    category: 'identidad',
    summary:
      'Explora el origen del SENA, su propósito misional de formación profesional integral gratuita y su proyección hacia la innovación y el empleo.',
    quiz: [
      {
        id: 'q-hist-1',
        question: '¿En qué año fue fundado el SENA y quién fue su principal impulsor?',
        options: [
          '1957, impulsado por Rodolfo Martínez Tono',
          '1970, impulsado por el Ministerio de Educación',
          '1945, impulsado por la Cámara de Comercio',
          '1991, con la nueva Constitución Política',
        ],
        correctIndex: 0,
        explanation:
          'El SENA nació en 1957 mediante el Decreto-Ley 118, gracias a la iniciativa de Rodolfo Martínez Tono, con apoyo de trabajadores, empresarios y la Iglesia.',
      },
      {
        id: 'q-hist-2',
        question: '¿Cuál es el eje central de la Formación Profesional Integral del SENA?',
        options: [
          'Solo la capacitación teórica en aulas magistrales',
          'El desarrollo equilibrado del saber (conocimiento), saber hacer (habilidades) y saber ser (valores)',
          'La preparación exclusiva para exámenes universitarios',
          'La formación pagada por créditos académicos',
        ],
        correctIndex: 1,
        explanation:
          'La Formación Profesional Integral articula el conocimiento técnico, la práctica productiva y el desarrollo humano y ético del aprendiz.',
      },
    ],
  },
  {
    id: 'bienestar-canales',
    number: '04',
    title: 'Bienestar al Aprendiz y Canales',
    subtitle: 'Apoyos de sostenimiento, acompañamiento y plataformas digitales',
    duration: '10 min',
    category: 'bienestar',
    summary:
      'Descubre los servicios de bienestar, salud, cultura, deporte y las plataformas institucionales como Sofía Plus y Zajuna.',
    quiz: [
      {
        id: 'q-bien-1',
        question: '¿Cuál es la plataforma oficial para gestionar inscripciones, certificaciones y estado académico en el SENA?',
        options: [
          'SENA Sofía Plus',
          'Portal Tributario Nacional',
          'Red Social Académica',
          'Sistema Único de Transporte',
        ],
        correctIndex: 0,
        explanation:
          'SENA Sofía Plus es el sistema de información oficial para la gestión académica, administrativa y de certificación de los aprendices.',
      },
      {
        id: 'q-bien-2',
        question: '¿Qué área ofrece acompañamiento psicológico, enfermería, deporte y apoyos de sostenimiento?',
        options: [
          'Bienestar al Aprendiz',
          'Almacén General',
          'Contabilidad y Tesorería',
          'Archivo Central',
        ],
        correctIndex: 0,
        explanation:
          'Bienestar al Aprendiz lidera los programas de permanencia, salud física y mental, cultura, deporte y apoyos socioeconómicos.',
      },
    ],
  },
];

export const INITIAL_APPRENTICES: ApprenticeRecord[] = [
  {
    id: 'apr-1',
    name: 'Camila Andrea Torres',
    document: '1.023.456.789',
    ficha: '2847192',
    program: 'Análisis y Desarrollo de Software',
    progressByModule: {
      'imagen-institucional': true,
      'normatividad-aprendiz': false,
      'historia-mision-vision': false,
      'bienestar-canales': false,
    },
    scoresByModule: {
      'imagen-institucional': 100,
    },
    lastActivity: 'Hoy, 09:15',
  },
  {
    id: 'apr-2',
    name: 'Mateo Alejandro Ríos',
    document: '1.045.892.310',
    ficha: '2847192',
    program: 'Análisis y Desarrollo de Software',
    progressByModule: {
      'imagen-institucional': true,
      'normatividad-aprendiz': true,
      'historia-mision-vision': true,
      'bienestar-canales': true,
    },
    scoresByModule: {
      'imagen-institucional': 100,
      'normatividad-aprendiz': 92,
      'historia-mision-vision': 100,
      'bienestar-canales': 100,
    },
    lastActivity: 'Ayer, 16:40',
  },
  {
    id: 'apr-3',
    name: 'Valentina Gómez Salazar',
    document: '1.098.334.112',
    ficha: '2847192',
    program: 'Análisis y Desarrollo de Software',
    progressByModule: {
      'imagen-institucional': true,
      'normatividad-aprendiz': true,
      'historia-mision-vision': false,
      'bienestar-canales': false,
    },
    scoresByModule: {
      'imagen-institucional': 67,
      'normatividad-aprendiz': 100,
    },
    lastActivity: 'Hace 2 días',
  },
  {
    id: 'apr-4',
    name: 'Sebastián David Mendoza',
    document: '1.012.778.540',
    ficha: '2847192',
    program: 'Análisis y Desarrollo de Software',
    progressByModule: {
      'imagen-institucional': false,
      'normatividad-aprendiz': false,
      'historia-mision-vision': false,
      'bienestar-canales': false,
    },
    scoresByModule: {},
    lastActivity: 'Sin iniciar',
  },
  {
    id: 'apr-5',
    name: 'Laura Sofía Castellanos',
    document: '1.030.654.221',
    ficha: '2847192',
    program: 'Análisis y Desarrollo de Software',
    progressByModule: {
      'imagen-institucional': true,
      'normatividad-aprendiz': true,
      'historia-mision-vision': true,
      'bienestar-canales': false,
    },
    scoresByModule: {
      'imagen-institucional': 100,
      'normatividad-aprendiz': 67,
      'historia-mision-vision': 100,
    },
    lastActivity: 'Hoy, 08:05',
  },
];

export const HIMNO_VERSES = [
  {
    title: 'Coro',
    lines: [
      'Estudiantes del SENA adelante',
      'por Colombia luchad con amor',
      'con el ánimo noble y radiante',
      'transformémosla en mundo mejor.',
    ],
    meaning: 'Llamado a la juventud colombiana a transformar el país mediante el trabajo digno, el conocimiento y el amor por la patria.',
  },
  {
    title: 'Estrofa I',
    lines: [
      'De la patria el futuro destino,',
      'en las manos del joven está,',
      'el trabajo es seguro camino,',
      'que el progreso a Colombia dará.',
    ],
    meaning: 'Resalta que el progreso nacional se construye con el esfuerzo, la técnica y el compromiso de las nuevas generaciones.',
  },
  {
    title: 'Estrofa II',
    lines: [
      'En la forja del SENA se forman,',
      'hombres libres que anhelan triunfar,',
      'con la ciencia y la técnica unidas,',
      'nuevos rumbos de paz trazarán.',
    ],
    meaning: 'Destaca la unión entre ciencia, técnica y valores humanos para construir una sociedad en paz.',
  },
];

export const NORMATIVIDAD_CASES = [
  {
    id: 'case-1',
    situation:
      'Un aprendiz llega 20 minutos tarde al taller de mantenimiento sin portar las gafas de seguridad ni su identificación institucional.',
    options: [
      {
        label: 'Ingresar al taller sin avisar para no interrumpir al instructor.',
        isCorrect: false,
        feedback:
          'Incorrecto. Según el Acuerdo 009 de 2024, ingresar sin Elementos de Protección Personal (EPP) pone en riesgo tu integridad y contraviene los deberes del aprendiz.',
      },
      {
        label: 'Reportarse con el instructor, presentar excusa si aplica y colocarse los EPP antes de iniciar práctica.',
        isCorrect: true,
        feedback:
          'Correcto. El porte de la identificación institucional y el uso obligatorio de los EPP en talleres son deberes esenciales en el Reglamento vigente.',
      },
    ],
  },
  {
    id: 'case-2',
    situation:
      'Durante una evaluación de proyecto, consideras que uno de los criterios de la rúbrica no fue valorado adecuadamente.',
    options: [
      {
        label: 'Solicitar revisión respetuosa al instructor y, de ser necesario, acudir al Coordinador Académico.',
        isCorrect: true,
        feedback:
          'Correcto. El Acuerdo 009 de 2024 garantiza el derecho al debido proceso, a la defensa y a la revisión de evaluaciones siguiendo el conducto regular.',
      },
      {
        label: 'Publicar una queja en redes sociales sin hablar con el instructor.',
        isCorrect: false,
        feedback:
          'Incorrecto. Siempre se debe agotar el conducto regular institucional de manera respetuosa y documentada.',
      },
    ],
  },
];
