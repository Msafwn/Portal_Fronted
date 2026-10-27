import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useSupport } from './SupportContext';

const FAQS = [
  {
    q: 'How is my 50-30-20 Compatibility Score calculated?',
    a: 'The Smart Career AI algorithm evaluates your profile across three weighted dimensions: 50% for Technical Skills match against job requirements, 30% for Practical Experience & Capstone Projects, and 20% for Academic Credentials & Degree verification. Scores update in real time whenever you update your skills or profile.',
  },
  {
    q: 'How can I boost my match percentage for a target job?',
    a: 'Navigate to "AI Role Matches" and check the "Missing Skills" highlighted in red/amber for your desired job. Adding those acquired skills to your Profile or completing a recommended roadmap project will instantly boost your match percentage.',
  },
  {
    q: 'What happens after I apply for a job?',
    a: 'Your application is forwarded to the employer portal along with your verified AI Match Report. You can track status updates (Under Review, Shortlisted, Interview Scheduled) in the "My Applications" tab.',
  },
  {
    q: 'Can I change my candidate department field?',
    a: 'Yes! Use the Department selector in the top bar to switch between Information Technology, Medical & Healthcare, Engineering, and Business & Finance profiles to explore opportunities across all sectors.',
  },
];

export const SupportFaqSection = ({ className = '' }) => {
  const { activeFaq, setActiveFaq } = useSupport();

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 ${className}`}>
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <HelpCircle className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm font-bold text-slate-900">Instant Answers (FAQs)</h3>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="border border-slate-100 rounded-xl overflow-hidden transition-all"
          >
            <button
              type="button"
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              className="w-full flex items-center justify-between p-3 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                  activeFaq === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeFaq === idx && (
              <div className="px-3 pb-3 text-xs text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100 pt-2">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportFaqSection;
