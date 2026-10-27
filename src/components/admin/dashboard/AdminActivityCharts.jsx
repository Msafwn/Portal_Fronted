import React from 'react';
import Chart from 'react-apexcharts';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { useAdminPortal } from '../../../context/AdminPortalContext';

export const AdminActivityCharts = () => {
  const { chartsData } = useAdminPortal();

  // 1. User Registration Growth Area Chart
  const growthOptions = {
    chart: {
      type: 'area',
      height: 320,
      fontFamily: 'Inter, system-ui, sans-serif',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['#2563eb', '#059669'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [2.5, 2.5],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: chartsData.registrationTrends.categories,
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
          fontWeight: 600,
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
          fontWeight: 600,
        },
      },
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
      padding: { top: 0, right: 10, bottom: 0, left: 10 },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '13px',
      fontWeight: 600,
      markers: { radius: 6 },
      labels: { colors: '#334155' },
    },
    tooltip: {
      theme: 'light',
    },
  };

  const growthSeries = [
    {
      name: 'Registered Candidates',
      data: chartsData.registrationTrends.candidates,
    },
    {
      name: 'Registered Employers',
      data: chartsData.registrationTrends.employers,
    },
  ];

  // 2. University Faculty Distribution Donut Chart
  const totalStudentsInDisciplines = chartsData.disciplineBreakdown.series.reduce((a, b) => a + b, 0);

  const disciplineOptions = {
    chart: {
      type: 'donut',
      height: 320,
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    colors: ['#2563eb', '#10b981', '#f59e0b', '#06b6d4'],
    labels: chartsData.disciplineBreakdown.labels,
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      fontWeight: 600,
      labels: { colors: '#475569' },
      markers: { radius: 6 },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Users',
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748b',
              formatter: () => `${totalStudentsInDisciplines}`,
            },
            value: {
              fontSize: '24px',
              fontWeight: 800,
              color: '#0f172a',
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => `${val} Candidates (${Math.round((val / totalStudentsInDisciplines) * 100)}%)`,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 3xl:gap-10">
      {/* 1. Left Chart: User Growth Over Time (7 cols) */}
      <div className="lg:col-span-7 bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 2xl:space-y-6">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 2xl:pb-4 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 2xl:gap-3 min-w-0">
              <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-600 shrink-0" />
              <h3 className="font-bold text-sm sm:text-base 2xl:text-xl 3xl:text-2xl text-slate-900 tracking-tight flex items-center gap-2 truncate">
                <TrendingUp className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600 shrink-0" />
                <span className="truncate">Registration Growth Trends (6M)</span>
              </h3>
            </div>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1 truncate">
              Monthly acquisition comparing Candidates vs Employers
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0 whitespace-nowrap">
            +38.5% Growth
          </span>
        </div>

        {/* Apex Area Chart */}
        <div className="pt-1">
          <Chart
            options={growthOptions}
            series={growthSeries}
            type="area"
            height={320}
          />
        </div>
      </div>

      {/* 2. Right Chart: Faculty Discipline Breakdown (5 cols) */}
      <div className="lg:col-span-5 bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 2xl:space-y-6">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 2xl:pb-4 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 2xl:gap-3 min-w-0">
              <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-600 shrink-0" />
              <h3 className="font-bold text-sm sm:text-base 2xl:text-xl 3xl:text-2xl text-slate-900 tracking-tight flex items-center gap-2 truncate">
                <PieIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600 shrink-0" />
                <span className="truncate">Faculty Distribution</span>
              </h3>
            </div>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1 truncate">
              Candidate segmentation across 4 disciplines
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 whitespace-nowrap">
            4 Faculties
          </span>
        </div>

        {/* Apex Donut Chart */}
        <div className="pt-1 flex items-center justify-center">
          <Chart
            options={disciplineOptions}
            series={chartsData.disciplineBreakdown.series}
            type="donut"
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminActivityCharts;
