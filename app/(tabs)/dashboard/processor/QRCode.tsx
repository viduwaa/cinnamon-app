import { View, Text } from 'react-native';
import React from 'react';
import QRGenerator from '@/components/QRGenerator';

type QRConfig = {
    role: string;
    fields: { key: string; label: string; sourceKey: string; defaultValue?: string }[];
    storageKeys: string[];
};

const ProcessorQRCode = () => {
    const ProcessorQRConfig: QRConfig = {
        role: "Processor",
        storageKeys: ['processingData'], // Assuming data is saved under processingData from InitialProcessing
        fields: [
            { key: 'processor', label: 'Processor Name', sourceKey: 'processingData' },
            { key: 'processingDate', label: 'Processing Date', sourceKey: 'processingData' },
            { key: 'batchID', label: 'Batch ID', sourceKey: 'processingData' },
            { key: 'drying.batchID', label: 'Drying Batch ID', sourceKey: 'processingData' },
            { key: 'drying.method', label: 'Drying Method', sourceKey: 'processingData' },
            { key: 'drying.startDate', label: 'Drying Start Date', sourceKey: 'processingData' },
            { key: 'drying.endDate', label: 'Drying End Date', sourceKey: 'processingData' },
            { key: 'drying.moisture', label: 'Moisture Level', sourceKey: 'processingData' },
        ],
    };
    return <QRGenerator config={ProcessorQRConfig} />;
};

export default ProcessorQRCode;