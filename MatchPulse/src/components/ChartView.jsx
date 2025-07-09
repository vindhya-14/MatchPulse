import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

function ChartView({ competitions }) {
  const areaCounts = competitions.reduce((acc, c) => {
    const area = c.area.name;
    acc[area] = (acc[area] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(areaCounts),
    datasets: [
      {
        label: "Competitions by Area",
        data: Object.values(areaCounts),
        backgroundColor: "rgba(99, 102, 241, 0.8)", // Indigo-500
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e5e7eb", // Tailwind text-gray-200
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Distribution of Competitions by Region",
        color: "#c7d2fe",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} competitions`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#d1d5db", // text-gray-300
        },
        grid: {
          color: "#374151", // bg-gray-700
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d1d5db",
          stepSize: 1,
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800/80 p-6 rounded-xl mt-8 shadow-lg">
      <div style={{ height: "400px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartView;
