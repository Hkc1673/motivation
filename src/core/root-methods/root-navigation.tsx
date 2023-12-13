import * as React from 'react';

export const isMountedRef = React.createRef<HTMLDivElement>();

export const navigationRef = React.createRef<HTMLDivElement>();

// to navigate new screen
export function navigate(name, params = null) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// to go back previous screen
export function goBack() {
  navigationRef.current.goBack();
}

// if the screen is focused
export function isFocused() {
  return navigationRef.current.isFocused();
}
