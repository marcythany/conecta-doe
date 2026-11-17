'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Heart, MapPin, RotateCcw, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  helpAreas,
  helpRequests,
  volunteerProfiles,
  type CommunityProfile,
  type HelpArea,
  type MatchMode,
} from '@/data/volunteers';

type AreaFilter = HelpArea | 'all';
type Feedback = { profile: CommunityProfile; mode: MatchMode } | null;

const tones = {
  mint: 'from-[#CBF2E4] via-[#E7F8F1] to-[#BDE8DB]',
  blue: 'from-[#D5EBF7] via-[#EAF4F9] to-[#C6DBEF]',
  amber: 'from-[#FAE0B7] via-[#FFF3E3] to-[#F4DEBC]',
  lilac: 'from-[#E3DDF6] via-[#F5F0FA] to-[#D8E8F9]',
} as const;

export default function VolunteerMatcher() {
  const t = useTranslations('volunteers');
  const [mode, setMode] = useState<MatchMode>('offer');
  const [area, setArea] = useState<AreaFilter>('all');
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [connections, setConnections] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const announceRef = useRef<HTMLDivElement>(null);
  const all = mode === 'offer' ? helpRequests : volunteerProfiles;
  const filtered = all.filter((item) => area === 'all' || item.area === area);
  const current = filtered[index] ?? null;
  const hasNext = index + 1 < filtered.length;

  useEffect(() => {
    if (feedback) announceRef.current?.focus();
  }, [feedback]);

  function changeMode(next: MatchMode) {
    setMode(next);
    setArea('all');
    setIndex(0);
    setDragX(0);
    setFeedback(null);
    setConnections(0);
  }

  function changeArea(next: AreaFilter) {
    setArea(next);
    setIndex(0);
    setDragX(0);
    setFeedback(null);
    setConnections(0);
  }

  function decide(action: 'skip' | 'connect') {
    if (!current) return;
    setDragX(0);
    pointerStart.current = null;
    if (action === 'connect') {
      setFeedback({ profile: current, mode });
      setConnections((value) => value + 1);
    } else {
      setFeedback(null);
    }
    setIndex((value) => value + 1);
    // Permite continuar utilizando as setas sem perder o contexto do cartão.
    if (action === 'skip') requestAnimationFrame(() => cardRef.current?.focus());
  }

  function onPointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!pointerStart.current) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    // Evita interferir com a rolagem vertical no celular.
    if (Math.abs(dx) > Math.abs(dy)) setDragX(Math.max(-150, Math.min(150, dx)));
  }

  function onPointerUp(event: ReactPointerEvent<HTMLElement>) {
    if (!pointerStart.current) return;
    const dx = event.clientX - pointerStart.current.x;
    pointerStart.current = null;
    setDragX(0);
    if (dx > 90) decide('connect');
    if (dx < -90) decide('skip');
  }

  function onCardKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      decide('connect');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      decide('skip');
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto flex max-w-xl rounded-2xl bg-[#E7F0F5] p-1.5" role="group" aria-label={t('chooseMode')}>
        <button
          type="button"
          aria-pressed={mode === 'offer'}
          onClick={() => changeMode('offer')}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-extrabold transition sm:text-base ${mode === 'offer' ? 'bg-[#075B50] text-white shadow-md' : 'text-[#15324B] hover:bg-white/60'}`}
        >
          {t('offer')}
        </button>
        <button
          type="button"
          aria-pressed={mode === 'request'}
          onClick={() => changeMode('request')}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-extrabold transition sm:text-base ${mode === 'request' ? 'bg-[#075B50] text-white shadow-md' : 'text-[#15324B] hover:bg-white/60'}`}
        >
          {t('request')}
        </button>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-[#4C6170]">{t(mode === 'offer' ? 'offerHint' : 'requestHint')}</p>

      <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <label htmlFor="volunteer-area" className="block">
          <span className="field-label">{t('filter')}</span>
          <select
            id="volunteer-area"
            className="field"
            value={area}
            onChange={(event) => changeArea(event.target.value as AreaFilter)}
          >
            <option value="all">{t('allAreas')}</option>
            {helpAreas.map((key) => <option value={key} key={key}>{t(`areas.${key}`)}</option>)}
          </select>
        </label>
        <p className="pb-3 text-center text-sm font-semibold text-[#4C6170] sm:min-w-24" role="status">
          {t('cardCount', { count: filtered.length })}
        </p>
      </div>

      {feedback && (
        <div ref={announceRef} tabIndex={-1} role="status" aria-live="polite" className="mx-auto mt-6 max-w-xl rounded-2xl border border-[#9FD6C2] bg-[#E6F8EF] p-5 text-[#15324B] focus:outline-none">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#075B50] text-white"><Check size={22} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <h2 className="font-extrabold">{t('connectionTitle')}</h2>
              <p className="mt-1 text-sm leading-relaxed">{t('connectionMessage', { name: feedback.profile.name })}</p>
              <p className="mt-2 text-xs font-semibold">{t('connectionDisclaimer')}</p>
              <button type="button" className="mt-3 text-sm font-bold text-[#075B50] underline underline-offset-4" onClick={() => { setFeedback(null); requestAnimationFrame(() => cardRef.current?.focus()); }}>
                {t('dismiss')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto mt-7 max-w-xl">
        {current ? (
          <>
            <p className="mb-4 text-center text-sm font-semibold text-[#536A79]">
              {t('position', { current: index + 1, total: filtered.length })}
            </p>
            <div className="relative isolate">
              {hasNext && <div aria-hidden="true" className="absolute inset-x-5 bottom-[-10px] top-5 -z-10 rounded-[2rem] bg-[#D5EAE2]" />}
              <article
                key={`${mode}-${area}-${current.id}`}
                ref={cardRef}
                tabIndex={0}
                aria-label={t('cardLabel', { name: current.name })}
                aria-describedby="volunteer-gesture-hint"
                aria-keyshortcuts="ArrowLeft ArrowRight"
                onKeyDown={onCardKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => { pointerStart.current = null; setDragX(0); }}
                style={{ transform: `translateX(${dragX}px) rotate(${dragX / 25}deg)`, touchAction: 'pan-y' }}
                className="surface-card overflow-hidden transition-[box-shadow] select-none"
              >
                <div className={`relative flex min-h-64 flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${tones[current.style]} px-6 py-10 sm:min-h-72`}>
                  <div aria-hidden="true" className="absolute -left-20 -top-20 size-52 rounded-full border-[32px] border-white/30" />
                  <div aria-hidden="true" className="absolute -bottom-20 -right-12 size-64 rounded-full border-[36px] border-white/30" />
                  <div aria-hidden="true" className="relative flex size-32 items-center justify-center rounded-full border-4 border-white/80 bg-white/70 text-5xl font-black text-[#15324B] shadow-lg">
                    {current.initials}
                  </div>
                  <span className="relative mt-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#075B50]">
                    {t(mode === 'offer' ? 'needsHelp' : 'volunteerBadge')}
                  </span>
                </div>
                <div className="px-6 pb-7 pt-6 sm:px-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-3xl font-black tracking-tight text-[#15324B]">{current.name}</h2>
                    <span className="rounded-full bg-[#E8F2F7] px-3 py-1.5 text-xs font-bold text-[#15324B]">
                      {t(`areas.${current.area}`)}
                    </span>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#546879]">
                    <MapPin size={16} aria-hidden="true" /> {current.city}, {current.state}
                  </p>
                  <h3 className="mt-5 text-sm font-extrabold uppercase tracking-wide text-[#075B50]">
                    {t(mode === 'offer' ? 'requestHeading' : 'volunteerHeading')}
                  </h3>
                  <p className="mt-2 min-h-16 text-base leading-relaxed text-[#334D5D]">
                    {t(`profiles.${current.id}`)}
                  </p>
                </div>
              </article>
            </div>
            <p id="volunteer-gesture-hint" className="mt-6 text-center text-xs text-[#526677]">
              {t('gestureHint')}
            </p>
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => decide('skip')}
                className="flex min-h-14 min-w-36 items-center justify-center gap-2 rounded-full border-2 border-[#C8D8D9] bg-white px-5 font-extrabold text-[#15324B] transition hover:bg-[#E7F0F5]"
              >
                <X size={21} aria-hidden="true" /> {t('skip')}
              </button>
              <button
                type="button"
                onClick={() => decide('connect')}
                className="flex min-h-14 min-w-36 items-center justify-center gap-2 rounded-full bg-[#08775D] px-5 font-extrabold text-white transition hover:bg-[#075B50]"
              >
                <Heart size={21} aria-hidden="true" /> {t('connect')}
              </button>
            </div>
          </>
        ) : (
          <div className="surface-card p-8 text-center sm:p-12">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-[#E3F5EE] text-[#075B50]">
              <Check size={32} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-extrabold">{filtered.length ? t('finishedTitle') : t('noProfilesTitle')}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#526677]">
              {filtered.length ? t('finishedDescription', { connections }) : t('noProfilesDescription')}
            </p>
            <button type="button" className="primary-btn mt-6" onClick={() => { setIndex(0); setFeedback(null); setConnections(0); }}>
              <RotateCcw size={18} aria-hidden="true" /> {t('restart')}
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl border border-[#D8E5E4] bg-white p-5 text-sm leading-relaxed text-[#3F5769]">
        <ArrowLeft size={19} className="mt-0.5 shrink-0 text-[#075B50]" aria-hidden="true" />
        <p>{t('howToUse')} <ArrowRight size={16} className="inline text-[#075B50]" aria-hidden="true" /></p>
      </div>
    </div>
  );
}
