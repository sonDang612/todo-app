import {
  CameraRoll,
  type GetPhotosParams,
  type PhotoIdentifier,
  type PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';
import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
interface State {
  assets: Array<PhotoIdentifier>;
  data: any;
  seen: Set<any>;
  lastCursor: any;
  noMore: boolean;
  loadingMore: boolean;
}
const groupByEveryN = function groupByEveryN(num: number) {
  const n = num;
  return (arrayArg: any) => {
    const array: any = [...arrayArg];
    const result: Array<PhotoIdentifier> = [];
    while (array?.length > 0) {
      const groupByNumber: number = array?.length >= n ? n : array?.length;
      result.push(array.splice(0, groupByNumber));
    }
    return result;
  };
};

const useGallery = ({ type }: { type: 'Photos' | 'Videos' | 'All' }) => {
  const [state, setState] = React.useState<State>({
    assets: [],
    data: [],
    seen: new Set(),
    lastCursor: null,
    noMore: false,
    loadingMore: false,
  });
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  const appendAssets = (data: PhotoIdentifiersPage) => {
    const assets: Array<PhotoIdentifier> = data.edges;
    const newState: Partial<State> = {
      loadingMore: false,
    };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }
    if (assets?.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.seen = new Set(state.seen);

      const uniqAssets: Array<PhotoIdentifier> = [];
      for (const asset of assets) {
        const value = asset.node.image.uri;
        if (newState.seen.has(value)) {
          continue;
        }
        newState.seen.add(value);
        uniqAssets.push(asset);
      }

      newState.assets = state.assets.concat(uniqAssets);
      newState.data = groupByEveryN(1)(newState.assets);
    }

    setState({ ...state, ...newState });
  };

  const getPhotos = async () => {
    const fetchParams: GetPhotosParams = {
      first: 21,
      assetType: type,
      include: ['fileSize', 'playableDuration'],
    };
    if (state.lastCursor) {
      fetchParams.after = state.lastCursor;
    }
    try {
      const data: PhotoIdentifiersPage = await CameraRoll.getPhotos(
        fetchParams,
      );
      appendAssets(data);
    } catch (err) {
      console.error(err);
    }
  };
  const onEndReached = () => {
    if (!state.noMore) {
      hasAndroidPermission().then(() => getPhotos());
    }
  };

  React.useEffect(() => {
    if (state.data.length === 0) {
      hasAndroidPermission().then(() => getPhotos());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data.length]);

  React.useEffect(() => {
    setState({
      assets: [],
      data: [],
      seen: new Set(),
      lastCursor: null,
      noMore: false,
      loadingMore: false,
    });
  }, [type]);
  return { data: state.data, onEndReached, noMore: state.noMore };
};

export default useGallery;
