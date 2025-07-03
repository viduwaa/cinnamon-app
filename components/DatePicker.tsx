// components/DatePicker.tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

type Props = {
    date: Date;
    onChange: (date: Date) => void;
};

export default function DatePickerForm({ date, onChange }: Props) {
    const [show, setShow] = useState(false);

    const handleChange = (_event: any, selectedDate?: Date) => {
        setShow(Platform.OS === "ios");
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View className="ml-2 py-4 text-lg w-[90%]">
            <Pressable className="w-full  bg-slate-200 active:bg-slate-400" onPress={() => setShow(true)}>
                <Text className="text-lg text-center p-3 rounded-lg">Select Date</Text>
            </Pressable>
            <Text style={{ marginTop: 8 }}>Selected Date: <Text className="font-medium text-amber-900">{date.toDateString()}</Text></Text>
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                />
            )}
        </View>
    );
}
