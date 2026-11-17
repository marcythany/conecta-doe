'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { helpAreas, type HelpArea } from '@/data/volunteers';

type RegistrationType = 'volunteer' | 'patient';
type Availability = 'weekdays' | 'evenings' | 'weekends' | 'flexible';
type FormState = {
  displayName: string;
  city: string;
  state: string;
  area: HelpArea | '';
  availability: Availability | '';
  summary: string;
  acknowledgesDemo: boolean;
};
type Field = keyof FormState;
type Errors = Partial<Record<Field, string>>;

const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
  'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
  'RR', 'SC', 'SP', 'SE', 'TO',
] as const;
const availabilities: Availability[] = ['weekdays', 'evenings', 'weekends', 'flexible'];
const initialState: FormState = {
  displayName: '', city: '', state: '', area: '', availability: '', summary: '', acknowledgesDemo: false,
};

export default function CommunityRegistrationForm({ type }: { type: RegistrationType }) {
  const t = useTranslations('registration');
  const areas = useTranslations('volunteers.areas');
  const reactId = useId().replace(/:/g, '');
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);
  useEffect(() => {
    if (Object.keys(errors).length > 0) errorRef.current?.focus();
  }, [errors]);

  function update<K extends Field>(field: K, value: FormState[K]) {
    setValues((old) => ({ ...old, [field]: value }));
    setErrors((old) => {
      if (!old[field]) return old;
      const next = { ...old };
      delete next[field];
      return next;
    });
  }

  function validate(): Errors {
    const result: Errors = {};
    if (values.displayName.trim().length < 2) result.displayName = t('errorName');
    if (values.city.trim().length < 2) result.city = t('errorCity');
    if (!states.some((state) => state === values.state)) result.state = t('errorRequired');
    if (!helpAreas.some((area) => area === values.area)) result.area = t('errorRequired');
    if (!availabilities.some((item) => item === values.availability)) result.availability = t('errorRequired');
    if (values.summary.trim().length < 20) result.summary = t('errorSummary');
    if (!values.acknowledgesDemo) result.acknowledgesDemo = t('errorAgree');
    return result;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    // A demonstração só exibe o que foi digitado em memória, nesta aba.
    // Nenhuma informação é enviada ou armazenada.
    setSubmitted(true);
  }

  const title = t(type === 'volunteer' ? 'volunteerTitle' : 'patientTitle');
  const description = t(type === 'volunteer' ? 'volunteerDescription' : 'patientDescription');
  const summaryLabel = t(type === 'volunteer' ? 'offerLabel' : 'needLabel');
  const summaryPlaceholder = t(type === 'volunteer' ? 'offerPlaceholder' : 'needPlaceholder');
  const exampleHint = t(type === 'volunteer' ? 'offerHint' : 'needHint');

  function errorId(field: Field) { return `${reactId}-${field}-error`; }
  function fieldId(field: Field) { return `${reactId}-${field}`; }
  const fieldClass = 'field w-full rounded-xl border border-[#B7CFCC] bg-white px-4 py-3 text-[#15324B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075B50]';

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl">
        <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="surface-card p-6 focus:outline-none sm:p-9">
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-[#DDF4E9] text-[#075B50]">
            <CheckCircle2 size={36} aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-black text-[#15324B]">{t('successTitle')}</h2>
          <p className="mt-3 font-medium leading-relaxed text-[#435969]">{t('successDescription')}</p>
          <p className="mt-4 rounded-xl border border-[#B9D9CB] bg-[#EBF8F1] p-4 text-sm font-bold text-[#075B50]">{t('notSaved')}</p>
          <div className="mt-6 rounded-2xl bg-[#F2F8F7] p-5">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-[#075B50]">{t('preview')}</p>
            <h3 className="text-xl font-extrabold text-[#15324B]">{values.displayName.trim()}</h3>
            <p className="mt-1 text-sm text-[#435969]">{values.city.trim()}, {values.state}</p>
            <dl className="mt-5 grid gap-4">
              <div><dt className="text-sm font-extrabold text-[#15324B]">{t('area')}</dt><dd>{values.area ? areas(values.area) : ''}</dd></div>
              <div><dt className="text-sm font-extrabold text-[#15324B]">{t('availability')}</dt><dd>{values.availability ? t(`availabilityOptions.${values.availability}`) : ''}</dd></div>
              <div><dt className="text-sm font-extrabold text-[#15324B]">{summaryLabel}</dt><dd className="whitespace-pre-wrap break-words">{values.summary.trim()}</dd></div>
            </dl>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => setSubmitted(false)} className="outline-btn">{t('edit')}</button>
            <button type="button" onClick={() => { setValues(initialState); setSubmitted(false); }} className="outline-btn">{t('newRegistration')}</button>
            <Link className="primary-btn" href="/voluntarios">{t('backToMatches')}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <Link href="/voluntarios" className="inline-flex items-center gap-2 text-sm font-bold text-[#075B50] hover:underline">
          <ArrowLeft size={17} aria-hidden="true" /> {t('backToMatches')}
        </Link>
      </div>
      <div className="surface-card overflow-hidden">
        <div className="bg-[#E4F4EC] p-6 sm:p-9">
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-white text-[#075B50]"><HeartHandshake size={27} aria-hidden="true" /></div>
          <p className="text-sm font-extrabold uppercase tracking-wider text-[#075B50]">{t('eyebrow')}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#15324B] sm:text-4xl">{title}</h1>
          <p className="mt-3 leading-relaxed text-[#40586A]">{description}</p>
        </div>
        <div className="p-6 sm:p-9">
          <div className="mb-7 flex items-start gap-3 rounded-xl border border-[#B6D6CC] bg-[#F0F8F5] p-4 text-sm leading-relaxed text-[#335869]">
            <ShieldCheck size={21} className="shrink-0 text-[#075B50]" aria-hidden="true" />
            <p>{t('safetyNotice')}</p>
          </div>
          {Object.keys(errors).length > 0 && (
            <div ref={errorRef} tabIndex={-1} role="alert" className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900 focus:outline focus:outline-2 focus:outline-red-600">
              <p className="font-extrabold">{t('errorTitle')}</p>
              <p>{t('errorDescription')}</p>
            </div>
          )}
          <form noValidate onSubmit={submit} className="grid gap-6">
            <div>
              <label htmlFor={fieldId('displayName')} className="mb-2 block font-bold text-[#15324B]">{t('displayName')} *</label>
              <input id={fieldId('displayName')} name="displayName" autoComplete="off" required maxLength={50} value={values.displayName} onChange={(event) => update('displayName', event.target.value)} aria-invalid={Boolean(errors.displayName)} aria-describedby={errors.displayName ? errorId('displayName') : undefined} className={fieldClass} placeholder={t('namePlaceholder')} />
              {errors.displayName && <p id={errorId('displayName')} className="mt-1 text-sm font-bold text-red-800">{errors.displayName}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-[1fr_130px]">
              <div>
                <label htmlFor={fieldId('city')} className="mb-2 block font-bold text-[#15324B]">{t('city')} *</label>
                <input id={fieldId('city')} name="city" required maxLength={60} value={values.city} onChange={(event) => update('city', event.target.value)} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? errorId('city') : undefined} className={fieldClass} placeholder={t('cityPlaceholder')} />
                {errors.city && <p id={errorId('city')} className="mt-1 text-sm font-bold text-red-800">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor={fieldId('state')} className="mb-2 block font-bold text-[#15324B]">{t('state')} *</label>
                <select id={fieldId('state')} name="state" required value={values.state} onChange={(event) => update('state', event.target.value)} aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? errorId('state') : undefined} className={fieldClass}>
                  <option value="">{t('choose')}</option>
                  {states.map((state) => <option value={state} key={state}>{state}</option>)}
                </select>
                {errors.state && <p id={errorId('state')} className="mt-1 text-sm font-bold text-red-800">{errors.state}</p>}
              </div>
            </div>
            <div>
              <label htmlFor={fieldId('area')} className="mb-2 block font-bold text-[#15324B]">{t('area')} *</label>
              <select id={fieldId('area')} name="area" required className={fieldClass} value={values.area} onChange={(event) => update('area', event.target.value as FormState['area'])} aria-invalid={Boolean(errors.area)} aria-describedby={errors.area ? errorId('area') : undefined}>
                <option value="">{t('choose')}</option>
                {helpAreas.map((area) => <option value={area} key={area}>{areas(area)}</option>)}
              </select>
              {errors.area && <p id={errorId('area')} className="mt-1 text-sm font-bold text-red-800">{errors.area}</p>}
            </div>
            <div>
              <label htmlFor={fieldId('availability')} className="mb-2 block font-bold text-[#15324B]">{t('availability')} *</label>
              <select id={fieldId('availability')} name="availability" required className={fieldClass} value={values.availability} onChange={(event) => update('availability', event.target.value as FormState['availability'])} aria-invalid={Boolean(errors.availability)} aria-describedby={errors.availability ? errorId('availability') : undefined}>
                <option value="">{t('choose')}</option>
                {availabilities.map((item) => <option value={item} key={item}>{t(`availabilityOptions.${item}`)}</option>)}
              </select>
              {errors.availability && <p id={errorId('availability')} className="mt-1 text-sm font-bold text-red-800">{errors.availability}</p>}
            </div>
            <div>
              <label htmlFor={fieldId('summary')} className="mb-2 block font-bold text-[#15324B]">{summaryLabel} *</label>
              <textarea id={fieldId('summary')} name="summary" required rows={5} maxLength={450} className={fieldClass} value={values.summary} onChange={(event) => update('summary', event.target.value)} aria-invalid={Boolean(errors.summary)} aria-describedby={`${fieldId('summary')}-hint${errors.summary ? ` ${errorId('summary')}` : ''}`} placeholder={summaryPlaceholder} />
              <p id={`${fieldId('summary')}-hint`} className="mt-2 flex justify-between gap-3 text-xs text-[#526674]"><span>{exampleHint}</span><span className="shrink-0 tabular-nums">{values.summary.length}/450</span></p>
              {errors.summary && <p id={errorId('summary')} className="mt-1 text-sm font-bold text-red-800">{errors.summary}</p>}
            </div>
            <div>
              <label className="flex items-start gap-3 rounded-xl bg-[#F2F8F7] p-4 leading-relaxed text-[#15324B]">
                <input type="checkbox" name="acknowledgesDemo" required className="mt-1 size-5 shrink-0 accent-[#075B50]" checked={values.acknowledgesDemo} onChange={(event) => update('acknowledgesDemo', event.target.checked)} aria-invalid={Boolean(errors.acknowledgesDemo)} aria-describedby={errors.acknowledgesDemo ? errorId('acknowledgesDemo') : undefined} />
                <span>{t('acknowledgement')} *</span>
              </label>
              {errors.acknowledgesDemo && <p id={errorId('acknowledgesDemo')} className="mt-1 text-sm font-bold text-red-800">{errors.acknowledgesDemo}</p>}
            </div>
            <p className="text-xs text-[#526674]">{t('required')}</p>
            <button type="submit" className="primary-btn w-full justify-center sm:w-auto">{t('previewButton')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
