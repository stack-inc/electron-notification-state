import { getNotificationState as getWindowsNotificationState, QUERY_USER_NOTIFICATION_STATE } from '@stack-inc/windows-notification-state';
import { getIsQuietHours } from '@stack-inc/windows-quiet-hours';
import { getSessionState as getDarwinSessionState, getDoNotDisturb as getDarwinDoNotDisturb, SessionState } from '@stack-inc/macos-notification-state';

export type NotificationState = QUERY_USER_NOTIFICATION_STATE | SessionState | 'UNKNOWN' | 'UNKNOWN_ERROR' | 'DO_NOT_DISTURB'

export function getSessionState(): NotificationState {
  if (process.platform === 'win32') {
    return getWindowsNotificationState();
  }

  if (process.platform === 'darwin') {
    return getDarwinSessionState();
  }

  return 'UNKNOWN_ERROR';
}

export function getDoNotDisturb(): boolean {
  if (process.platform === 'win32') {
    return getIsQuietHours();
  }

  if (process.platform === 'darwin') {
    return getDarwinDoNotDisturb();
  }

  return false;
}
