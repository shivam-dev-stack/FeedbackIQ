const plans = [
  {
    name: 'Starter',
    price: '$19',
    description: 'For early-stage teams collecting customer feedback at scale.',
    cta: 'Start free trial',
    featured: false,
    features: [
      'Up to 5 projects',
      'Unlimited survey responses',
      'Basic analytics dashboard',
      'Email summaries',
      'Slack alerts',
    ],
  },
  {
    name: 'Growth',
    price: '$49',
    description: 'Built for product teams that want faster insight and better alignment.',
    cta: 'Choose Growth',
    featured: true,
    badge: 'Most popular',
    features: [
      'Everything in Starter',
      'Unlimited projects',
      'Advanced segmentation',
      'Custom reporting',
      'Priority support',
    ],
  },
  {
    name: 'Scale',
    price: '$99',
    description: 'For businesses that need deeper analysis and enterprise-grade workflows.',
    cta: 'Talk to sales',
    featured: false,
    features: [
      'Everything in Growth',
      'SSO & role-based access',
      'Custom integrations',
      'Volume-based API',
      'Dedicated onboarding',
    ],
  },
];

const comparisons = [
  'Unlimited feedback collection',
  'AI sentiment & theme analysis',
  'Team collaboration & comments',
  'Custom dashboards & exports',
  'Automation & integrations',
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),transparent_25%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-200">
              Simple pricing for teams of every size
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn customer feedback into product momentum.
            </h1>

            <p className="mt-6 text-lg text-slate-300 sm:text-xl">
              FeedbackIQ helps you collect, understand, and act on customer sentiment with AI-powered insights, dashboards, and workflow automation.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
                No credit card required
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                14-day free trial
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={[
                  'relative rounded-3xl border p-8 shadow-2xl shadow-slate-950/30 transition-all duration-200',
                  plan.featured
                    ? 'border-sky-400 bg-sky-500/10 ring-1 ring-sky-400/30'
                    : 'border-slate-800 bg-slate-900/70',
                ].join(' ')}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-sky-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950">
                    {plan.badge}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
                  {plan.featured && (
                    <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-sky-200">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="pb-1 text-slate-400">/month</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">{plan.description}</p>

                <button
                  type="button"
                  className={[
                    'mt-8 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                    plan.featured
                      ? 'bg-sky-400 text-slate-950 hover:bg-sky-300'
                      : 'bg-slate-100 text-slate-900 hover:bg-white',
                  ].join(' ')}
                >
                  {plan.cta}
                </button>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-200">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-xs text-emerald-300">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Why teams switch</p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to understand customer voice.
              </h3>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Collect direct feedback, uncover trends in real time, and route insights to the people who can act on them fastest.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {comparisons.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/15 text-sm text-sky-300">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-slate-100">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-r from-sky-500/15 to-violet-500/10 p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Start today</p>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            See how FeedbackIQ can transform your customer experience.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Join product, support, and CX teams who use customer signals to make better decisions with less guesswork.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start free trial
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/20 bg-slate-950/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Book a demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
