/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-native/no-inline-styles */
import styled from '@emotion/native';
import { View, Text } from 'react-native';
import { DefaultFocus, SpatialNavigationFocusableView } from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import { NonVirtualizedGridPage } from './NonVirtualizedGridPage';

const Pod = styled.View`
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: row;
  font-size: 24px;
`;
const Left = styled.View`
  width: 300px;
  border-right-width: 1px;
  border-right-color: red;
  height: 100%;
  /* background: lightblue; */
`;
const LeftTitle = styled.View`
  text-align: center;
  font-size: 36px;
  color: #999999;
`;
const LeftTitleText = styled.Text`
  text-align: center;
  font-size: 24px;
  color: #999999;
`;
const LeftMenu = styled.View`
  /* background: lightcoral; */
`;
const LeftMenuItem = styled.View<{
  active?: boolean;
  focused?: boolean;
}>`
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  ${(props) => props.active && 'background-color: lightblue;'}
  ${(props) => props.focused && 'border-color:  #fff;'}
`;
const LeftMenuItemText = styled.Text`
  color: #999999;
  font-size: 24px;
`;
const Right = styled.View`
  flex: 1;
  background-color: lightblue;
`;
const RightList = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const RightListItem = styled.View`
  width: 223px;
  background-color: rebeccapurple;
`;
const RightListItemCover = styled.Image`
  width: 223px;
  height: 311px;
`;
const RightListItemTitle = styled.View`
  height: 40px;
`;
const RightListItemTitleText = styled.Text`
  color: #999;
`;

const menus = [
  {
    title: '高分电影',
  },
  {
    title: '热门电影',
  },
  {
    title: '喜剧电影',
  },
  {
    title: '动画电影',
  },
  {
    title: '悬疑电影',
  },
];

export function List() {
  const list = [
    {
      id: 1,
      title: '电影名称',
      cover: 'http://baidu.com',
    },
  ];

  return <NonVirtualizedGridPage />;
  return (
    <Page>
      <Pod>
        <Left>
          <LeftTitle>
            <LeftTitleText>极光影院</LeftTitleText>
          </LeftTitle>
          <DefaultFocus>
            <LeftMenu>
              {menus.map((i) => (
                <SpatialNavigationFocusableView key={i.title}>
                  {(renderProps) => (
                    <LeftMenuItem active={false} focused={renderProps.isFocused}>
                      <LeftMenuItemText>{i.title}</LeftMenuItemText>
                    </LeftMenuItem>
                  )}
                </SpatialNavigationFocusableView>
              ))}
            </LeftMenu>
          </DefaultFocus>
        </Left>
        <Right>
          <RightList>
            {list.map((item) => (
              <RightListItem key={item.id}>
                <RightListItemCover source={{ uri: item.cover }} />
                <RightListItemTitle>
                  <RightListItemTitleText>电影名称</RightListItemTitleText>
                </RightListItemTitle>
              </RightListItem>
            ))}
          </RightList>
        </Right>
      </Pod>
    </Page>
  );
}
