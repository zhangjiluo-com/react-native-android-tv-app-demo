import styled from '@emotion/native';
import { DefaultFocus, SpatialNavigationScrollView } from 'react-tv-space-navigation';
import { Page } from '../components/Page';
// import { Box } from '../design-system/components/Box';
// import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';
import { Button } from '../design-system/components/Button';

// import {
//   ProgramListWithTitle,
//   ProgramListWithTitleAndVariableSizes,
// } from '../modules/program/view/ProgramListWithTitle';
// import { BottomArrow, TopArrow } from '../design-system/components/Arrows';
import { StyleSheet, Text, View } from 'react-native';

export const Home = () => {
  return (
    <Page>
      <TitleContainer>
        <Title variant="title">Home2</Title>
      </TitleContainer>
      <DefaultFocus>
        <Text style={styles.text}>Home2</Text>
        <View style={{ flex: 1, paddingLeft: 250, display: 'flex', gap: 30 }}>
          <Button label="3. Press Me !"></Button>
          <Button label="4. Press Me !"></Button>
        </View>
      </DefaultFocus>
    </Page>
  );
};

const TitleContainer = styled.View(({ theme }) => ({ padding: theme.spacings.$4 }));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary.main,
}));

const styles = StyleSheet.create({
  topArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    left: 0,
  },
  bottomArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -15,
    left: 0,
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'red',
  },
});
