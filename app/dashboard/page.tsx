import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  BookOpen,
  Phone,
  Calculator,
  Target,
  FileText,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Bell
} from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Mock data for student progress
  const recentActivities = [
    {
      id: 1,
      type: "math",
      title: "গণিত - বীজগণিত সমাধান",
      time: "২ ঘণ্টা আগে",
      score: "৮৫%",
      icon: Calculator,
      color: "bg-teal-100 text-teal-600"
    },
    {
      id: 2,
      type: "practice",
      title: "পদার্থবিজ্ঞান - অনুশীলন চ্যাপ্টার ৩",
      time: "৫ ঘণ্টা আগে",
      score: "৯০%",
      icon: Target,
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      type: "reading",
      title: "জীববিজ্ঞান - কোষের গঠন পড়া",
      time: "গতকাল",
      score: "সম্পন্ন",
      icon: BookOpen,
      color: "bg-teal-100 text-teal-600"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: " রসায়ন কুইজ টেস্ট",
      deadline: "আগামীকাল, সন্ধ্যা ৭টা",
      priority: "High",
    },
    {
      id: 2,
      title: "লাইভ ক্লাস - ইংরেজি ২য় পত্র",
      deadline: "রবিবার, সকাল ১০টা",
      priority: "Medium",
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            স্বাগতম, Tamzid! 👋
          </h1>
          <p className="text-gray-600">
            তোমার আজকের লার্নিং ড্যাশবোর্ডে তোমাকে স্বাগতম। চলো পড়ালেখা শুরু করি!
          </p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white rounded-full border shadow-sm hover:bg-gray-50 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="bg-teal-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-teal-200">
            Class 9 • Science
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">+১২% বৃদ্ধি</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">২৪ মি.</h3>
          <p className="text-sm text-gray-500 font-medium">আজকের পড়ার সময়</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">১৫৬</h3>
          <p className="text-sm text-gray-500 font-medium">সর্বমোট অনুশীলন</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-teal-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">১২</h3>
          <p className="text-sm text-gray-500 font-medium">অর্জিত ব্যাজ</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">৮৫%</h3>
          <p className="text-sm text-gray-500 font-medium">গড় স্কোর</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 h-full">
        {/* Main Content Area - 2 Cols */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions (Bangla) */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-600" />
              কুইক অ্যাকশন
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/dashboard/voice-ai"
                className="bg-teal-600 rounded-2xl p-6 text-white shadow-xl shadow-teal-200 hover:shadow-2xl hover:scale-[1.02] transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  AI শিক্ষকের সাথে কথা বলুন
                </h3>
                <p className="text-teal-100 text-sm">
                  সরাসরি কথা বলে যেকোনো টপিক বুঝে নিন।
                </p>
              </a>

              <a
                href="/dashboard/math-solver"
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Calculator className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  গণিত সমাধান
                </h3>
                <p className="text-sm text-gray-600">
                  অংকের ছবি তুলে মুহূর্তেই সমাধান পান।
                </p>
              </a>

              <a
                href="/dashboard/practice"
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  অনুশীলন করুন
                </h3>
                <p className="text-sm text-gray-600">
                  চ্যাপ্টার ভিত্তিক কুইজ এবং মডেল টেস্ট।
                </p>
              </a>

              <a
                href="/dashboard/book-reader"
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  বই পড়ুন
                </h3>
                <p className="text-sm text-gray-600">
                  NCTB বই এবং ইন্টারেক্টিভ রিডিং।
                </p>
              </a>
            </div>
          </div>

          {/* Study Plan Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">আমার রুটিন</h2>
              <button className="text-sm text-teal-600 font-semibold hover:underline">সব দেখুন</button>
            </div>
            <div className="space-y-4">
              {/* Hardcoded study items from previous context */}
              <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors cursor-pointer">
                <div className="w-2 h-12 bg-red-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-gray-900">পদার্থবিজ্ঞান - ৩য় অধ্যায়</h4>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">High Priority</span>
                  </div>
                  <p className="text-sm text-gray-600">নিউটনের ৩য় সূত্র, ভরবেগ ও ঘর্ষণ বল</p>
                </div>
                <button className="ml-4 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-100">শুরু করুন</button>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors cursor-pointer">
                <div className="w-2 h-12 bg-yellow-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-gray-900">রসায়ন - ৪র্থ অধ্যায়</h4>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold">Medium</span>
                  </div>
                  <p className="text-sm text-gray-600">পর্যায় সারণি: মৌলের পর্যায়বৃত্ত ধর্ম</p>
                </div>
                <button className="ml-4 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-100">শুরু করুন</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Extra Info - 1 Col */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">সাম্প্রতিক অ্যাক্টিভিটি</h2>
            <div className="space-y-6">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-4 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className={`h-10 w-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-0.5">{activity.title}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{activity.time}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="font-medium text-gray-700">{activity.score}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-teal-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
            <h2 className="text-lg font-bold mb-4 relative z-10">আগামী ইভেন্টসমূহ</h2>
            <div className="space-y-4 relative z-10">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="font-semibold text-sm mb-1">{task.title}</p>
                  <div className="flex items-center gap-2 text-xs text-teal-200">
                    <Clock className="w-3 h-3" />
                    {task.deadline}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2 bg-white text-teal-900 rounded-lg text-sm font-bold hover:bg-teal-50 transition-colors relative z-10">
              ক্যালেন্ডার দেখুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
