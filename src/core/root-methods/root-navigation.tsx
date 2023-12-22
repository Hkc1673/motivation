import React, {MutableRefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const isMountedRef: MutableRefObject<React.RefObject<HTMLDivElement> | null> =
  React.createRef();
export const navigationRef: MutableRefObject<NavigationContainerRef<any> | null> =
  React.createRef();

// to navigate to a new screen
export function navigate(
  name: string,
  params: Record<string, any> | null = null,
): void {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// to go back to the previous screen
export function goBack(): void {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  }
}

// check if the screen is focused
export function isFocused(): boolean {
  return navigationRef.current ? navigationRef.current.isFocused() : false;
}
