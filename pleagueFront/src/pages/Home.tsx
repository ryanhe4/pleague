import * as React from 'react';
import { useTypedSelector } from '../rootReducer';
import Applayout from '../components/Applayout';

const Home: React.FC = () => {
  // const data = useTypedSelector((state) => state.user);

  return <Applayout>홈페이지</Applayout>;
};

export default Home;
