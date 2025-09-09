import { View, Text } from 'react-native';
import React from 'react';
import QRGenerator from '@/components/QRGenerator';

type QRConfig = {
    role: string;
    fields: { key: string; label: string; sourceKey: string; defaultValue?: string }[];
    storageKeys: string[];
};

const QRCode = () => {
    const CollectorQRConfig: QRConfig = {
    role: "Collector",
    storageKeys: ['collectorData', 'transporterData'],
    fields: [
        { key: 'collectorName', label: 'Collector Name', sourceKey: 'collectorData' },
        { key: 'collectionDate', label: 'Date', sourceKey: 'collectorData' },
        { key: 'batchID', label: 'Batch ID', sourceKey: 'collectorData' },
        { key: 'quantityKG', label: 'Total Collected Quantity', sourceKey: 'collectorData' },
        { key: 'transportDate', label: 'Transport Date', sourceKey: 'transporterData' },
        { key: 'method', label: 'Transport Method', sourceKey: 'transporterData' },
    ],
};
    return <QRGenerator config={CollectorQRConfig} />;
};

export default QRCode;