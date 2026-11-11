import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../data/senaData';

interface InteractiveQuizProps {
  moduleTitle: string;
  questions: QuizQuestion[];
  previousScore?: number;
  onComplete: (scorePercent: number) => void;
}

export function InteractiveQuiz({
  moduleTitle,
  questions,
  previousScore,
  onComplete,
}: InteractiveQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion.correctIndex;

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      const finalCorrect = correctCount;
      const score = Math.round((finalCorrect / questions.length) * 100);
      setFinished(true);
      onComplete(score);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setCorrectCount(0);
    setFinished(false);
  };

  if (finished) {
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const passed = finalScore >= 60;

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Evaluación completada · {moduleTitle}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Puntaje obtenido:{' '}
              <span className="font-mono-tabular text-[#2E8B00]">{finalScore}%</span>
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Respondiste correctamente{' '}
              <span className="font-mono-tabular font-semibold text-slate-900">
                {correctCount} de {questions.length}
              </span>{' '}
              preguntas.{' '}
              {passed
                ? 'Has aprobado este módulo y tu avance quedó registrado en el seguimiento.'
                : 'Te recomendamos repasar el contenido multimedia e intentarlo nuevamente.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar cuestionario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Cuestionario de Verificación
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Pregunta{' '}
            <span className="font-mono-tabular font-medium text-slate-700">
              {currentIndex + 1} / {questions.length}
            </span>
            {previousScore !== undefined && (
              <>
                {' '}
                · Último puntaje registrado:{' '}
                <span className="font-mono-tabular font-medium text-[#2E8B00]">
                  {previousScore}%
                </span>
              </>
            )}
          </p>
        </div>
        <div className="w-36 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#39A900] transition-all duration-200"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-base font-medium text-slate-900 leading-relaxed">
          {currentQuestion.question}
        </p>

        <div className="mt-4 space-y-2.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isRightOption = idx === currentQuestion.correctIndex;

            let optionStyle =
              'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700';

            if (isSubmitted) {
              if (isRightOption) {
                optionStyle = 'border-[#39A900] bg-emerald-50/70 text-slate-900';
              } else if (isSelected && !isRightOption) {
                optionStyle = 'border-red-400 bg-red-50/70 text-slate-900';
              } else {
                optionStyle = 'border-slate-200 bg-slate-50 text-slate-400';
              }
            } else if (isSelected) {
              optionStyle = 'border-[#39A900] bg-emerald-50/40 text-slate-900';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left px-4 py-3.5 rounded-lg border text-sm transition-colors flex items-start justify-between gap-3 ${optionStyle}`}
              >
                <span className="leading-snug">{option}</span>
                {isSubmitted && isRightOption && (
                  <CheckCircle2 className="w-4 h-4 text-[#2E8B00] shrink-0 mt-0.5" />
                )}
                {isSubmitted && isSelected && !isRightOption && (
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div
            className={`mt-4 p-4 rounded-lg border text-sm ${
              isCorrect
                ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                : 'bg-amber-50/60 border-amber-200 text-slate-800'
            }`}
          >
            <p className="font-semibold text-slate-900 mb-1">
              {isCorrect ? 'Respuesta correcta' : 'Retroalimentación'}
            </p>
            <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleSubmitAnswer}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#2E8B00] hover:bg-[#257000] disabled:bg-slate-200 disabled:text-slate-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Verificar respuesta
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {currentIndex + 1 < questions.length ? 'Siguiente pregunta' : 'Finalizar evaluación'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
