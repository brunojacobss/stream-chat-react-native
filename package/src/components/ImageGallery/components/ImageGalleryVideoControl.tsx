import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import dayjs from 'dayjs';

import type { ImageGalleryFooterVideoControlProps } from './ImageGalleryFooter';

import { useTheme } from '../../../contexts/themeContext/ThemeContext';

import { Pause, Play } from '../../../icons';
import { ProgressControl } from '../../ProgressControl/ProgressControl';

const styles = StyleSheet.create({
  durationTextStyle: {
    fontWeight: 'bold',
  },
  roundedView: {
    alignItems: 'center',
    borderRadius: 50,
    display: 'flex',
    elevation: 2,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  videoContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export const ImageGalleryVideoControl = React.memo(
  (props: ImageGalleryFooterVideoControlProps) => {
    const { duration, onPlayPause, paused, progress, videoRef } = props;

    const videoDuration = duration
      ? duration / 3600 >= 1
        ? dayjs.duration(duration, 'second').format('HH:mm:ss')
        : dayjs.duration(duration, 'second').format('mm:ss')
      : null;

    const progressValueInSeconds = progress * duration;

    const progressDuration = progressValueInSeconds
      ? progressValueInSeconds / 3600 >= 1
        ? dayjs.duration(progressValueInSeconds, 'second').format('HH:mm:ss')
        : dayjs.duration(progressValueInSeconds, 'second').format('mm:ss')
      : null;

    const {
      theme: {
        colors: { accent_blue, black, static_black, static_white },
        imageGallery: {
          videoControl: { durationTextStyle, roundedView, videoContainer },
        },
      },
    } = useTheme();

    const handlePlayPause = async () => {
      if (progress === 1) {
        // For expo CLI
        if (videoRef.current?.setPositionAsync) {
          await videoRef.current.setPositionAsync(0);
        }
      }
      onPlayPause();
    };

    return (
      <View style={[styles.videoContainer, videoContainer]}>
        <TouchableOpacity accessibilityLabel='Play Pause Button' onPress={handlePlayPause}>
          <View style={[styles.roundedView, { backgroundColor: static_white }, roundedView]}>
            {paused ? (
              <Play accessibilityLabel='Play Icon' fill={static_black} height={32} width={32} />
            ) : (
              <Pause accessibilityLabel='Pause Icon' fill={static_black} height={32} width={32} />
            )}
          </View>
        </TouchableOpacity>
        <Text
          accessibilityLabel='Progress Duration'
          style={[styles.durationTextStyle, { color: black }, durationTextStyle]}
        >
          {progressDuration ? progressDuration : '00:00'}
        </Text>
        <ProgressControl
          duration={duration}
          filledColor={accent_blue}
          onPlayPause={onPlayPause}
          progress={progress}
          testID={'progress-control'}
          width={180}
        />
        <Text
          accessibilityLabel='Video Duration'
          style={[styles.durationTextStyle, { color: black }, durationTextStyle]}
        >
          {videoDuration ? videoDuration : '00:00'}
        </Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.duration === nextProps.duration &&
      prevProps.paused === nextProps.paused &&
      prevProps.progress === nextProps.progress
    ) {
      return true;
    } else {
      return false;
    }
  },
);

ImageGalleryVideoControl.displayName = 'ImageGalleryVideoControl{imageGallery{videoControl}}';
