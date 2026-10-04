"use client";

import { useId, useMemo, useState } from "react";
import { curriculum, SHARED_SUBJECTS } from "@/lib/calculator/curriculum";
import {
  calculateFinal,
  calculateFullCalc,
  calculateShared,
  calculateSpecialty,
  getPercentageLabel,
} from "@/lib/calculator/calculations";
import type { Grade, StageData, Subject } from "@/lib/calculator/types";
import { cn } from "@/lib/utils";

const GRADES: { g: Grade; label: string }[] = [
  { g: "U", label: "U" },
  { g: "P", label: "P" },
  { g: "M", label: "M" },
  { g: "D", label: "D" },
];

type Mode = "single" | "full";
type Sel = { stageId: string; specId: string; subId: string };

const stageOf = (id: string): StageData => curriculum.find((s) => s.id === id)!;

function resolveSubjects(sel: Sel): { subjects: Subject[]; specName: string } {
  const spec = stageOf(sel.stageId).specializations.find((s) => s.id === sel.specId);
  if (!spec) return { subjects: [], specName: "" };
  if (spec.subSpecs?.length) {
    const sub = spec.subSpecs.find((s) => s.id === sel.subId);
    return { subjects: sub?.subjects ?? [], specName: sub ? `${spec.name} — ${sub.name}` : spec.name };
  }
  return { subjects: spec.subjects, specName: spec.name };
}

const fmt = (n: number) => n.toFixed(2);

function SpecSelector({ stageId, value, onChange, idPrefix }: { stageId: string; value: Sel; onChange: (s: Sel) => void; idPrefix: string }) {
  const stage = stageOf(stageId);
  const spec = stage.specializations.find((s) => s.id === value.specId);
  const field = "mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-base min-h-[44px]";
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`${idPrefix}-spec`} className="text-sm font-semibold">
          التخصص
        </label>
        <select
          id={`${idPrefix}-spec`}
          className={field}
          value={value.specId}
          onChange={(e) => onChange({ stageId, specId: e.target.value, subId: "" })}
        >
          <option value="">اختر التخصص…</option>
          {stage.specializations.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      {spec?.subSpecs?.length ? (
        <div>
          <label htmlFor={`${idPrefix}-sub`} className="text-sm font-semibold">
            الفرع
          </label>
          <select id={`${idPrefix}-sub`} className={field} value={value.subId} onChange={(e) => onChange({ ...value, subId: e.target.value })}>
            <option value="">اختر الفرع…</option>
            {spec.subSpecs.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
}

function GradeRows({ scope, subjects, grades, setGrade }: { scope: string; subjects: Subject[]; grades: Record<string, Grade | null>; setGrade: (key: string, g: Grade) => void }) {
  if (!subjects.length) return null;
  return (
    <ul className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white">
      {subjects.map((s) => {
        const key = `${scope}:${s.name}`;
        return (
          <li key={key} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-muted">{s.hours} ساعة معتمدة</p>
            </div>
            <fieldset>
              <legend className="sr-only">نتيجة {s.name}</legend>
              <div className="flex gap-2" role="radiogroup">
                {GRADES.map(({ g, label }) => {
                  const active = grades[key] === g;
                  return (
                    <label
                      key={g}
                      className={cn(
                        "flex h-11 w-12 cursor-pointer items-center justify-center rounded-xl border text-sm font-bold transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-gold",
                        active ? "border-navy bg-navy text-ivory" : "border-line bg-white hover:border-navy",
                      )}
                    >
                      <input type="radio" name={key} value={g} checked={active} onChange={() => setGrade(key, g)} className="sr-only" />
                      {label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        );
      })}
    </ul>
  );
}

function SharedInputs({ marks, setMarks }: { marks: Record<string, string>; setMarks: (m: Record<string, string>) => void }) {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {SHARED_SUBJECTS.map((s) => {
        const raw = marks[s.id] ?? "";
        const invalid = raw !== "" && (Number.isNaN(Number(raw)) || Number(raw) < 0 || Number(raw) > s.maxMark);
        return (
          <div key={s.id}>
            <label htmlFor={`shared-${s.id}`} className="text-sm font-semibold">
              {s.name} <span className="font-normal text-muted">(من {s.maxMark})</span>
            </label>
            <input
              id={`shared-${s.id}`}
              inputMode="decimal"
              type="number"
              min={0}
              max={s.maxMark}
              value={raw}
              onChange={(e) => setMarks({ ...marks, [s.id]: e.target.value })}
              aria-invalid={invalid}
              className={cn("mt-1 w-full rounded-xl border bg-white px-4 py-3 text-base min-h-[44px]", invalid ? "border-red-500" : "border-line")}
            />
            {invalid && <p className="mt-1 text-sm text-red-700">أدخل علامة بين 0 و{s.maxMark}.</p>}
          </div>
        );
      })}
    </div>
  );
}

function sharedValid(marks: Record<string, string>) {
  return SHARED_SUBJECTS.every((s) => {
    const v = marks[s.id];
    return v !== undefined && v !== "" && !Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= s.maxMark;
  });
}

function ResultCard({ title, rows, final }: { title: string; rows: [string, string][]; final: { label: string; value: string; pct: number } }) {
  const tone = getPercentageLabel(final.pct);
  return (
    <section aria-live="polite" className="mt-8 rounded-2xl border border-navy bg-navy p-6 text-ivory">
      <h3 className="text-lg font-semibold">{title}</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 border-b border-ivory/15 pb-2">
            <dt className="text-ivory/75">{k}</dt>
            <dd className="font-semibold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-sm text-ivory/75">{final.label}</p>
      <p className="text-4xl font-bold tabular-nums">{final.value}</p>
      <p className="mt-1 text-sm text-gold">
        {fmt(final.pct)}% — {tone.label}
      </p>
    </section>
  );
}

export function Calculator() {
  const uid = useId();
  const [mode, setMode] = useState<Mode>("single");
  const [stageId, setStageId] = useState("tawjihi");
  const [sel, setSel] = useState<Sel>({ stageId: "tawjihi", specId: "", subId: "" });
  const [selFirst, setSelFirst] = useState<Sel>({ stageId: "first", specId: "", subId: "" });
  const [selTaw, setSelTaw] = useState<Sel>({ stageId: "tawjihi", specId: "", subId: "" });
  const [grades, setGrades] = useState<Record<string, Grade | null>>({});
  const [withShared, setWithShared] = useState(false);
  const [marks, setMarks] = useState<Record<string, string>>({});

  const setGrade = (key: string, g: Grade) => setGrades((prev) => ({ ...prev, [key]: g }));

  const single = useMemo(() => resolveSubjects(sel), [sel]);
  const first = useMemo(() => resolveSubjects(selFirst), [selFirst]);
  const taw = useMemo(() => resolveSubjects(selTaw), [selTaw]);

  const complete = (scope: string, subjects: Subject[]) => subjects.length > 0 && subjects.every((s) => grades[`${scope}:${s.name}`]);
  const gradeMap = (scope: string, subjects: Subject[]) => Object.fromEntries(subjects.map((s) => [s.name, grades[`${scope}:${s.name}`] ?? null]));

  const sharedFor = () =>
    calculateShared({ arabic: marks.arabic ?? "", english: marks.english ?? "", islamic: marks.islamic ?? "", history: marks.history ?? "" });

  let result: React.ReactNode = null;
  if (mode === "single" && complete("single", single.subjects)) {
    const spec = calculateSpecialty(single.subjects, gradeMap("single", single.subjects), "", single.specName);
    if (withShared && sharedValid(marks)) {
      const sh = sharedFor();
      const fin = calculateFinal(spec, sh, true, "", single.specName);
      result = (
        <ResultCard
          title={`${single.specName}: التخصص مع المواد المشتركة`}
          rows={[
            ["معدل التخصص من 100", fmt(spec.average100)],
            ["معدل التخصص من 35", fmt(spec.average35)],
            ["المواد المشتركة من 30", fmt(sh.total30)],
          ]}
          final={{ label: "المجموع من 65", value: fmt(fin.finalGrade), pct: fin.finalPercentage }}
        />
      );
    } else if (!withShared) {
      result = (
        <ResultCard
          title={`${single.specName}: معدل التخصص`}
          rows={[
            ["مجموع النقاط", fmt(spec.totalPoints)],
            ["مجموع الساعات", String(spec.totalHours)],
            ["معدل التخصص من 100", fmt(spec.average100)],
          ]}
          final={{ label: "المعدل من 35", value: fmt(spec.average35), pct: spec.average100 }}
        />
      );
    }
  }
  if (mode === "full" && complete("first", first.subjects) && complete("taw", taw.subjects) && sharedValid(marks)) {
    const a = calculateSpecialty(first.subjects, gradeMap("first", first.subjects), "", first.specName);
    const b = calculateSpecialty(taw.subjects, gradeMap("taw", taw.subjects), "", taw.specName);
    const sh = sharedFor();
    const full = calculateFullCalc(a, first.specName, b, taw.specName, sh);
    result = (
      <ResultCard
        title="المعدل الكامل"
        rows={[
          [`الأول ثانوي — ${first.specName} (من 35)`, fmt(a.average35)],
          [`التوجيهي — ${taw.specName} (من 35)`, fmt(b.average35)],
          ["المواد المشتركة (من 30)", fmt(sh.total30)],
        ]}
        final={{ label: "المعدل الكامل من 100", value: fmt(full.finalGrade), pct: full.finalPercentage }}
      />
    );
  }

  const tab = (m: Mode, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === m}
      onClick={() => setMode(m)}
      className={cn("min-h-[44px] flex-1 rounded-full px-5 py-2 text-sm font-semibold transition-colors", mode === m ? "bg-navy text-ivory" : "text-ink hover:bg-navy/5")}
    >
      {label}
    </button>
  );

  return (
    <div id={uid} className="rounded-3xl border border-line bg-ivory/60 p-5 sm:p-8">
      <div role="tablist" aria-label="نوع الحساب" className="flex gap-2 rounded-full border border-line bg-white p-1">
        {tab("single", "معدل تخصص واحد")}
        {tab("full", "المعدل الكامل (من 100)")}
      </div>

      {mode === "single" ? (
        <div className="mt-6">
          <fieldset>
            <legend className="text-sm font-semibold">المرحلة</legend>
            <div className="mt-2 flex gap-2">
              {curriculum.map((s) => (
                <label
                  key={s.id}
                  className={cn(
                    "flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-semibold focus-within:outline focus-within:outline-2 focus-within:outline-gold",
                    stageId === s.id ? "border-navy bg-navy text-ivory" : "border-line bg-white hover:border-navy",
                  )}
                >
                  <input
                    type="radio"
                    name="stage"
                    className="sr-only"
                    checked={stageId === s.id}
                    onChange={() => {
                      setStageId(s.id);
                      setSel({ stageId: s.id, specId: "", subId: "" });
                    }}
                  />
                  {s.name}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-5">
            <SpecSelector stageId={stageId} value={sel} onChange={setSel} idPrefix="single" />
          </div>
          <GradeRows scope="single" subjects={single.subjects} grades={grades} setGrade={setGrade} />
          <label className="mt-6 flex min-h-[44px] items-center gap-3 text-sm font-semibold">
            <input type="checkbox" checked={withShared} onChange={(e) => setWithShared(e.target.checked)} className="h-5 w-5 accent-[#0b1220]" />
            أضِف المواد المشتركة (العربية، الإنجليزية، التربية الإسلامية، تاريخ الأردن)
          </label>
          {withShared && <SharedInputs marks={marks} setMarks={setMarks} />}
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          <div>
            <h3 className="text-lg font-semibold">1) الأول ثانوي</h3>
            <div className="mt-3">
              <SpecSelector stageId="first" value={selFirst} onChange={setSelFirst} idPrefix="first" />
            </div>
            <GradeRows scope="first" subjects={first.subjects} grades={grades} setGrade={setGrade} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">2) التوجيهي</h3>
            <div className="mt-3">
              <SpecSelector stageId="tawjihi" value={selTaw} onChange={setSelTaw} idPrefix="taw" />
            </div>
            <GradeRows scope="taw" subjects={taw.subjects} grades={grades} setGrade={setGrade} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">3) المواد المشتركة</h3>
            <SharedInputs marks={marks} setMarks={setMarks} />
          </div>
        </div>
      )}

      {result ?? (
        <p className="mt-8 rounded-xl border border-dashed border-line bg-white p-4 text-sm text-muted" aria-live="polite">
          اختر التخصص وحدّد نتيجة كل مادة ليظهر المعدل هنا.
        </p>
      )}
    </div>
  );
}
