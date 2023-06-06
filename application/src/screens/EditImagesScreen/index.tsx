import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EditImagesScreenPresenter, editImagesScreenPresenterProps } from '@screens/EditImagesScreen/view';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import { imageCarouselModalForward } from '@components/common/modals/ImageCarouselModal';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import { IRResponse } from '@core/http/Requester';

export type editImagesScreenContainerProps = {};
export type editImagesScreenContainerState = {
  images: Array<Asset>;
};

const bytesInMegabyte = 1024 * 1024 * 10;

const EditImagesScreenContainer: React.FC<editImagesScreenContainerProps> = ({}) => {
  const { httpCaller, loading } = useSafeHTTP();
  const carouselModalRef = useRef<imageCarouselModalForward>(null);
  const [state, setState] = useState<editImagesScreenContainerState>({
    images: [],
  });
  const imagesUri = useMemo(() => {
    return state.images.map((el) => {
      return el.uri || '';
    });
  }, [state.images]);

  const handleAddImage = useCallback(async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10,
        quality: 1,
        includeBase64: false,

      },
      async ({ didCancel, errorCode, assets }) => {
        if (!assets || assets.length === 0) return;

        if (errorCode || !assets) {
          Alert.alert('Warning', 'Something went wrong while picking image, try again.');
          return;
        }
        const selectedFiles = assets.filter((asset) => {
          return asset.fileSize! <= bytesInMegabyte;
        });
        if (selectedFiles.length < assets.length) {
          Alert.alert('Warning', 'Some of images are not applied because size of photos are too big.');
          return;
        }
        const countOfPhotosCanAccept = 10 - state.images.length;
        setState({ ...state, images: [...state.images, ...selectedFiles.slice(0, countOfPhotosCanAccept)] });
      },
    );
  }, [state]);

  const handleRemoveImage = useCallback((selectedImage: string) => {
    setState((prev) => {
      const filteredImages = prev.images.filter((asset) => {
        return selectedImage !== asset.uri;
      });
      return { ...prev, images: filteredImages };
    });
  }, []);

  const openFullScreenCarousel = useCallback((selectedImage: string) => {
    Alert.alert('Select Action', '', [
      {
        text: 'Open Image Viewer',
        isPreferred: true,
        style: 'destructive',
        onPress: () => {
          if (carouselModalRef && carouselModalRef.current) {
            carouselModalRef.current.onOpen([]);
          }
        },
      },
      {
        text: 'Remove',
        style: 'default',
        onPress: () => handleRemoveImage(selectedImage),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }, [handleRemoveImage]);

  const handleOnSave = useCallback(async () => {
    const promises: Array<Promise<any>> = [];
    if (state.images.length > 0) {
      state.images.forEach((photo) => {
        if (photo && photo?.uri !== '') {
          promises.push(httpCaller(RequestForge.uploadPhotoCall, photo));
        }
      });
      const response = await Promise.all(promises);
      const ids = [];
      for (const buckets of response) {
        if (buckets && buckets.statusCode === 200) {
          ids.push(buckets.data);
        }
      }
      const attachResponse = await httpCaller(RequestForge.attachPhotoCall, ids);
      if (attachResponse && attachResponse.statusCode !== 200) {
      }
    }
  }, [httpCaller, state.images]);

  useEffect(() => {
    console.log(imagesUri);
  }, [imagesUri]);

  const ViewProps: editImagesScreenPresenterProps = {
    handleAddImage,
    imageList: state.images,
    imagesUri,
    openFullScreenCarousel,
    carouselModalRef,
    handleOnSave,
    loading,
  };

  return (
    <EditImagesScreenPresenter {...ViewProps} />
  );
};

export { EditImagesScreenContainer };
