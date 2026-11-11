import { useState } from 'react';
import { Search, Download, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { ApprenticeRecord, INDUCTION_MODULES } from '../data/senaData';

interface SeguimientoDashboardProps {
  apprentices: ApprenticeRecord[];
}

type StatusFilter = 'todos' | 'completado' | 'progreso' | 'pendiente';

export function SeguimientoDashboard({ apprentices }: SeguimientoDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');

  const getApprenticeStats = (apr: ApprenticeRecord) => {
    const completedCount = INDUCTION_MODULES.filter(
      (m) => apr.progressByModule[m.id]
    ).length;
    const progressPercent = Math.round((completedCount / INDUCTION_MODULES.length) * 100);
    const scores = Object.values(apr.scoresByModule);
    const avgScore =
      scores.length > 0
        ? Math.round(scores.reduce((acc, s) => acc + s, 0) / scores.length)
        : 0;

    let status: 'completado' | 'progreso' | 'pendiente' = 'pendiente';
    if (progressPercent === 100) status = 'completado';
    else if (progressPercent > 0) status = 'progreso';

    return { completedCount, progressPercent, avgScore, status };
  };

  const filteredApprentices = apprentices.filter((apr) => {
    const matchesSearch =
      apr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apr.document.includes(searchQuery) ||
      apr.ficha.includes(searchQuery);

    if (!matchesSearch) return false;
    if (statusFilter === 'todos') return true;
    return getApprenticeStats(apr).status === statusFilter;
  });

  const totalCount = apprentices.length;
  const completedAllCount = apprentices.filter(
    (a) => getApprenticeStats(a).status === 'completado'
  ).length;
  const pendingCount = apprentices.filter(
    (a) => getApprenticeStats(a).status === 'pendiente'
  ).length;
  const avgGroupProgress = Math.round(
    apprentices.reduce((acc, a) => acc + getApprenticeStats(a).progressPercent, 0) /
      Math.max(1, totalCount)
  );

  const handleExportCSV = () => {
    const headers = ['Aprendiz', 'Documento', 'Ficha', 'Programa', 'Avance (%)', 'Promedio (%)', 'Estado', 'Última Actividad'];
    const rows = apprentices.map((apr) => {
      const stats = getApprenticeStats(apr);
      const statusLabel =
        stats.status === 'completado'
          ? 'Completado'
          : stats.status === 'progreso'
          ? 'En progreso'
          : 'Pendiente';
      return [
        `"${apr.name}"`,
        apr.document,
        apr.ficha,
        `"${apr.program}"`,
        stats.progressPercent,
        stats.avgScore,
        statusLabel,
        `"${apr.lastActivity}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'seguimiento_induccion_sena.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Seguimiento de Inducción · Ficha 2847192
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Monitoreo en tiempo real del avance de aprendices en normatividad, imagen institucional y evaluaciones.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Total Aprendices</p>
          <p className="text-2xl font-bold text-slate-900 font-mono-tabular mt-1">
            {totalCount}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Avance Promedio</p>
          <p className="text-2xl font-bold text-[#2E8B00] font-mono-tabular mt-1">
            {avgGroupProgress}%
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Inducción Completada</p>
          <p className="text-2xl font-bold text-slate-900 font-mono-tabular mt-1">
            {completedAllCount}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Sin Iniciar</p>
          <p className="text-2xl font-bold text-amber-600 font-mono-tabular mt-1">
            {pendingCount}
          </p>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o documento..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#39A900]"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
            {(
              [
                { id: 'todos', label: 'Todos' },
                { id: 'completado', label: 'Completado' },
                { id: 'progreso', label: 'En progreso' },
                { id: 'pendiente', label: 'Pendiente' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-600">
                <th className="py-3.5 px-5">Aprendiz</th>
                <th className="py-3.5 px-4">Documento</th>
                <th className="py-3.5 px-4">Módulos</th>
                <th className="py-3.5 px-4">Avance</th>
                <th className="py-3.5 px-4">Promedio</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-5">Última Actividad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredApprentices.map((apr) => {
                const stats = getApprenticeStats(apr);
                return (
                  <tr key={apr.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-slate-900">
                      {apr.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono-tabular text-xs text-slate-600">
                      {apr.document}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {INDUCTION_MODULES.map((m) => (
                          <div
                            key={m.id}
                            title={m.title}
                            className={`w-5 h-2 rounded-sm ${
                              apr.progressByModule[m.id]
                                ? 'bg-[#39A900]'
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono-tabular text-slate-900 font-medium">
                      {stats.progressPercent}%
                    </td>
                    <td className="py-3.5 px-4 font-mono-tabular text-slate-700">
                      {stats.avgScore > 0 ? `${stats.avgScore}%` : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      {stats.status === 'completado' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2E8B00]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Completado
                        </span>
                      )}
                      {stats.status === 'progreso' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700">
                          <Clock className="w-3.5 h-3.5" />
                          En progreso
                        </span>
                      )}
                      {stats.status === 'pendiente' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-slate-500">
                      {apr.lastActivity}
                    </td>
                  </tr>
                );
              })}
              {filteredApprentices.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-slate-500">
                    No se encontraron aprendices con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
