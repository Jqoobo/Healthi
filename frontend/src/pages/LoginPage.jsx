import React, { useState, useEffect} from "react";
import styled from "styled-components";
import LogoImage from "../assets/Images/logo_healthi_2.svg";
import Image1 from "../assets/Images/1.jpg";
import Image2 from "../assets/Images/2.jpg";
import Image3 from "../assets/Images/3.jpg";
import Image4 from "../assets/Images/4.jpg";
import Image5 from "../assets/Images/5.jpg";
import Image6 from "../assets/Images/6.jpg";
import Image7 from "../assets/Images/7.jpg";
import Image8 from "../assets/Images/8.jpg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";


const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 2;
  position: relative;
  @media (max-width: 700px) {
    display: none;
  }
`;
const Logo = styled.img`
  position: absolute;
  width: 80px;
  top: 40px;
  left: 60px;
  z-index: 10;
`;
const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  flex: 3;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const LoginPage = () => {
  const [login, setLogin] = useState(false);

  const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8];
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const newRandomImage = images[randomIndex];
    if (newRandomImage !== randomImage) {
      const image = new window.Image();
      image.src = newRandomImage;
      image.onload = () => {
        setRandomImage(newRandomImage);
      };
    }
  }, []);

  return (
    <Container>
      <Left>
        
        <Image src={randomImage} />
      </Left>
      <Right>
      <Logo src={LogoImage} />
        {!login ? (
          <>
            <SignIn />
            <Text>
              Nie posiadasz konta w Healthi?{" "}
              <TextButton onClick={() => setLogin(true)}>Zarejestruj się</TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignUp />
            <Text>
              Posiadasz już konto w Healthi?{" "}
              <TextButton onClick={() => setLogin(false)}>Zaloguj się</TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};

export default LoginPage;