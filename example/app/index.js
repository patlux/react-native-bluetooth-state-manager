import React from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  Button,
} from 'react-native-paper';

import ExampleWithApi from './ExampleWithApi';
import ExampleWithDeclarativeApi from './ExampleWithDeclarativeApi';

const THEME_CUSTOM = {
  ...DefaultTheme,
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { reload: false };
  }

  componentWillUnmount() {
    this.clearReloadTimeout();
  }

  onPressReload = () => {
    this.setState({ reload: true });
  };

  onReloadFinish = () => {
    this.setState({ reload: false });
  };

  onReloadFinishDelayed = () => {
    this.clearReloadTimeout();
    this.reloadTimeout = setTimeout(() => {
      this.onReloadFinish();
      this.clearReloadTimeout();
    }, 1000);
  };

  clearReloadTimeout = () => {
    if (this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
      this.reloadTimeout = null;
    }
  };

  renderReload = () => {
    return (
      <View style={[styles.container, styles.mainContainerCentered]}>
        <ActivityIndicator
          onLayout={this.onReloadFinishDelayed}
          size="large"
          color={THEME_CUSTOM.colors.primary}
        />
      </View>
    );
  };

  renderContent = () => {
    if (this.state.reload) {
      return this.renderReload();
    }

    return (
      <React.Fragment>
        <ExampleWithApi />
        <ExampleWithDeclarativeApi />
      </React.Fragment>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={DefaultTheme.colors.primary} barStyle="light-content" />
        <PaperProvider theme={THEME_CUSTOM}>
          <Toolbar>
            <ToolbarContent title="Example" subtitle="react-native-bluetooth-state-manager" />
            <ToolbarAction
              icon="replay"
              onPress={this.onPressReload}
              style={{ opacity: this.state.reload ? 0.4 : 1 }}
            />
          </Toolbar>
          {this.renderContent()}
        </PaperProvider>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainContainerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    padding: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
});
