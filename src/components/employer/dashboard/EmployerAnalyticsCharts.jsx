import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { TrendingUp, PieChart as PieIcon, Sparkles, Building2 } from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';

export const EmployerAnalyticsCharts = () => {
  const { jobs = [], applicants = [] } = useEmployerPortal();

  // 1. Line/Area Chart Options & Data: Weekly Ingestion & AI Matches
  const areaChartOptions = {
    chart: {
      type: 'area',
      height: 320,
      fontFamily: 'Inter, system-ui, sans-serif',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['#2563eb', '#f59e0b'],
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
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      y: {
        formatter: (val) => `${val} Candidates`,
      },
    },
  };

  const areaChartSeries = useMemo(() => {
    const totalPerDay = [0, 0, 0, 0, 0, 0, 0];
    const highMatchPerDay = [0, 0, 0, 0, 0, 0, 0];

    applicants.forEach((app) => {
      const date = app.appliedAt || app.createdAt ? new Date(app.appliedAt || app.createdAt) : null;
      const dayIdx = date ? date.getDay() : 1;
      const monIdx = dayIdx === 0 ? 6 : dayIdx - 1;
      totalPerDay[monIdx] += 1;
      if ((app.matchScore || app.matchPercentage || 0) >= 80) {
        highMatchPerDay[monIdx] += 1;
      }
    });

    return [
      {
        name: 'Total Applications Ingested',
        data: totalPerDay,
      },
      {
        name: 'AI High Matches (≥ 80% Fit ⭐)',
        data: highMatchPerDay,
      },
    ];
  }, [applicants]);

  // 2. Compute Department Distribution from active jobs
  const departmentStats = useMemo(() => {
    let itCount = 0;
    let medCount = 0;
    let engCount = 0;
    let bizCount = 0;

    jobs.forEach((job) => {
      const dept = (job.department || '').toLowerCase();
      const seats = Number(job.totalSeats) || 1;
      if (dept.includes('computer') || dept.includes('software') || dept.includes('it') || dept.includes('mobile') || dept.includes('cloud')) {
        itCount += seats;
      } else if (dept.includes('med') || dept.includes('health') || dept.includes('clinic')) {
        medCount += seats;
      } else if (dept.includes('eng') || dept.includes('civil') || dept.includes('struct') || dept.includes('mech')) {
        engCount += seats;
      } else if (dept.includes('biz') || dept.includes('business') || dept.includes('fin') || dept.includes('account')) {
        bizCount += seats;
      } else {
        itCount += seats;
      }
    });

    return {
      series: [itCount, medCount, engCount, bizCount],
      labels: [
        'Computer Science & IT',
        'Medical & Healthcare',
        'Engineering & Construction',
        'Business & Finance',
      ],
    };
  }, [jobs]);

  const donutChartOptions = {
    chart: {
      type: 'donut',
      height: 320,
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    colors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'],
    labels: departmentStats.labels,
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
              label: 'Total Seats',
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748b',
              formatter: () => {
                const total = departmentStats.series.reduce((a, b) => a + b, 0);
                return `${total}`;
              },
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
        formatter: (val) => `${val} Approved Seats`,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 3xl:gap-10">
      {/* 1. Left Chart: Candidate Ingestion & AI Matching Trajectory (7 cols) */}
      <div className="lg:col-span-7 bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 2xl:space-y-6">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 2xl:pb-4 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 2xl:gap-3 min-w-0">
              <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-600 shrink-0" />
              <h3 className="font-bold text-sm sm:text-base 2xl:text-xl 3xl:text-2xl text-slate-900 tracking-tight flex items-center gap-2 truncate">
                <TrendingUp className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600 shrink-0" />
                <span className="truncate">Pipeline & AI Trajectory</span>
              </h3>
            </div>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1 truncate">
              Weekly ingestion vs high AI compatibility (≥ 80% fit)
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-500" />
            <span>68% Screened Fit</span>
          </span>
        </div>

        {/* Apex Area Chart */}
        <div className="pt-1">
          <Chart
            options={areaChartOptions}
            series={areaChartSeries}
            type="area"
            height={320}
          />
        </div>
      </div>

      {/* 2. Right Chart: Faculty & Vacancy Breakdown Donut (5 cols) */}
      <div className="lg:col-span-5 bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 2xl:space-y-6">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 2xl:pb-4 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 2xl:gap-3 min-w-0">
              <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-600 shrink-0" />
              <h3 className="font-bold text-sm sm:text-base 2xl:text-xl 3xl:text-2xl text-slate-900 tracking-tight flex items-center gap-2 truncate">
                <PieIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600 shrink-0" />
                <span className="truncate">Faculty Vacancy Allocation</span>
              </h3>
            </div>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1 truncate">
              Open seat quota across 4 disciplines
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0 whitespace-nowrap">
            <Building2 className="w-3 h-3 2xl:w-4 2xl:h-4" />
            <span>4 Sectors</span>
          </span>
        </div>

        {/* Apex Donut Chart */}
        <div className="pt-1 flex items-center justify-center">
          <Chart
            options={donutChartOptions}
            series={departmentStats.series}
            type="donut"
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployerAnalyticsCharts;
