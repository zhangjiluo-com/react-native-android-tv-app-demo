import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  DefaultFocus,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-native-tv-spatial-navigation/src';
import { RootStackParamList } from '../../App';
import { Page } from '../components/atom/Page';
import '../components/configureRemoteControl';
import { ProgramListWithTitle } from '../components/organisms/ProgramListWithTitle';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Page>
      <TitleContainer>
        <Title variant="title">Hoppix</Title>
      </TitleContainer>
      <DefaultFocus>
        <SpatialNavigationScrollView offsetFromStart={140}>
          <Box padding="$10">
            <ProgramListWithTitle title="Popular" numberOfItems={10} />
            <Spacer gap="$6" />
            <ProgramListWithTitle title="Classics" numberOfItems={10} />
            <Spacer gap="$6" />
            <ProgramListWithTitle title="Watch again" numberOfItems={10} />
            <Spacer gap="$6" />
            <ProgramListWithTitle title="You may also like..." numberOfItems={10} />
          </Box>
          <SectionTitle variant="title">Throughout the years</SectionTitle>
          <SpatialNavigationView direction="horizontal">
            <Box padding="$10" direction="horizontal">
              <ProgramListWithTitle title="70s" numberOfItems={10} orientation="vertical" />
              <Spacer direction="horizontal" gap="$6" />
              <ProgramListWithTitle title="80s" numberOfItems={10} orientation="vertical" />
              <Spacer direction="horizontal" gap="$6" />
              <ProgramListWithTitle title="90s" numberOfItems={10} orientation="vertical" />
              <Spacer direction="horizontal" gap="$6" />
              <ProgramListWithTitle title="00s" numberOfItems={10} orientation="vertical" />
            </Box>
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
      </DefaultFocus>
    </Page>
  );
};

const TitleContainer = styled.View(({ theme }) => ({ padding: theme.spacings.$4 }));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary.main,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary.contrastText,
}));
