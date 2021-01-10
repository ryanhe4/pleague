import * as React from 'react';
import { useTypedSelector } from '../rootReducer';
import Applayout from '../components/Applayout';

const Home = () => {
  const data = useTypedSelector(((state) => state.user));

  return (
    <Applayout>
      아이디 :
      {' '}
      {data.id}
      이름 :
      {' '}
      {data.name}
    </Applayout>
  );
};

export default Home;
