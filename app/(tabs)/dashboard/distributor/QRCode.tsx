import { View, Text } from 'react-native';
import React from 'react';
import QRGenerator from '@/components/QRGenerator';

type QRConfig = {
    role: string;
    fields: { key: string; label: string; sourceKey: string; defaultValue?: string }[];
    storageKeys: string[];
};

const DistributorQRCode = () => {
    const DistributorQRConfig: QRConfig = {
        role: "Distributor",
        storageKeys: ['distributorData', 'transportDataDistributor'], // Keys from Packaging and Transport
        fields: [
            { key: 'batchID', label: 'Batch ID', sourceKey: 'distributorData' },
            { key: 'packagingDate', label: 'Packaging Date', sourceKey: 'distributorData' },
            { key: 'packageBy', label: 'Package By', sourceKey: 'distributorData' },
            { key: 'packageType', label: 'Packaging Type', sourceKey: 'distributorData' },
            { key: 'packageWeight', label: 'Package Weight', sourceKey: 'distributorData' }, 
            { key: 'transportDate', label: 'Transport Date', sourceKey: 'transportDataDistributor' },
            { key: 'transportCompany', label: 'Transport Company', sourceKey: 'transportDataDistributor' },
            { key: 'vehicleID', label: 'Vehicle ID', sourceKey: 'transportDataDistributor' },
            { key: 'temperature', label: 'Temperature', sourceKey: 'transportDataDistributor' },
            { key: 'humidity', label: 'Humidity', sourceKey: 'transportDataDistributor' },
        ],
    };
    return <QRGenerator config={DistributorQRConfig} />;
};

export default DistributorQRCode;