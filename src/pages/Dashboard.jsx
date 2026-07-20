import { useEffect, useState } from "react";
import {
  FileText,
  CheckCircle,
  Edit3,
  MessageSquare,
  Phone,
  GraduationCap,
  Mail,
} from "lucide-react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data.stats);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Content",
      value: stats.totalContent,
      icon: FileText,
    },
    {
      title: "Published",
      value: stats.publishedContent,
      icon: CheckCircle,
    },
    {
      title: "Drafts",
      value: stats.draftContent,
      icon: Edit3,
    },
    {
      title: "Comments",
      value: stats.totalComments,
      icon: MessageSquare,
    },
    {
      title: "Consultations",
      value: stats.totalConsultations,
      icon: Phone,
    },
    {
      title: "Enrollments",
      value: stats.totalEnrollments,
      icon: GraduationCap,
    },
    {
      title: "Subscribers",
      value: stats.totalSubscribers,
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>

                  <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
                </div>

                <div className="bg-blue-100 p-3 rounded-xl">
                  <Icon className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
