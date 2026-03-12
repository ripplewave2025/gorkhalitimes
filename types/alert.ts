import { AlertCategory, AlertSeverity, AlertStatus, LocalizedText } from '@/types/common';

export interface AlertItem {
    id: string;
    title: LocalizedText;
    body: LocalizedText;
    category: AlertCategory;
    severity: AlertSeverity;
    locationScope: string;
    status: AlertStatus;
    sourceId: string;
    publishedAt: string;
    updatedAt: string;
}
