import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import type { Experience, Education, Skill, Activity, SocialNetwork } from '../../types/cv';

export function SummaryEditor({ summaries, onChange }: { summaries: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {summaries.map((s, i) => (
        <div key={i}>
          <label className="block text-xs font-medium text-gray-600 mb-1">Summary Paragraph {i + 1}</label>
          <textarea
            value={s}
            onChange={e => { const n = [...summaries]; n[i] = e.target.value; onChange(n); }}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[60px] resize-y"
          />
        </div>
      ))}
    </div>
  );
}

export function ExperienceEditor({ items, onChange }: { items: Experience[]; onChange: (v: Experience[]) => void }) {
  const update = (i: number, field: string, value: any) => {
    const n = [...items];
    (n[i] as any)[field] = value;
    onChange(n);
  };
  const updateHighlight = (i: number, hi: number, value: string) => {
    const n = [...items];
    n[i].highlights[hi] = value;
    onChange(n);
  };
  const addHighlight = (i: number) => {
    const n = [...items];
    n[i].highlights.push('');
    onChange(n);
  };
  const removeHighlight = (i: number, hi: number) => {
    const n = [...items];
    n[i].highlights = n[i].highlights.filter((_, idx) => idx !== hi);
    onChange(n);
  };

  return (
    <div className="space-y-4">
      {items.map((exp, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-gray-500">{exp.company || `Experience ${i + 1}`}</span>
            <div className="flex gap-1">
              <button onClick={() => { if (i > 0) { const n = [...items]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; onChange(n); } }} className="p-1 text-gray-400 hover:text-gray-600"><ArrowUp size={14} /></button>
              <button onClick={() => { if (i < items.length - 1) { const n = [...items]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; onChange(n); } }} className="p-1 text-gray-400 hover:text-gray-600"><ArrowDown size={14} /></button>
              <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
            <input value={exp.company} onChange={e => update(i, 'company', e.target.value)} placeholder="e.g. Acme Corp" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Position</label>
              <input value={exp.position} onChange={e => update(i, 'position', e.target.value)} placeholder="e.g. Software Engineer" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <input value={exp.location || ''} onChange={e => update(i, 'location', e.target.value)} placeholder="e.g. San Francisco, CA" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
              <input value={exp.start_date} onChange={e => update(i, 'start_date', e.target.value)} placeholder="e.g. 2020-01" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
              <input value={exp.end_date} onChange={e => update(i, 'end_date', e.target.value)} placeholder="e.g. 2023-06" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-600">Highlights</span>
            {exp.highlights.map((h, hi) => (
              <div key={hi} className="flex gap-1">
                <input value={h} onChange={e => updateHighlight(i, hi, e.target.value)} placeholder="e.g. Built feature X" className="flex-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
                <button onClick={() => removeHighlight(i, hi)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => addHighlight(i)} className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700"><Plus size={12} /> Add highlight</button>
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...items, { company: '', position: '', start_date: '', end_date: 'present', location: '', highlights: [''] }])} className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"><Plus size={14} /> Add experience</button>
    </div>
  );
}

export function EducationEditor({ items, onChange }: { items: Education[]; onChange: (v: Education[]) => void }) {
  const update = (i: number, field: string, value: any) => {
    const n = [...items];
    (n[i] as any)[field] = value;
    onChange(n);
  };
  return (
    <div className="space-y-3">
      {items.map((edu, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">{edu.institution || `Education ${i + 1}`}</span>
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Institution</label>
            <input value={edu.institution} onChange={e => update(i, 'institution', e.target.value)} placeholder="e.g. MIT" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Area of Study</label>
              <input value={edu.area} onChange={e => update(i, 'area', e.target.value)} placeholder="e.g. Computer Science" className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Degree</label>
              <input value={edu.degree} onChange={e => update(i, 'degree', e.target.value)} placeholder="e.g. BSc" className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
              <input value={edu.date} onChange={e => update(i, 'date', e.target.value)} placeholder="e.g. 2020-06" className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <input value={edu.location || ''} onChange={e => update(i, 'location', e.target.value)} placeholder="e.g. Cambridge, MA" className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...items, { institution: '', area: '', degree: '', date: '', location: '' }])} className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"><Plus size={14} /> Add education</button>
    </div>
  );
}

export function SkillsEditor({ items, onChange }: { items: Skill[]; onChange: (v: Skill[]) => void }) {
  const update = (i: number, field: string, value: any) => {
    const n = [...items];
    (n[i] as any)[field] = value;
    onChange(n);
  };
  return (
    <div className="space-y-3">
      {items.map((sk, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">{sk.label || `Skill ${i + 1}`}</span>
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
            <input value={sk.label} onChange={e => update(i, 'label', e.target.value)} placeholder="e.g. Web Development" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Skills</label>
            <textarea value={sk.details} onChange={e => update(i, 'details', e.target.value)} placeholder="e.g. React, Node.js, TypeScript" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 min-h-[40px] resize-y" />
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...items, { label: '', details: '' }])} className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"><Plus size={14} /> Add skill</button>
    </div>
  );
}

export function ActivitiesEditor({ items, onChange }: { items: Activity[]; onChange: (v: Activity[]) => void }) {
  const update = (i: number, field: string, value: any) => {
    const n = [...items];
    (n[i] as any)[field] = value;
    onChange(n);
  };
  const addHighlight = (i: number) => {
    const n = [...items];
    n[i].highlights.push('');
    onChange(n);
  };
  return (
    <div className="space-y-3">
      {items.map((act, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">{act.name || `Activity ${i + 1}`}</span>
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Activity Name</label>
              <input value={act.name} onChange={e => update(i, 'name', e.target.value)} placeholder="e.g. Volunteer Work" className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
              <input value={act.date || ''} onChange={e => update(i, 'date', e.target.value)} placeholder="e.g. 2022" className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-600">Details</span>
            {act.highlights.map((h, hi) => (
              <div key={hi} className="flex gap-1">
                <input value={h} onChange={e => { const n = [...items]; n[i].highlights[hi] = e.target.value; onChange(n); }} placeholder="e.g. Organized event" className="flex-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
              </div>
            ))}
            <button onClick={() => addHighlight(i)} className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700"><Plus size={12} /> Add detail</button>
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...items, { name: '', date: '', highlights: [''] }])} className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"><Plus size={14} /> Add activity</button>
    </div>
  );
}

export function HobbiesEditor({ items, onChange }: { items: { bullet: string }[]; onChange: (v: { bullet: string }[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((h, i) => (
        <div key={i} className="flex gap-1 items-start">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Hobby / Interest</label>
            <textarea value={h.bullet} onChange={e => { const n = [...items]; n[i].bullet = e.target.value; onChange(n); }} placeholder="e.g. Playing guitar" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 min-h-[36px] resize-y" />
          </div>
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-1 mt-5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={() => onChange([...items, { bullet: '' }])} className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"><Plus size={14} /> Add hobby</button>
    </div>
  );
}

export function SocialEditor({ items, onChange }: { items: SocialNetwork[]; onChange: (v: SocialNetwork[]) => void }) {
  const update = (i: number, field: string, value: any) => {
    const n = [...items];
    (n[i] as any)[field] = value;
    onChange(n);
  };
  return (
    <div className="space-y-2">
      {items.map((sn, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Network</label>
              <input value={sn.network} onChange={e => update(i, 'network', e.target.value)} placeholder="e.g. LinkedIn" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
              <input value={sn.username} onChange={e => update(i, 'username', e.target.value)} placeholder="e.g. johndoe" className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-1 mt-4 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={() => onChange([...items, { network: '', username: '' }])} className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"><Plus size={14} /> Add social network</button>
    </div>
  );
}
