import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

type Props = {
    date: Date;
    onChange: (date: Date) => void;
    text?: string; // Optional text for the button label
    width?: string; // Optional width as a className string
};

export default function DatePickerForm({ date, onChange, text = "Select", width = "w-[90%]" }: Props) {
    const [show, setShow] = useState(false);

    const handleChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios"); // Keep open on iOS, close on Android
        onChange(currentDate);
    };

    return (
        <View className={`ml-2 py-4 ${width}`}>
            <Pressable
                className="w-full bg-slate-200 active:bg-slate-400 p-3 rounded-lg"
                onPress={() => setShow(true)}
            >
                <Text className="text-lg text-center">{text} Date</Text>
            </Pressable>
            <Text style={{ marginTop: 8 }}>
                Selected Date:{" "}
                <Text className="font-medium text-amber-900">
                    {date.toDateString()}
                </Text>
            </Text>
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                    onTouchCancel={() => setShow(false)} // Ensure closing on cancel
                />
            )}
        </View>
    );
}