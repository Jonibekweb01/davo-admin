import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartItem {
  name: string;
  doriSoni: number;
}

interface DashboardStats {
  totalMedicines: number;
  totalPharmacies: number;
  totalCategories: number;
  chartData: ChartItem[];
}

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"];

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalMedicines: 0,
    totalPharmacies: 0,
    totalCategories: 0,
    chartData: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Backenddagi yangi endpointimizdan statistikani olish
        const response = await fetch(
          "http://localhost:5000/api/v1/medicines/dashboard/stats",
        );
        const resData = await response.json();

        if (resData.status === "success" && resData.data) {
          setStats(resData.data);
        }
      } catch (error) {
        console.error("Dashboard statistikalarini yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* 1. Yuqori Statistika Kartalari */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-gray-500">Jami dorilar</p>
          <p className="text-4xl font-extrabold text-amber-500 mt-2">
            {loading ? "..." : stats.totalMedicines}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-gray-500">Jami dorixonalar</p>
          <p className="text-4xl font-extrabold text-blue-500 mt-2">
            {loading ? "..." : stats.totalPharmacies}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-gray-500">Kategoriyalar</p>
          <p className="text-4xl font-extrabold text-green-500 mt-2">
            {loading ? "..." : stats.totalCategories}
          </p>
        </div>
      </div>

      {/* 2. Recharts Grafiklar Paneli */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ustunli Grafik (BarChart) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="font-bold text-slate-700 text-base mb-4">
            Kategoriyalar bo'yicha dori soni
          </h3>
          <div className="w-full h-80">
            {!loading && stats.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#38bdf8" }}
                  />
                  <Bar
                    dataKey="doriSoni"
                    fill="#f59e0b"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                {loading ? "Yuklanmoqda..." : "Ma'lumot mavjud emas"}
              </div>
            )}
          </div>
        </div>

        {/* Aylanma Grafik (PieChart) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 text-base mb-4">
            Foiz ulushi
          </h3>
          <div className="w-full h-80 flex flex-col justify-between">
            {!loading && stats.chartData.length > 0 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="doriSoni"
                    >
                      {stats.chartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-400">
                {loading ? "Yuklanmoqda..." : "Ma'lumot topilmadi"}
              </div>
            )}

            {/* Legend (Ranglar ko'rsatkichi) */}
            <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-600">
              {stats.chartData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
