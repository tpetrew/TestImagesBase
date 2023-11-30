import {Dimensions, Image} from "react-native";
import { useEffect, useState } from "react";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

interface ThumbnailType {
  extension: string | null;
  uri: string;
}

export const ThumbnailImage = ({ uri, extension }: ThumbnailType) => {
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    if (!uri) {
      return;
    }

    const getThumbnail = async () => {
      const options = {
        allowNetworkAccess: true,
        targetSize: {
          height: 80,
          width: 80,
        },
        quality: 1.0,
      };
      try {
        const thumbnailResponse = await CameraRoll.getPhotoThumbnail(uri, options);
        setBase64Image(thumbnailResponse.thumbnailBase64);
      } catch (e) {
        console.log("e", e);
      }
    };

    getThumbnail().then();
  }, [uri]);

  let prefix;

  switch (extension) {
    case "png":
      prefix = "data:image/png;base64,";
      break;
    default:
      prefix = "data:image/jpeg;base64,";
      break;
  }

  return <Image source={{ uri: `${prefix}${base64Image}` }} style={{ width: Dimensions.get("window").width, height: 100}} />;
};
