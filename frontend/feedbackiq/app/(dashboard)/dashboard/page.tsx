'use client';
import {logout} from '@/lib/authApi';

const handleLogout = async () => {
	try {
		const data = await logout();
		if (data.status === '200' && data.success) {
			window.location.href = '/signin';
		} else {
			console.error('Logout failed:', data);
		}
	} catch (err) {
		console.error('Unexpected error during logout:', err);
	}
};

const stats = [
	{ label: "Total responses", value: "2,846", change: "+12.8%", note: "vs. last month" },
	{ label: "Average rating", value: "4.6 / 5", change: "+0.3", note: "vs. last month" },
	{ label: "Response rate", value: "68.4%", change: "+5.2%", note: "vs. last month" },
	{ label: "Open issues", value: "18", change: "-4", note: "vs. last month" },
];

const feedback = [
	{ initials: "JM", name: "Jordan M.", detail: "Product experience", rating: 5, message: "Really intuitive to use. The new dashboard makes it so much easier to find what I need.", time: "12 min ago" },
	{ initials: "AL", name: "Alex L.", detail: "Customer support", rating: 4, message: "Support was quick and helpful. Would love to see a few more customization options.", time: "48 min ago" },
	{ initials: "SR", name: "Sam R.", detail: "Onboarding", rating: 3, message: "Getting started was straightforward, but I wasn’t sure where to invite my team.", time: "2 hours ago" },
];

export default function Dashboard() {
	return (
		<main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<p className="text-sm font-medium text-slate-500">Monday, October 21, 2024</p>
						<h1 className="mt-1 text-3xl font-bold tracking-tight">Good morning, Shivam</h1>
						<p className="mt-2 text-slate-500">Here’s what’s happening with your customer feedback.</p>
					</div>
					<button className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:self-auto" onClick={handleLogout}>
						 Log out
					</button>
				</header>

				<section aria-label="Feedback overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{stats.map((stat) => (
						<article key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
							<p className="text-sm font-medium text-slate-500">{stat.label}</p>
							<div className="mt-3 flex items-end justify-between gap-2">
								<p className="text-2xl font-bold tracking-tight">{stat.value}</p>
								<span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">{stat.change}</span>
							</div>
							<p className="mt-2 text-xs text-slate-400">{stat.note}</p>
						</article>
					))}
				</section>

				<section className="mt-6 grid gap-6 lg:grid-cols-3">
					<article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
						<div className="flex flex-wrap items-start justify-between gap-3">
							<div>
								<h2 className="font-semibold">Response trends</h2>
								<p className="mt-1 text-sm text-slate-500">Feedback received over the last 7 days</p>
							</div>
							<button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">This week⌄</button>
						</div>
						<div className="mt-6 h-56 w-full" role="img" aria-label="Line chart showing a steady increase in responses throughout the week">
							<svg viewBox="0 0 700 210" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
								<defs>
									<linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
										<stop offset="0%" stopColor="#6366f1" stopOpacity=".18" />
										<stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
									</linearGradient>
								</defs>
								{[35, 85, 135, 185].map((y) => <line key={y} x1="0" x2="700" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 5" />)}
								<path d="M0 155 C45 145 55 110 100 120 S160 145 200 105 S270 100 300 112 S360 80 400 91 S460 115 500 69 S565 86 600 55 S660 52 700 24 L700 200 L0 200 Z" fill="url(#chartFill)" />
								<path d="M0 155 C45 145 55 110 100 120 S160 145 200 105 S270 100 300 112 S360 80 400 91 S460 115 500 69 S565 86 600 55 S660 52 700 24" fill="none" stroke="#6366f1" strokeWidth="3" vectorEffect="non-scaling-stroke" />
								{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => <text key={day} x={i * 116 + 8} y="207" fill="#94a3b8" fontSize="11">{day}</text>)}
							</svg>
						</div>
					</article>

					<article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
						<h2 className="font-semibold">Sentiment breakdown</h2>
						<p className="mt-1 text-sm text-slate-500">Based on recent responses</p>
						<div className="mt-6 space-y-5">
							{[
								{ label: "Positive", count: "72%", width: "72%", color: "bg-emerald-500" },
								{ label: "Neutral", count: "19%", width: "19%", color: "bg-amber-400" },
								{ label: "Negative", count: "9%", width: "9%", color: "bg-rose-500" },
							].map((item) => (
								<div key={item.label}>
									<div className="mb-2 flex justify-between text-sm"><span className="text-slate-600">{item.label}</span><span className="font-semibold">{item.count}</span></div>
									<div className="h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${item.color}`} style={{ width: item.width }} /></div>
								</div>
							))}
						</div>
						<div className="mt-7 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-800"><span className="font-semibold">Looking good!</span> Positive feedback is up 8% this month.</div>
					</article>
				</section>

				<section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
					<div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
						<div><h2 className="font-semibold">Recent feedback</h2><p className="mt-1 text-sm text-slate-500">The latest responses from your customers</p></div>
						<a href="#feedback" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View all →</a>
					</div>
					<div className="divide-y divide-slate-100">
						{feedback.map((item) => (
							<article key={item.name} className="flex gap-3 px-5 py-4 sm:gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{item.initials}</div>
								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
										<h3 className="text-sm font-semibold">{item.name}</h3><span className="text-xs text-slate-400">· {item.detail}</span>
										<span className="ml-auto text-xs text-slate-400">{item.time}</span>
									</div>
									<p className="mt-1 text-sm leading-6 text-slate-600">{item.message}</p>
									<p className="mt-1 text-sm tracking-wide text-amber-500" aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(item.rating)}<span className="text-slate-200">{"★".repeat(5 - item.rating)}</span></p>
								</div>
							</article>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
