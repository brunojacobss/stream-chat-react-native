import { Platform } from 'react-native';

import { FlatList } from '@stream-io/flat-list-mvcp';
import { registerNativeHandlers } from 'stream-chat-react-native-core';

import {
  compressImage,
  deleteFile,
  getLocalAssetUri,
  getPhotos,
  iOS14RefreshGallerySelection,
  NetInfo,
  oniOS14GalleryLibrarySelectionChange,
  saveFile,
  Sound,
  Video,
} from './handlers';

import {
  Audio,
  pickDocument,
  setClipboardString,
  shareImage,
  takePhoto,
  triggerHaptic,
} from './optionalDependencies';

registerNativeHandlers({
  Audio,
  compressImage,
  deleteFile,
  FlatList,
  getLocalAssetUri,
  getPhotos,
  iOS14RefreshGallerySelection,
  NetInfo,
  oniOS14GalleryLibrarySelectionChange,
  pickDocument,
  saveFile,
  SDK: 'stream-chat-react-native',
  setClipboardString,
  shareImage,
  Sound,
  takePhoto,
  triggerHaptic,
  Video,
});

if (Platform.OS === 'android') {
  if (typeof Symbol === 'undefined') {
    // eslint-disable-next-line no-undef
    require('es6-symbol/implement');
    if (Array.prototype[Symbol.iterator] === undefined) {
      Array.prototype[Symbol.iterator] = function () {
        let i = 0;
        return {
          next: () => ({
            done: i >= this.length,
            value: this[i++],
          }),
        };
      };
    }
  }
}

export * from 'stream-chat-react-native-core';
