import { View, Text } from 'react-native';
import React from 'react';
import QRGenerator from '@/components/QRGenerator';

type QRConfig = {
    role: string;
    fields: { key: string; label: string; sourceKey: string; defaultValue?: string }[];
    storageKeys: string[];
};

const ExporterQRCode = () => {
    const ExporterQRConfig: QRConfig = {
        role: "Exporter",
        storageKeys: ['deliverData'], // Key from Delivery.tsx
        fields: [
            { key: 'batchID', label: 'Batch ID', sourceKey: 'deliverData' },
            { key: 'deliveredDate', label: 'Delivery Date', sourceKey: 'deliverData' },
            { key: 'deliveredTO', label: 'Delivered To', sourceKey: 'deliverData' },
            { key: 'Condition', label: 'Condition Upon Delivery', sourceKey: 'deliverData' },
        ],
    };
    return <QRGenerator config={ExporterQRConfig} />;
};

export default ExporterQRCode;