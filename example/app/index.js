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
    this.state = { reloadKey: 0 };
  }

  incrementReloadKey = prevState => ({ reloadKey: prevState.reloadKey + 1 });
  onPressReload = () => this.setState(this.incrementReloadKey);

  renderContent = () => {
    return (
      <React.Fragment key={this.state.reloadKey}>
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
            <ToolbarAction icon="replay" onPress={this.onPressReload} />
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
