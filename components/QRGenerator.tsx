import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { ArrowLeft, Share2, Download } from "lucide-react-native";
import React, { useState, useEffect, useRef } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

type QRField = {
    key: string;
    label: string;
    sourceKey: string;
    defaultValue?: string;
};

type QRConfig = {
    role: string;
    fields: QRField[];
    storageKeys: string[];
};

const QRGenerator = ({ config }: { config: QRConfig }) => {
    const [qrData, setQrData] = useState(null);
    const [isDataComplete, setIsDataComplete] = useState(false);
    const router = useRouter();
    const qrRef = useRef<any>(null);

    useEffect(() => {
        const loadFormData = async () => {
            try {
                const storageData: Record<string, any> = {};
                for (const key of config.storageKeys) {
                    const data = await AsyncStorage.getItem(key);
                    storageData[key] = data ? JSON.parse(data) : {};
                }

                const combinedData: Record<string, string> = {};
                config.fields.forEach((field) => {
                    let value = field.defaultValue || '';
                    for (const sourceKey of config.storageKeys) {
                        if (storageData[sourceKey] && storageData[sourceKey][field.key]) {
                            value = storageData[sourceKey][field.key];
                            break;
                        }
                    }
                    combinedData[field.label] = value;
                });

                const allFieldsComplete = Object.values(combinedData).every(
                    (value) => value && value !== ''
                );

                if (allFieldsComplete) {
                    setQrData(combinedData);
                    setIsDataComplete(true);
                } else {
                    setIsDataComplete(false);
                    Alert.alert(
                        'Incomplete Data',
                        `Please submit all required forms for the ${config.role} role before generating the QR code.`
                    );
                }
            } catch (error) {
                console.error('Error loading form data:', error);
                Alert.alert('Error', 'Failed to load form data. Please try again.');
            }
        };

        loadFormData();
    }, [config]);

    const handleShareQR = async () => {
        if (qrRef.current) {
            qrRef.current.toDataURL(async (data: string) => {
                const fileUri = FileSystem.cacheDirectory + `${config.role}_qr.png`;
                await FileSystem.writeAsStringAsync(fileUri, data, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                await Sharing.shareAsync(fileUri);
            });
        }
    };

    const handleDownloadQR = async () => {
        if (qrRef.current) {
            qrRef.current.toDataURL(async (data: string) => {
                const fileUri = FileSystem.documentDirectory + `${config.role}_qr.png`;
                await FileSystem.writeAsStringAsync(fileUri, data, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                Alert.alert("Saved", `QR code saved to ${fileUri}`);
            });
        }
    };

    return (
        <ScrollView className="flex-1 bg-primary relative">
            <View className="absolute top-2 left-4">
                <Pressable
                    className="active:bg-amber-400 p-2 rounded-md"
                    onPress={router.back}
                >
                    <ArrowLeft size={30} />
                </Pressable>
            </View>
            <View className="flex items-center h-[80px] mt-10">
                <Text className="text-3xl font-bold">{config.role} QR Code</Text>
                <Text className="text-2xl">Scan for {config.role} Details</Text>
            </View>
            <View className="w-[90%] flex gap-4 items-center justify-center mx-auto pb-10">
                {isDataComplete && qrData ? (
                    <>
                        <View className="bg-white p-4 rounded-lg shadow-md">
                            <QRCode
                                value={JSON.stringify(qrData)}
                                size={250}
                                color="black"
                                backgroundColor="white"
                                getRef={(ref) => (qrRef.current = ref)}
                            />
                        </View>
                        <Text className="text-lg text-gray-600 mt-4 text-center">
                            This QR encodes: {config.fields.map((field) => field.label).join(", ")}.
                        </Text>

                        {/* Action Buttons */}
                        <View className="flex-row gap-4 mt-6">
                            <Pressable
                                onPress={handleShareQR}
                                className="bg-blue-500 p-3 rounded-xl flex-row items-center"
                            >
                                <Share2 size={20} color="white" />
                                <Text className="ml-2 text-white">Share</Text>
                            </Pressable>

                            <Pressable
                                onPress={handleDownloadQR}
                                className="bg-green-500 p-3 rounded-xl flex-row items-center"
                            >
                                <Download size={20} color="white" />
                                <Text className="ml-2 text-white">Save</Text>
                            </Pressable>
                        </View>
                    </>
                ) : (
                    <Text className="text-lg text-red-600 mt-4 text-center">
                        Please complete and submit all forms for the {config.role} role to generate the QR code.
                    </Text>
                )}
                <Text className="text-sm text-gray-500 mt-2 text-center">
                    In the {config.role.toLowerCase()} role, scan this QR using the ScannerPage to parse and display the details.
                </Text>
            </View>
        </ScrollView>
    );
};

export default QRGenerator;
