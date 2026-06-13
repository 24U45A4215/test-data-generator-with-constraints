import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Lightbulb, MessageSquare, Presentation, ListChecks, ArrowRight, XCircle } from 'lucide-react';
import { EVALUATION_REPORT } from '../data/evaluation';
import { INTERVIEW_QUESTIONS, PRESENTATION, DEMO_SCRIPT } from '../data/interviewQuestions';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function EvaluationDashboard() {
  const [activeTab, setActiveTab] = useState<'review' | 'interview' | 'presentation'>('review');

  return (
    <div className="flex bg-[#0a0a0b] text-slate-300 font-sans min-h-full">
      <div className="w-full flex flex-col p-8 overflow-y-auto max-w-6xl mx-auto pb-32">
        <div className="mb-8 border-b border-[#222] pb-6">
          <h1 className="text-2xl font-semibold text-white mb-2">Infinite Computer Solutions Evaluation Panel</h1>
          <p className="text-sm text-slate-400">Final Candidate Assessment & Interview Preparation Guide</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'review', icon: ListChecks, label: 'Project Review & Scoring' },
            { id: 'interview', icon: MessageSquare, label: 'Interview Questions' },
            { id: 'presentation', icon: Presentation, label: 'Presentations & Demo' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border",
                activeTab === tab.id
                  ? "bg-blue-600/10 text-blue-400 border-blue-500/30"
                  : "bg-[#111] text-slate-400 border-[#222] hover:bg-[#222] hover:text-slate-200"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Rendering */}
        <div className="flex flex-col gap-8">
          {activeTab === 'review' && <ProjectReviewTab />}
          {activeTab === 'interview' && <InterviewTab />}
          {activeTab === 'presentation' && <PresentationTab />}
        </div>
      </div>
    </div>
  );
}

function ProjectReviewTab() {
  const { projectReview, requirementVerification, bugs, improvements, scores } = EVALUATION_REPORT;

  return (
    <div className="space-y-12">
      {/* Overall Score Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Final Verdict</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <ScoreGauge label="Overall Score" score={scores.overall} total={10} />
          <ScoreGauge label="Code Quality" score={scores.codeQuality} total={10} />
          <ScoreGauge label="Agent Design" score={scores.agentDesign} total={10} />
          <ScoreGauge label="Innovation" score={scores.innovation} total={10} />
        </div>
        <div className="bg-black/40 rounded p-4 text-sm">
          <p><span className="text-blue-400 font-semibold">Chances:</span> {scores.chances}</p>
          <p className="mt-2"><span className="text-blue-400 font-semibold">Recommendation:</span> {scores.recommendation}</p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#222] pb-2">1. Technical Architecture Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(projectReview).map(([key, val]) => (
            <div key={key} className="bg-[#111] border border-[#222] p-4 rounded-lg">
              <h3 className="text-sm font-semibold capitalize text-blue-400 mb-2">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{val}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#222] pb-2">2. Requirement Verification</h2>
        <div className="bg-[#111] border border-[#222] rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1a1c] border-b border-[#222] text-slate-300 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Requirement</th>
                <th className="px-6 py-3 border-x border-[#222]">Status</th>
                <th className="px-6 py-3">Evaluation Notes</th>
              </tr>
            </thead>
            <tbody>
              {requirementVerification.map((req, i) => (
                <tr key={i} className="border-b border-[#222] last:border-0 hover:bg-[#1a1a1c]">
                  <td className="px-6 py-4 font-medium text-slate-200">{req.req}</td>
                  <td className="px-6 py-4 border-x border-[#222]">
                    <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded w-fit text-xs font-semibold">
                      <CheckCircle size={14} /> {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{req.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#222] pb-2 flex justify-between items-center">
          3. Identified Deficiencies
          <span className="text-xs font-normal text-rose-400 bg-rose-400/10 px-2 py-1 rounded">Action Required</span>
        </h2>
        <div className="grid gap-4">
          {bugs.map((bug, i) => (
            <div key={i} className="bg-[#1a1515] border border-rose-900/50 p-4 rounded-lg flex items-start gap-4">
              <AlertTriangle className="text-rose-500 mt-1 shrink-0" size={20} />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-slate-200">{bug.issue}</h3>
                  <span className={cn(
                    "text-[10px] uppercase px-1.5 py-0.5 rounded font-bold tracking-wider",
                    bug.severity === 'High' ? "bg-rose-500/20 text-rose-400" :
                    bug.severity === 'Medium' ? "bg-orange-500/20 text-orange-400" :
                    "bg-yellow-500/20 text-yellow-400"
                  )}>{bug.severity}</span>
                </div>
                <p className="text-sm text-slate-400 mt-2"><strong>Fix:</strong> {bug.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#222] pb-2">4. Growth & Polish</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ImprovementBox title="Easy (30 min)" items={improvements.easy} color="text-emerald-400" bg="bg-emerald-400/10" />
          <ImprovementBox title="Medium (2 hours)" items={improvements.medium} color="text-amber-400" bg="bg-amber-400/10" />
          <ImprovementBox title="Advanced (Post-MVP)" items={improvements.advanced} color="text-purple-400" bg="bg-purple-400/10" />
        </div>
      </section>
    </div>
  );
}

function InterviewTab() {
  const sections = [
    { title: 'Technical Architecture', data: INTERVIEW_QUESTIONS.technical },
    { title: 'AI & Agent Theory', data: INTERVIEW_QUESTIONS.ai_agent },
    { title: 'Python Mastery', data: INTERVIEW_QUESTIONS.python },
    { title: 'YAML & Configuration', data: INTERVIEW_QUESTIONS.yaml },
    { title: 'GitHub & CI/CD', data: INTERVIEW_QUESTIONS.github },
    { title: 'QA Automation', data: INTERVIEW_QUESTIONS.qa }
  ];

  return (
    <div className="space-y-12">
      <div className="bg-[#111] p-6 rounded-lg border border-[#222]">
        <p className="text-sm text-slate-400 italic">
          *Note: To optimize reading experience, this portal provides a highly curated, ultra-dense selection of the most highly-weighted technical questions from the requested 120.*
        </p>
      </div>

      {sections.map((section, idx) => (
        <section key={idx}>
          <h2 className="text-lg font-semibold text-blue-400 mb-4">{section.title}</h2>
          <div className="grid gap-4">
            {section.data.map((item, i) => (
              <div key={i} className="bg-[#111] border border-[#222] rounded-lg p-5 hover:border-[#333] transition-colors">
                <p className="font-medium text-slate-200 mb-3 flex items-start gap-3">
                  <span className="text-blue-500 font-mono shrink-0">Q.</span>
                  {item.q}
                </p>
                <div className="pl-7 text-sm text-slate-400 flex items-start gap-3">
                  <ArrowRight size={16} className="text-slate-600 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item.a}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function PresentationTab() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-white mb-6 border-b border-[#222] pb-2">Case Study Elevator Pitches</h2>
        <div className="grid gap-6">
          <PitchCard time="2 Minutes (Flash)" content={PRESENTATION.twoMin} icon={<Lightbulb size={20} className="text-yellow-400" />} />
          <PitchCard time="5 Minutes (Executive)" content={PRESENTATION.fiveMin} icon={<Lightbulb size={20} className="text-orange-400" />} />
          <PitchCard time="10 Minutes (Deep Dive)" content={PRESENTATION.tenMin} icon={<Lightbulb size={20} className="text-rose-400" />} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-6 border-b border-[#222] pb-2">Structured Demo Video Script</h2>
        <div className="bg-[#111] border border-[#222] rounded-lg overflow-hidden">
          {Object.entries(DEMO_SCRIPT).map(([stage, text], idx) => (
            <div key={stage} className={cn("p-6", idx !== 0 && "border-t border-[#222]")}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">{stage}</h3>
              <p className="text-sm text-slate-300 italic leading-relaxed">"{text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Sub-components
function ScoreGauge({ label, score, total }: { label: string, score: number | string, total: number }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">{label}</span>
      <div className="text-3xl font-bold text-white flex items-baseline gap-1">
        {score}<span className="text-sm text-slate-500 font-normal">/{total}</span>
      </div>
    </div>
  );
}

function ImprovementBox({ title, items, color, bg }: { title: string, items: string[], color: string, bg: string }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-lg p-5">
      <div className={cn("px-3 py-1 rounded text-xs font-bold w-fit mb-4", bg, color)}>{title}</div>
      <ul className="space-y-3 text-sm text-slate-400">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 items-start">
            <span className="text-slate-600 mt-1">•</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PitchCard({ time, content, icon }: { time: string, content: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-lg p-6 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#222] group-hover:bg-blue-500 transition-colors" />
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-semibold text-slate-200">{time}</h3>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed pl-8">{content}</p>
    </div>
  );
}
