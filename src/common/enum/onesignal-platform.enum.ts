import { registerEnumType } from '@nestjs/graphql';

export enum OneSignalPlatform {
  IOS_PUSH = 'iOSPush',
  ANDROID_PUSH = 'AndroidPush',
  FIREOS_PUSH = 'FireOSPush',
  CHROME_EXTENSION_PUSH = 'ChromeExtensionPush',
  CHROME_PUSH = 'ChromePush',
  WINDOWS_PUSH = 'WindowsPush',
  SAFARI_LEGACY_PUSH = 'SafariLegacyPush',
  FIREFOX_PUSH = 'FirefoxPush',
  MACOS_PUSH = 'macOSPush',
  HUAWEI_PUSH = 'HuaweiPush',
  SAFARI_PUSH = 'SafariPush',
  EMAIL = 'Email',
  SMS = 'SMS',
}
registerEnumType(OneSignalPlatform, { name: 'OneSignalPlatform' });
