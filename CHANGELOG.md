## 2.0.1 (2025-05-19)

### 🩹 Fixes

- **docs:** wrong readme at npmjs.com ([00160c1](https://github.com/patlux/react-native-bluetooth-state-manager/commit/00160c1))
- **example:** organize code files ([969a72d](https://github.com/patlux/react-native-bluetooth-state-manager/commit/969a72d))

### ❤️ Thank You

- Patrick Wozniak @patlux

# 2.0.0 (2025-05-19)

### Features

- Complete rewrite using [nitro-modules](https://nitro.margelo.com/)
- Native TypeScript support
- New synchronous API: `getStateSync()` to retrieve Bluetooth state

### Breaking Changes

- Requires `react-native-nitro-modules` to be installed
- Removed `enable()` and `disable()` due to deprecation starting from Android SDK 33. If your app targets SDK < 33 and depends on these methods, remain on `v1.3.5`
- Replacing programmatic Bluetooth control: use `askToEnable()` and `askToDisable()` to prompt the user instead

## 2.0.0-0 (2025-03-26)

### Features

- Complete rewrite. Based on [nitro-modules](https://nitro.margelo.com/)

### ❤️ Thank You

- Patrick Wozniak @patlux

