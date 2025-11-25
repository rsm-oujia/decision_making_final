import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Badge } from './components/ui/badge';
import { Switch } from './components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

/**
 * Influence Playbook – Make It Your Own (Interactive Webpage)
 *
 * 这一版不再依赖 lucide-react / framer-motion，只用你手写的轻量 UI 组件。
 */

// --- Content Data -----------------------------------------------------------

type Tactic = {
  id: string;
  group:
    | 'Persuasion'
    | 'Negotiation'
    | 'Structure'
    | 'Meta-Tools'
    | 'Case: LBJ'
    | 'Modern Org';
  title: string;
  summary: string;
  prompts: string[];
};

const TACTICS: Tactic[] = [
  // Persuasion (Ethos, Logos, Pathos)
  {
    id: 'ethos',
    group: 'Persuasion',
    title: 'Ethos – Build Credibility',
    summary:
      'Signal character, fairness, and alignment with the audience before making asks.',
    prompts: [
      'What signals prove reliability?',
      'Where can I show skin-in-the-game?',
    ],
  },
  {
    id: 'logos',
    group: 'Persuasion',
    title: 'Logos – Clarify the Logic',
    summary:
      'Make the reasoning easy to follow with crisp claims, evidence, and warrants.',
    prompts: [
      'What is the one-sentence thesis?',
      'What evidence closes the gap?',
    ],
  },
  {
    id: 'pathos',
    group: 'Persuasion',
    title: 'Pathos – Aim for the Heart',
    summary:
      'Use story, analogy, and concrete images to create emotional resonance.',
    prompts: ['Which story earns attention?', 'How will they feel afterwards?'],
  },

  // Negotiation (Allocentrism, Exchange, Might)
  {
    id: 'allocentrism',
    group: 'Negotiation',
    title: 'Allocentrism – See from Their Side',
    summary:
      'Practice perspective-taking to predict moves, reduce friction, and design win–wins.',
    prompts: [
      'What do they need most?',
      'If I were them, what would I do next?',
    ],
  },
  {
    id: 'exchange',
    group: 'Negotiation',
    title: 'Exchange – Quid Pro Quo (and Beyond)',
    summary:
      'Offer fair trades; when possible, show magnanimity to compound goodwill.',
    prompts: [
      'What can I give first?',
      'Where can I be strategically generous?',
    ],
  },
  {
    id: 'might',
    group: 'Negotiation',
    title: 'Might – Use Authority Sparingly',
    summary:
      'Address tough issues and set boundaries, but follow with repair and dignity.',
    prompts: [
      'What boundary must be explicit?',
      'How will I repair after firmness?',
    ],
  },

  // Structure (Networks, Coalitions, Team-building)
  {
    id: 'networks',
    group: 'Structure',
    title: 'Networks – Widen the Periphery',
    summary:
      'Cultivate diverse ties to increase information flow and option value.',
    prompts: [
      'Who sits at the edge of my map?',
      'Which 2 new weak ties this week?',
    ],
  },
  {
    id: 'coalitions',
    group: 'Structure',
    title: 'Coalitions – Add Complementarity',
    summary:
      'Assemble allies with different strengths; align on shared outcomes over ego.',
    prompts: [
      'Which rival could be an ally?',
      'What is the smallest shared win?',
    ],
  },
  {
    id: 'team',
    group: 'Structure',
    title: 'Team-Building – Hold It Together',
    summary:
      'Create cohesion via clear roles, frequent small fairness signals, and conflict hygiene.',
    prompts: ['What ritual reinforces unity?', 'Where is jealousy building?'],
  },

  // Meta-Tools (Intentionality, Situation Awareness, Agency)
  {
    id: 'intentionality',
    group: 'Meta-Tools',
    title: 'Intentionality – One Paramount Objective',
    summary:
      'Name the north star; say ‘no’ to distractions that don’t serve it.',
    prompts: ['What is the non-negotiable?', 'Which task will I drop today?'],
  },
  {
    id: 'situation',
    group: 'Meta-Tools',
    title: 'Situation Awareness – Time the Move',
    summary: 'Sense constraints and readiness; wait for propitious moments.',
    prompts: ['Is sentiment ready yet?', 'What signal am I waiting for?'],
  },
  {
    id: 'agency',
    group: 'Meta-Tools',
    title: 'Agency – Shape the Game',
    summary:
      'Redesign rules, processes, or environment so good choices become easy.',
    prompts: ['What rule can I rewrite?', 'Which default can be improved?'],
  },

  // Case: LBJ levers (Little Congress)
  {
    id: 'lbj_publicity',
    group: 'Case: LBJ',
    title: 'Publicity Machine',
    summary:
      'Turn routine forums into stages; invite press, create cadence, and spotlight others.',
    prompts: [
      'Which recurring forum can I energize?',
      'Who gets the spotlight next?',
    ],
  },
  {
    id: 'lbj_agenda',
    group: 'Case: LBJ',
    title: 'Agenda & Procedure Control',
    summary: 'Engineer agendas, timing, and voting rules to channel momentum.',
    prompts: [
      'What decision rule helps progress?',
      'How do we minimize last-minute churn?',
    ],
  },
  {
    id: 'lbj_patronage',
    group: 'Case: LBJ',
    title: 'Patronage & Placement',
    summary:
      'Place people in visible roles and exchange access for contribution.',
    prompts: ['Who deserves a platform?', 'What’s the fair, public criterion?'],
  },

  // Modern org levers (promotion/impact)
  {
    id: 'modern_psych_safety',
    group: 'Modern Org',
    title: 'Psychological Safety',
    summary:
      'Create norms where candor is safe and error-sharing speeds learning.',
    prompts: [
      'What behavior earns thanks today?',
      'How do we react to bad news?',
    ],
  },
  {
    id: 'modern_peer_influence',
    group: 'Modern Org',
    title: 'Peer Influence > Title',
    summary:
      'Lead without authority by enabling others, removing friction, and clarifying context.',
    prompts: [
      'Which cross-team do I enable?',
      'What friction can I remove now?',
    ],
  },
  {
    id: 'modern_managing_up',
    group: 'Modern Org',
    title: 'Managing Up with Clarity',
    summary:
      'Offer crisp updates, options with trade-offs, and pre-empt stakeholder concerns.',
    prompts: [
      'What are the 2 options + risks?',
      'Whose constraint matters most?',
    ],
  },
];

const PERSUASION_PRINCIPLES = [
  { key: 'reciprocity', label: 'Reciprocity' },
  { key: 'commitment', label: 'Commitment & Consistency' },
  { key: 'socialproof', label: 'Social Proof' },
  { key: 'authority', label: 'Authority' },
  { key: 'liking', label: 'Liking' },
  { key: 'scarcity', label: 'Scarcity' },
];

// Guides content from course decks
const HABITS = [
  {
    id: 'spots',
    title: 'Pick your spots',
    note: 'Situation awareness. Use multiple lenses; watch risk/uncertainty/importance; invest selectively.',
  },
  {
    id: 'alloc',
    title: 'Keep others’ interests in mind',
    note: 'Allocentrism + pathos; give others what they want so they can give you what you want.',
  },
  {
    id: 'tradeoffs',
    title: 'Be fixed on goals, flexible on methods',
    note: 'Intentionality; trade-offs are proof you are working toward a goal.',
  },
  {
    id: 'cultivate',
    title: 'Cultivate relationships before they’re needed',
    note: 'Network intentionally; make it feel organic and generous.',
  },
  {
    id: 'premeet',
    title: 'Have the meeting before the meeting',
    note: 'Coalitions; take temperatures, gather info, lay groundwork.',
  },
  {
    id: 'agency',
    title: 'Don’t accept circumstances as given',
    note: 'Agency; shape the situation—the #1 empirical lever.',
  },
  {
    id: 'see_two_ways',
    title: 'See the world as it is AND how you want it to be',
    note: 'Blend realism with ambition to inspire smart action.',
  },
];

const TIT_FOR_TAT = {
  principles: [
    { k: 'nice', text: 'Nice – Avoid unnecessary conflict.' },
    {
      k: 'provocable',
      text: 'Provocable – Set boundaries and respond to defection.',
    },
    {
      k: 'forgiving',
      text: 'Forgiving – Return to cooperation when other party does.',
    },
    { k: 'clear', text: 'Clear – Be predictable / procedurally fair.' },
  ],
  sliderTip: 'Use the minimum Might necessary—think slider, not switch.',
};

const STYLE_CARDS = [
  {
    style: 'Buddy (Soft)',
    lack: 'Tin Man / Lion / Scarecrow complements',
    advice:
      'Lean into allocentrism, networks, coalitions; practice conflict tolerance and analysis reps.',
  },
  {
    style: 'Analyst (Smart)',
    lack: 'Lion complement',
    advice:
      'Great timing and framing—now add decisive boundary-setting and visible follow-through.',
  },
  {
    style: 'Hammer (Hard)',
    lack: 'Tin Man / Scarecrow complements',
    advice:
      'Pair firmness with repair signals; add stories and coalition pre-work.',
  },
];

const STICKY_TRAITS = [
  'Simple',
  'Unexpected',
  'Concrete',
  'Credible',
  'Emotional',
  'Stories',
];

// --- Helpers ---------------------------------------------------------------

const LS_KEY = 'influence_playbook_v1';

type PlayItem = {
  tacticId: string;
  note: string;
  principleKeys: string[]; // optional Cialdini combos
  priority: number; // 1-5
  done?: boolean;
};

type PlaybookState = {
  name: string;
  items: PlayItem[];
  checklist: string[]; // daily checklist
};

function loadState(): PlaybookState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { name: 'My Playbook', items: [], checklist: [] };
    return JSON.parse(raw);
  } catch {
    return { name: 'My Playbook', items: [], checklist: [] };
  }
}

function saveState(st: PlaybookState) {
  localStorage.setItem(LS_KEY, JSON.stringify(st));
}

// --- Components ------------------------------------------------------------

const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}> = ({ title, subtitle, right }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4">
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
    {right}
  </div>
);

const TacticCard: React.FC<{
  t: Tactic;
  onAdd: (id: string) => void;
  selected?: boolean;
}> = ({ t, onAdd, selected }) => (
  <div className={`h-full ${selected ? 'ring-2 ring-primary' : ''}`}>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t.title}
          {/* 简化版 Badge，不用 variant */}
          <Badge>{t.group}</Badge>
        </CardTitle>
        <CardDescription>{t.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {t.prompts.map((p, i) => (
            <div key={i} className="text-sm p-2 rounded-lg bg-muted">
              {p}
            </div>
          ))}
        </div>
        <Button className="w-full" onClick={() => onAdd(t.id)}>
          {/* 不用图标，直接文字 */}+ Add to My Playbook
        </Button>
      </CardContent>
    </Card>
  </div>
);

const ItemRow: React.FC<{
  item: PlayItem;
  onChange: (it: PlayItem) => void;
  onRemove: () => void;
}> = ({ item, onChange, onRemove }) => {
  const tactic = TACTICS.find((t) => t.id === item.tacticId)!;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          {/* 简单星标 */}
          <span>★</span>
          {tactic.title}
          <Badge>{tactic.group}</Badge>
        </CardTitle>
        <CardDescription>{tactic.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-muted-foreground">Priority</label>
          <Input
            type="number"
            min={1}
            max={5}
            value={item.priority}
            onChange={(e) =>
              onChange({
                ...item,
                priority: Math.max(1, Math.min(5, Number(e.target.value || 1))),
              })
            }
            className="w-20"
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={!!item.done}
              onCheckedChange={(v) => onChange({ ...item, done: v })}
            />
            <span className="text-sm">Mark as done</span>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            How I will apply it
          </label>
          <Textarea
            placeholder="Write a concrete move, metric, or ritual."
            value={item.note}
            onChange={(e) => onChange({ ...item, note: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Pair with persuasion principles:
          </p>
          <div className="flex flex-wrap gap-2">
            {PERSUASION_PRINCIPLES.map((pp) => {
              const checked = item.principleKeys.includes(pp.key);
              return (
                <Button
                  key={pp.key}
                  variant={checked ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => {
                    const set = new Set(item.principleKeys);
                    if (set.has(pp.key)) set.delete(pp.key);
                    else set.add(pp.key);
                    onChange({ ...item, principleKeys: Array.from(set) });
                  }}
                >
                  {pp.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="destructive" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Quiz: React.FC = () => {
  const questions = [
    {
      q: 'Which lever best increases information flow and early warnings?',
      options: ['Ethos', 'Networks', 'Might', 'Scarcity'],
      a: 1,
      why: 'Diverse networks amplify weak signals and options before others see them.',
    },
    {
      q: 'You have logic but no traction. What should you try first?',
      options: [
        'Double the deck length',
        'Add a vivid user story (Pathos)',
        'Escalate authority (Might)',
        'Avoid Q&A',
      ],
      a: 1,
      why: 'Emotional salience (Pathos) often opens the high-road to reason.',
    },
    {
      q: 'After a hard no, you still need the relationship. What follows Might?',
      options: [
        'Silence',
        'Public blame',
        'Repair gesture / fairness signal',
        'New rules immediately',
      ],
      a: 2,
      why: 'Follow firmness with repair to preserve long-term cooperation.',
    },
  ];
  const [ix, setIx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const current = questions[ix];

  function submit() {
    if (choice === null) return;
    if (choice === current.a) setScore((s) => s + 1);
    setIx((i) => Math.min(i + 1, questions.length));
    setChoice(null);
  }

  if (ix >= questions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Complete</CardTitle>
          <CardDescription>
            Your score: {score} / {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              setIx(0);
              setScore(0);
            }}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Micro-Quiz</CardTitle>
        <CardDescription>{current.q}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {current.options.map((op, i) => (
            <Button
              key={i}
              variant={choice === i ? 'default' : 'secondary'}
              onClick={() => setChoice(i)}
            >
              {op}
            </Button>
          ))}
        </div>
        {choice !== null && (
          <p className="text-sm text-muted-foreground">
            {choice === current.a ? '✅ Correct.' : `Not quite. ${current.why}`}
          </p>
        )}
        <div className="flex justify-end">
          <Button onClick={submit}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Main App --------------------------------------------------------------

export default function App() {
  const [state, setState] = useState<PlaybookState>({
    name: 'My Playbook',
    items: [],
    checklist: [],
  });
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('browse'); // 适配你的轻量 Tabs 组件

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const filtered = useMemo(
    () =>
      TACTICS.filter((t) => {
        const q = search.toLowerCase();
        return [t.title, t.summary, t.group].some((x) =>
          x.toLowerCase().includes(q)
        );
      }),
    [search]
  );

  function addTactic(id: string) {
    if (state.items.some((it) => it.tacticId === id)) return;
    setState((s) => ({
      ...s,
      items: [
        ...s.items,
        { tacticId: id, note: '', principleKeys: [], priority: 3 },
      ],
    }));
  }

  function updateItem(idx: number, it: PlayItem) {
    const items = [...state.items];
    items[idx] = it;
    setState({ ...state, items });
  }

  function removeItem(idx: number) {
    setState({
      ...state,
      items: state.items.filter((_, i) => i !== idx),
    });
  }

  function addChecklist(text: string) {
    if (!text.trim()) return;
    setState({ ...state, checklist: [...state.checklist, text.trim()] });
  }

  function removeChecklist(i: number) {
    setState({
      ...state,
      checklist: state.checklist.filter((_, ix) => ix !== i),
    });
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const doneCount = state.items.filter((i) => i.done).length;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div>
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Influence Playbook -- Owen's Decision Making Final Website
              </h1>
              <p className="text-muted-foreground mt-2">
                Make it yours. Pick the levers, write the moves, and practice
                daily.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                className="w-40 md:w-56"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
              <Button onClick={exportJSON}>Export JSON</Button>
            </div>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger
              value="browse"
              current={tab}
              onClick={() => setTab('browse')}
            >
              1. Browse Levers
            </TabsTrigger>
            <TabsTrigger
              value="builder"
              current={tab}
              onClick={() => setTab('builder')}
            >
              2. Build Playbook
            </TabsTrigger>
            <TabsTrigger
              value="practice"
              current={tab}
              onClick={() => setTab('practice')}
            >
              3. Practice
            </TabsTrigger>
            <TabsTrigger
              value="guides"
              current={tab}
              onClick={() => setTab('guides')}
            >
              4. Guides
            </TabsTrigger>
            <TabsTrigger
              value="quiz"
              current={tab}
              onClick={() => setTab('quiz')}
            >
              5. Quiz
            </TabsTrigger>
            <TabsTrigger
              value="refs"
              current={tab}
              onClick={() => setTab('refs')}
            >
              6. References
            </TabsTrigger>
          </TabsList>

          {/* Browse */}
          <TabsContent value="browse" current={tab}>
            <div className="space-y-6">
              <SectionHeader
                title="Browse Levers"
                subtitle="Filter by keyword, then add cards to your playbook."
                right={
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((t) => (
                  <TacticCard
                    key={t.id}
                    t={t}
                    onAdd={addTactic}
                    selected={state.items.some((i) => i.tacticId === t.id)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Builder */}
          <TabsContent value="builder" current={tab}>
            <div className="space-y-6">
              <SectionHeader
                title="Build Your Playbook"
                subtitle={`Prioritize, pair with persuasion principles, and define concrete moves. (${doneCount}/${state.items.length} done)`}
              />
              {state.items.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No items yet</CardTitle>
                    <CardDescription>
                      Go to “Browse Levers” and add a few tactics to get
                      started.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <div className="space-y-4">
                  {state.items.map((it, idx) => (
                    <ItemRow
                      key={it.tacticId}
                      item={it}
                      onChange={(v) => updateItem(idx, v)}
                      onRemove={() => removeItem(idx)}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Practice */}
          <TabsContent value="practice" current={tab}>
            <div className="space-y-6">
              <SectionHeader
                title="Daily Practice"
                subtitle="Turn intention into behavior with a light checklist."
              />

              <Card>
                <CardHeader>
                  <CardTitle>Add Daily Checklist Items</CardTitle>
                  <CardDescription>
                    Small, concrete, observable actions win. Aim for 3–5.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AddChecklist onAdd={addChecklist} />
                  <div className="space-y-2">
                    {state.checklist.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Example ideas: “Open with a story (Pathos)”, “Invite a
                        dissenting view”, “Thank the messenger of bad news”.
                      </p>
                    )}
                    {state.checklist.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted"
                      >
                        <span className="text-sm">{c}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeChecklist(i)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Persuasion Principles Quick-Toggle</CardTitle>
                  <CardDescription>
                    Pick 1–2 principles to emphasize this week.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {PERSUASION_PRINCIPLES.map((p) => (
                      <Badge key={p.key} className="px-3 py-1 text-sm">
                        {p.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Guides */}
          <TabsContent value="guides" current={tab}>
            <div className="space-y-6">
              <SectionHeader
                title="Guides from Class Decks"
                subtitle="Seven Habits · Tit-for-Tat · Styles · Made-to-Stick"
              />

              <Card>
                <CardHeader>
                  <CardTitle>Seven Habits of the Influential</CardTitle>
                  <CardDescription>
                    Use these as anchor behaviors for your checklist.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {HABITS.map((h) => (
                    <div key={h.id} className="p-3 rounded-lg bg-muted">
                      <div className="font-medium">{h.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {h.note}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tit-for-Tat (Repeated Games)</CardTitle>
                  <CardDescription>
                    Initial cooperation, reciprocate, retaliate after defection,
                    then return to cooperation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {TIT_FOR_TAT.principles.map((p) => (
                      <div key={p.k} className="p-2 rounded bg-muted text-sm">
                        {p.text}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tip: {TIT_FOR_TAT.sliderTip}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Influence Styles</CardTitle>
                  <CardDescription>
                    Soft / Smart / Hard are equally capable; develop your
                    complements.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {STYLE_CARDS.map((s) => (
                    <div key={s.style} className="p-3 rounded-lg bg-muted">
                      <div className="font-medium">{s.style}</div>
                      <div className="text-sm">Missing piece: {s.lack}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {s.advice}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Made-to-Stick Checklist</CardTitle>
                  <CardDescription>
                    When crafting messages, hit 1–3 of these traits.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {STICKY_TRAITS.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* References */}
          <TabsContent value="refs" current={tab}>
            <div className="space-y-6">
              <SectionHeader
                title="References"
                subtitle="Key ideas summarized from class decks and readings."
              />
              <Card>
                <CardHeader>
                  <CardTitle>Course Decks & Readings</CardTitle>
                  <CardDescription>
                    This project synthesizes concepts like Seven Habits,
                    Tit-for-Tat, Soft/Smart/Hard styles, and Made-to-Stick
                    messaging, plus Cialdini’s six principles.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Post-Leverage Inventory & Closing Thoughts</li>
                    <li>
                      Class 9: Influence & Leverage Inventory (styles, factors,
                      behaviors)
                    </li>
                    <li>
                      Class 8: Persuasion (Made-to-Stick, Cialdini, Curse of
                      Knowledge)
                    </li>
                    <li>
                      Lincoln & LBJ cases for examples of tactics in practice
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quiz */}
          <TabsContent value="quiz" current={tab}>
            <SectionHeader
              title="Check Your Intuition"
              subtitle="3 quick questions to reinforce concepts."
            />
            <Quiz />
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <p>
            Built for the “Make It Your Own” project. Your data is stored
            locally in your browser.
          </p>
        </footer>
      </div>
    </div>
  );
}

const AddChecklist: React.FC<{ onAdd: (text: string) => void }> = ({
  onAdd,
}) => {
  const [v, setV] = useState('');
  return (
    <div className="flex gap-2">
      <Input
        placeholder="e.g., Ask one person for a dissenting view"
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
      <Button
        onClick={() => {
          onAdd(v);
          setV('');
        }}
      >
        + Add
      </Button>
    </div>
  );
};
