'use client';

import { AlertTriangle, Clock3 } from 'lucide-react';
import { alerts } from '@/data/fixtures/alerts';
import { sources } from '@/data/fixtures/sources';
import { appCopy } from '@/lib/client/copy';
import { formatRelativeTime, getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';

export default function AlertsBanner() {
    const { language } = useLanguage();

    if (alerts.length === 0) {
        return null;
    }

    return (
        <section className="space-y-3">
            {alerts.map((alert) => {
                const source = sources.find((item) => item.id === alert.sourceId);

                return (
                    <article key={alert.id} className="surface-card rounded-3xl border border-amber-200 bg-amber-50 p-4 text-left">
                        <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                                <AlertTriangle size={14} />
                                {alert.status.toUpperCase()}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-brand-muted">
                                <Clock3 size={13} />
                                {formatRelativeTime(alert.updatedAt, language)}
                            </span>
                        </div>
                        <h2 className="text-base font-semibold text-brand-ink">{getLocalizedText(alert.title, language)}</h2>
                        <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(alert.body, language)}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                            <span className="rounded-full bg-white px-3 py-1">{alert.locationScope}</span>
                            {source ? <span className="rounded-full bg-white px-3 py-1">{source.name}</span> : null}
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
