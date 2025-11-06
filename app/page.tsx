import WeightTrendChart from "./components/WeightTrendChart";
import FinancialBarChart from "./components/FinancialBarChart";
import ProductionPieChart from "./components/ProductionPieChart";
import TaskBoard from "./components/TaskBoard";
import GoatIntakeForm from "./components/GoatIntakeForm";
import WeightCaptureForm from "./components/WeightCaptureForm";
import AlertList from "./components/AlertList";
import WeatherWidget from "./components/WeatherWidget";
import KpiCard from "./components/KpiCard";
import {
  getDashboardSnapshot
} from "@/lib/data-store";
import {
  calculateHerdMetrics,
  buildWeightSeries,
  feedEfficiencyTrend,
  financialBreakdown,
  productionSummary
} from "@/lib/analytics";
import { formatCurrency, formatPercent, formatDate } from "@/lib/utils";

export default async function Page() {
  const snapshot = await getDashboardSnapshot();
  const herdMetrics = calculateHerdMetrics(snapshot);
  const weightSeries = buildWeightSeries(snapshot.weightRecords, snapshot.goats);
  const feedEfficiency = feedEfficiencyTrend(snapshot.weightRecords).slice(0, 4);
  const finance = financialBreakdown(snapshot.financials);
  const production = productionSummary(snapshot.production);

  const avgAdg =
    snapshot.weightRecords.reduce((sum, record) => sum + record.avgDailyGain, 0) /
    Math.max(snapshot.weightRecords.length, 1);

  const avgFcr =
    snapshot.weightRecords.reduce(
      (sum, record) => sum + record.feedConversionRatio,
      0
    ) / Math.max(snapshot.weightRecords.length, 1);

  return (
    <>
      <section className="panel panel--highlight">
        <div className="section__header">
          <h2>Commercial Goat Farming Command Center</h2>
          <p>
            Fully integrated identity, genetics, health, nutrition, financials, and AI intelligence for the Sitamarhi, Bihar goat enterprise.
          </p>
        </div>
        <div className="grid grid--four">
          <KpiCard
            label="Total Herd"
            value={`${herdMetrics.totalGoats} goats`}
            deltaLabel={`${herdMetrics.does} does • ${herdMetrics.bucks} bucks`}
            variant="info"
          />
          <KpiCard
            label="Average COI"
            value={formatPercent(herdMetrics.averageCoi)}
            deltaLabel="Goal: keep under 7%"
            variant="success"
          />
          <KpiCard
            label="Open Health Cases"
            value={`${herdMetrics.healthOpenCases}`}
            deltaLabel={`${herdMetrics.vaccinationPending} vaccines due`}
          />
          <KpiCard
            label="Profitability (YTD)"
            value={formatCurrency(herdMetrics.profitability)}
            deltaLabel={`Income ${formatCurrency(herdMetrics.income)} • Expense ${formatCurrency(herdMetrics.expense)}`}
          />
        </div>
      </section>

      <section id="identity" className="grid grid--two">
        <div className="panel">
          <div className="section__header">
            <h2>✅ Core Identity & Registry</h2>
            <p>
              Full-spectrum RFID, microchip, and nose print registry with five-generation lineage for each goat.
            </p>
          </div>
          <div className="scroll-area">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>RFID</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.goats.map((goat) => (
                  <tr key={goat.id}>
                    <td>{goat.id}</td>
                    <td>{goat.name}</td>
                    <td>{goat.breed}</td>
                    <td>{goat.rfid}</td>
                    <td>{goat.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <GoatIntakeForm />
        </div>
        <div className="panel">
          <div className="section__header">
            <h2>✅ Advanced Breeding & Genetics</h2>
            <p>
              AI-assisted genealogy, COI optimization, and inbreeding prevention for Sitamarhi breeding stock.
            </p>
          </div>
          <ul className="list">
            {snapshot.breedingPlans.map((plan) => (
              <li key={plan.id} className="list__item">
                <div>
                  <strong>{plan.pairing}</strong>
                  <p className="panel__subtitle">
                    Target kidding {formatDate(plan.targetKidding)} • COI {formatPercent(plan.expectedCoi)}
                  </p>
                  <p>{plan.geneticGoal}</p>
                </div>
                <span className={`chip ${plan.riskLevel === "High" ? "chip--danger" : plan.riskLevel === "Moderate" ? "chip--warning" : "chip--success"}`}>
                  {plan.riskLevel}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="health" className="grid grid--two">
        <div className="panel">
          <div className="section__header">
            <h2>✅ Comprehensive Health Management</h2>
            <p>
              Bihar-specific disease surveillance, vet protocols, and vaccination cadences with AI prioritization.
            </p>
          </div>
          <div className="scroll-area">
            <table className="table">
              <thead>
                <tr>
                  <th>Goat</th>
                  <th>Disease / Vaccine</th>
                  <th>Status</th>
                  <th>Next Check</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.healthRecords.map((record) => {
                  const goat = snapshot.goats.find((item) => item.id === record.goatId);
                  return (
                    <tr key={record.id}>
                      <td>{goat?.name}</td>
                      <td>{record.disease}</td>
                      <td>{record.status}</td>
                      <td>{formatDate(record.nextCheck)}</td>
                    </tr>
                  );
                })}
                {snapshot.vaccinationSchedules.map((schedule) => {
                  const goat = snapshot.goats.find((item) => item.id === schedule.goatId);
                  return (
                    <tr key={schedule.id}>
                      <td>{goat?.name}</td>
                      <td>{schedule.vaccine}</td>
                      <td>{schedule.completed ? "Done" : "Due"}</td>
                      <td>{formatDate(schedule.dueDate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel">
          <div className="section__header">
            <h2>✅ AI-Powered Risk Insights</h2>
            <p>
              Predictive analytics and computer vision for early disease detection and productivity optimisation.
            </p>
          </div>
          <div className="grid grid--two">
            {snapshot.predictiveInsights.map((insight) => (
              <div key={insight.id} className="card card--accent">
                <h3>{insight.title}</h3>
                <p>{insight.summary}</p>
                <span className="chip chip--info">
                  Confidence {formatPercent(insight.confidence * 100)}
                </span>
                <ul className="list">
                  {insight.recommendedActions.map((action) => (
                    <li key={action} className="list__item">
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="weight" className="grid grid--two">
        <div className="panel">
          <div className="section__header">
            <h2>✅ Weight Management & Growth Performance</h2>
            <p>
              Real-time ADG, FCR, and weight prediction analytics to hit market weight targets.
            </p>
          </div>
          <WeightTrendChart data={weightSeries} />
          <div className="split">
            <KpiCard
              label="Average ADG"
              value={`${avgAdg.toFixed(0)} g/day`}
              variant="success"
            />
            <KpiCard
              label="Average FCR"
              value={avgFcr.toFixed(2)}
              deltaLabel="Goal < 5.2"
            />
          </div>
          <WeightCaptureForm goats={snapshot.goats} />
        </div>
        <div className="panel">
          <div className="section__header">
            <h2>✅ Movement & Location Tracking</h2>
            <p>
              GPS geofencing, pasture rotation automation, and floodplain risk alerts.
            </p>
          </div>
          <div className="scroll-area">
            <table className="table">
              <thead>
                <tr>
                  <th>Goat</th>
                  <th>Pasture</th>
                  <th>Timestamp</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.movementRecords.map((movement) => {
                  const goat = snapshot.goats.find((entry) => entry.id === movement.goatId);
                  return (
                    <tr key={movement.id}>
                      <td>{goat?.name}</td>
                      <td>{movement.pasture}</td>
                      <td>{new Date(movement.timestamp).toLocaleString("en-IN")}</td>
                      <td>{movement.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="panel__header">
            <h3>Feed Conversion Leaders</h3>
            <span className="panel__subtitle">
              Optimise rotation for goats with best FCR
            </span>
          </div>
          <ul className="list">
            {feedEfficiency.map((trend) => {
              const goat = snapshot.goats.find((entry) => entry.id === trend.goatId);
              return (
                <li key={trend.goatId} className="list__item">
                  <span>{goat?.name}</span>
                  <span className="chip chip--success">FCR {trend.feedConversionTrend}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="nutrition" className="grid grid--two">
        <div className="panel">
          <div className="section__header">
            <h2>✅ Nutrition & Feed Management</h2>
            <p>
              Azolla integration, local fodder optimisation, and ration insights tailored for Bihar.
            </p>
          </div>
          <ul className="list">
            {snapshot.feedPlans.map((plan) => (
              <li key={plan.id} className="card">
                <h3>{plan.goatGroup}</h3>
                <p>{plan.feedType}</p>
                <p className="panel__subtitle">Inclusion: {plan.inclusionRate}</p>
                <div className="badge-list">
                  {plan.keyIngredients.map((ingredient) => (
                    <span key={ingredient} className="badge">
                      {ingredient}
                    </span>
                  ))}
                </div>
                <span className="chip chip--info">
                  ₹{plan.dailyCostInr} per head/day
                </span>
                <p>{plan.remarks}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <div className="section__header">
            <h2>✅ Financial Management</h2>
            <p>
              Full P&amp;L, cost per goat, ROI tracking, and revenue mix for decision making.
            </p>
          </div>
          <FinancialBarChart
            expenses={finance.expenseByCategory}
            income={finance.incomeByCategory}
          />
          <div className="split">
            <KpiCard
              label="Total Expense"
              value={formatCurrency(finance.expenseTotal)}
            />
            <KpiCard
              label="Total Income"
              value={formatCurrency(finance.incomeTotal)}
              variant="success"
            />
          </div>
          <div className="scroll-area">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.financials.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.type}</td>
                    <td>{entry.category}</td>
                    <td>{formatCurrency(entry.amountInr)}</td>
                    <td>{formatDate(entry.date)}</td>
                    <td>{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="production" className="grid grid--two">
        <div className="panel">
          <div className="section__header">
            <h2>✅ Production & Sales</h2>
            <p>
              Multi-channel meat and milk sales orchestration with SKU-specific margins.
            </p>
          </div>
          <ProductionPieChart data={production.productTotals} />
          <KpiCard
            label="Production Revenue"
            value={formatCurrency(production.revenue)}
            variant="success"
          />
          <div className="scroll-area">
            <table className="table">
              <thead>
                <tr>
                  <th>Goat</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Revenue</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.production.map((entry) => {
                  const goat = snapshot.goats.find((item) => item.id === entry.goatId);
                  return (
                    <tr key={entry.id}>
                      <td>{goat?.name ?? entry.goatId}</td>
                      <td>{entry.product}</td>
                      <td>
                        {entry.quantity} {entry.unit}
                      </td>
                      <td>{formatCurrency(entry.revenueInr)}</td>
                      <td>{formatDate(entry.date)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel">
          <div className="section__header">
            <h2>✅ Staff & Task Management</h2>
            <p>
              RBAC-enabled workforce orchestration with AI-generated workflows and escalation.
            </p>
          </div>
          <div className="scroll-area">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Responsibilities</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.staff.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                    <td>{member.responsibilities.join(", ")}</td>
                    <td>{member.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TaskBoard tasks={snapshot.tasks} />
        </div>
      </section>

      <section id="analytics" className="grid grid--two">
        <div className="panel">
          <div className="section__header">
            <h2>✅ Reporting & Analytics</h2>
            <p>
              Dashboard KPIs, forecasts, and drill-down analytics for strategic herd planning.
            </p>
          </div>
          <div className="grid grid--two">
            {snapshot.visionInsights.map((vision) => {
              const goat = snapshot.goats.find((entry) => entry.id === vision.goatId);
              return (
                <article key={vision.id} className="card card--warning">
                  <h3>Computer Vision Insight • {goat?.name}</h3>
                  <p>{vision.finding}</p>
                  <span className="panel__subtitle">
                    Confidence {formatPercent(vision.confidence * 100)}
                  </span>
                  <span className="panel__subtitle">
                    Captured {formatDate(vision.captureDate)}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
        <div className="panel">
          <div className="section__header">
            <h2>✅ Alert & Notification System</h2>
            <p>
              Multi-channel, intelligent alerting with acknowledgement workflows and escalation.
            </p>
          </div>
          <AlertList alerts={snapshot.alerts} />
        </div>
      </section>

      <section id="alerts" className="grid grid--two">
        <div className="panel">
          <div className="section__header">
            <h2>✅ AI & Sensor Fusion</h2>
            <p>
              Intelligent orchestration combining RFID, GPS, computer vision, and market integrations.
            </p>
          </div>
          <div className="badge-list">
            <span className="badge">RFID & Microchip identity</span>
            <span className="badge">Nose print biometrics</span>
            <span className="badge">Computer vision gait scoring</span>
            <span className="badge">GPS pasture geofencing</span>
            <span className="badge">Predictive breeding analytics</span>
            <span className="badge">Govt. scheme integration</span>
          </div>
        </div>
        <div className="panel">
          <div className="section__header">
            <h2>✅ Integration & APIs</h2>
            <p>
              Seamless connections to weather intelligence, market prices, and government advisories.
            </p>
          </div>
          <WeatherWidget weather={snapshot.integrations.weather} />
          <div className="card">
            <h3>Market Benchmarks</h3>
            <p>
              Goat meat ₹{snapshot.integrations.market.goatMeatInrPerKg}/kg, live goats ₹
              {snapshot.integrations.market.liveGoatInrPerKg}/kg, milk ₹
              {snapshot.integrations.market.milkInrPerLitre}/L
            </p>
            <span className="panel__subtitle">
              Source: {snapshot.integrations.market.source}
            </span>
          </div>
          <div className="list">
            {snapshot.integrations.government.map((scheme) => (
              <div key={scheme.scheme} className="card card--accent">
                <h3>{scheme.scheme}</h3>
                <p>{scheme.description}</p>
                <span className="panel__subtitle">
                  Last checked {formatDate(scheme.lastChecked)} • {scheme.url}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
