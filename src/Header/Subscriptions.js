import React from 'react';
import styled from 'styled-components';
import Item from "./NotificationItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`;

const subscriptions = [
  {
    body: "Pavel Durov",
    icon: "https://www.spot.uz/media/img/2020/10/OiUFM616023113662615_l.jpg"
  },
  {
    body: "Lana Rhouds",
    icon: "https://fs.kinomania.ru/file/person/9/bd/9bd969bc03449a49b712942745b3d52b.jpeg"
  },
  {
    body: "LeoLulu",
    icon: "https://s10.favim.com/orig/160418/quote-blonde-jay-alvarrez-alexis-ren-Favim.com-4223665.jpeg"
  }, {
    body: "Eva elfie",
    icon: "https://i.redd.it/dk16h5ihwvj51.jpg"
  }
];

const Title = styled.span`
  font-size: 1.3rem;
`;

const More = styled.span`
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  color: ${props => props.theme.activecold};
  @media(min-width: 768px) {
    text-align: start;
  }
`;

const Subscriptions = () => {
  return (
    <Wrapper>
    <Title>Мои подписки</Title>
      {
        subscriptions.map((i, index) => <Item i={i} />)
      }
      <More>Показать больше</More>
    </Wrapper>
  )
};

export default Subscriptions;
