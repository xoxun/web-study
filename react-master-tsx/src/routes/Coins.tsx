import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props)=>props.theme.cardBgColor};
  color: ${(props)=>props.theme.textColor};
  
  border-radius: 15px;
  margin-bottom: 10px;
  a{
    display: flex;
    text-align: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover{
    a{
      color: ${(props)=>props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
    font-size: 40px;
    font-weight: 800;
    color: ${(props)=>props.theme.accentColor};
   
`;
const Loader = styled.span`
  font-size: 30px;
  text-align: center;
`;

const Img = styled.img`
  width: 20px;
  margin-right: 10px;
`;

interface ICoin{
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}


function Coins( ){
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom =  useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev)=>!prev);
/* 
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    (async()=>{
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0,100));
      setLoading(false);
      console.log(coins);
    })();
  },[]) */

    return (
    <Container>
        <Header>
            <Title>Coin</Title>
            <button onClick={toggleDarkAtom}>Toggle Mode</button>
        </Header>
        {isLoading ?
        <Loader>Loading...</Loader> 
        : <CoinList>
            {data?.slice(0,100).map((coin)=>(
              <Coin key={coin.id}>
                <Link to={{
                  pathname:`/${coin.id}`,
                  state:{name:coin.name},
                }}>
                  <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
            
        </CoinList>
}
    </Container>);
}
export default Coins;