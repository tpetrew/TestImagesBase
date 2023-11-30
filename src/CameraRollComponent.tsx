import {View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Text} from "react-native";
import {CameraRoll, GetPhotosParams, PhotoIdentifier} from "@react-native-camera-roll/camera-roll";
import {useEffect, useState} from "react";
import { ThumbnailImage } from "./ThubnailImage"

export const CameraRollComponent = () => {
    const [mediaData, setMediaData] = useState<PhotoIdentifier[]>([]);

    const getPhotos = async () => {
        const params: GetPhotosParams = { first: 50 };
        const { page_info, edges } = await CameraRoll.getPhotos(params);
        setMediaData((prev) => [...prev, ...edges]);
    };


    return (
        <View>
            <TouchableOpacity onPress={getPhotos} style={{ width: 100, height: 100, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Get Photo</Text>
            </TouchableOpacity>
                <FlatList
                    data={mediaData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ThumbnailImage uri={item?.node?.image?.uri} extension={item?.node?.image?.extension} />
                    )}
                    keyExtractor={(item, index) => `${item?.node?.image?.filename || ""}${index}`}
                />
        </View>
    )
}
