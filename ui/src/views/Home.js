import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Store from "../stores/store";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TwitterIcon from "@material-ui/icons/Twitter";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import TwitterIcon from "@material-ui/icons/Twitter";

import { Link, useRouteMatch } from "react-router-dom";

const store = Store.store;
const emitter = Store.emitter;
const dispatcher = Store.dispatcher;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    // height: 250px;
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  width: 50%;
  top: 150px;
  font-size: 68px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 90%;
    top: 120px;
    font-size: 35px;
  }
`;

const DescriptionWrapper = styled.div`
  font-family: "Poppins";
  font-size: 25px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
  }
`;

const TextWrapper = styled.span`
  background-image: linear-gradient(
    124deg,
    #62fff2,
    #5351c5 34%,
    rgba(127, 57, 240, 0.9) 54%,
    #ff3ad8
  );
  text-shadow: none;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionTwo = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #050814;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: fit-content;
  }
`;

const SectionTwoFirstPart = styled.div`
  width: 100%;
  height: 410px;
  display: flex;
  justify-content: space-evenly;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    height: fit-content;
    align-items: center;
  }
`;

const SectionTwoTitle = styled.div`
  margin-top: 40px;
  width: 30%;
  height: 100%;
  color: white;
  font-size: 45px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    font-size: 30px;
    padding: 15px;
    text-align: center;
  }
`;

const SectionTwoVideo = styled.div`
  width: 30%;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: fit-content;
    margin-bottom: 25px;
  }
`;

const SectionThree = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #050814;
  color: white;
`;

const SectionThreeVideo = styled.div`
  margin-top: 40px;
  width: 80%;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.sm}{
    margin-bottom: 25px;
  }
`;

const SubtitleWrapper = styled.div`
  width: 100%;
  height: 15%;
  font-size: 58px;
  font-family: "Archivo Black";
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 35px;
  }
`;

const SectionFour = styled.div`
  min-height: 700px;
  padding-top: 100px;
  padding-bottom: 16px;
  background-color: #050814;
`;

const SubtitleTwo = styled.div`
  width: 100%;
  height: 100px;
  font-size: 50px;
  font-family: "Archivo Black";
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 32px;
    text-align:center;
  }
`;

const CardContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
  width: 80%;
  height: 100%;
  margin-top: 220px;
  margin-bottom: 100px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 150px;
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 20px;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  grid-column-gap: 48px;
  grid-row-gap: 150px;
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: auto;
    padding:0;
  }
`;

const GridItem = styled.div`
  background-color: #13151c;
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  width: 100%;
  height: 550px;
  border-radius: 15px;
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm}{
    height:580px;
  }
`;

const CardWrapper = styled(Link)`
  position: absolute;
  top: -100px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
`;

const CardImageWrapper = styled.img`
  max-height: 160px;
  margin-bottom: 15px;
`;

const CardTitle = styled.div`
  margin-bottom: 30px;
  color: #fff;
  font-family: "Archivo Black";
  font-size: 32px;
  font-weight: 700;
`;

const CardContent = styled.div`
  margin-top: 0px;
  margin-bottom: 10px;
  padding-left: 0;
  list-style: none;
  color: #c9c9c9;
  font-size: 16px;
  font-family: "Poppins";
`;

const LineWrapper = styled.div`
  margin-bottom: 10px;
  text-align: left;
`;

const FooterWrapper = styled.div`
  padding: 20px;
  padding-bottom: 15px;
  background-color: #171717;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <div>
      <VideoWrapper>
        <video
          style={{
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            // position: "absolute",
            margin: "auto",
            width: "100%",
            height: "100%",
            right: "-100%",
            bottom: "-100%",
            top: "-100%",
            left: "-100%",
            objectFit: "cover",
            zIndex: "-100",
          }}
          muted
          autoPlay
          loop
        >
          <source
            src="rocket-psychedelic-animation-for-colorful-nft-2022-01-18-20-26-02-utc.webm"
            type="video/mp4"
          />
        </video>
        <TitleWrapper>
          <div
            style={{
              fontFamily: "Archivo Black",
              textShadow: "0 2px 10px #f38aff",
            }}
          >
            <span>LUV</span>
            <span> NFT</span>
            <TextWrapper> ESTATE</TextWrapper>
          </div>
          <DescriptionWrapper>
            Donate, trade, collect and sell virtual properties based on
            real-world addresses.
          </DescriptionWrapper>
        </TitleWrapper>
      </VideoWrapper>
      <SectionTwo>
        <SectionTwoFirstPart>
          <SectionTwoTitle>
            <div
              style={{
                fontFamily: "Archivo Black",
                lineHeight: "1",
              }}
            >
              Donate to own a piece of the LUV Metaverse virtual real estate.
            </div>
            <div
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                marginTop: "30px",
              }}
            >
              Experience true ownership with digital assets. Buy back the world.
            </div>
            <div
              style={{
                width: "200px",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                marginTop: "40px",
                height: "40px",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <a
                href="https://app.pitch.com/app/presentation/e393f6a0-e52c-4b62-a8af-ea0aeafbd3dc/125d0833-c10b-4a3f-8c80-db75e6b3dc77"
                style={{}}
              >
                Learn more
                <ArrowRightIcon />
              </a>
            </div>
          </SectionTwoTitle>
          <SectionTwoVideo>
            <div>
              <iframe
                src="https://discord.com/widget?id=910051231437819914&theme=dark"
                allowtransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                style={{ width: "300px", height: "400px" }}
              ></iframe>
            </div>
          </SectionTwoVideo>
        </SectionTwoFirstPart>
      </SectionTwo>
      <SectionThree>
        <SubtitleWrapper>🌎 THE LNE GAME</SubtitleWrapper>
        <SectionThreeVideo>
          <iframe
            src="https://www.youtube.com/embed/wTYi2W18REE?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
            allowtransparency="true"
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            style={{ width: "100%", height: "100%" }}
          ></iframe>
        </SectionThreeVideo>
      </SectionThree>
      <SectionFour>
        <SubtitleTwo>🏁 BUY BACK THE WORLD</SubtitleTwo>
        <CardContainer>
          <GridWrapper>
            <GridItem>
              <CardWrapper to={`/market`}>
                <CardImageWrapper src="images/Element_1.png" />
                <CardTitle>🏁Land📍</CardTitle>
                <CardContent>
                  <LineWrapper>
                    All 5️⃣D LUVRS have the right to own virtual real estate.
                  </LineWrapper>
                  <LineWrapper>
                    💼 In 2021 Metaverse land increased in value 500%
                  </LineWrapper>
                  <LineWrapper>
                    🌇 In 2021 $500 million worth of virtual real estate sold
                  </LineWrapper>
                  <LineWrapper>🎁 LUV NFT estate make a great gift</LineWrapper>
                </CardContent>
              </CardWrapper>
            </GridItem>
            <GridItem>
              <CardWrapper to={`/market`}>
                <CardImageWrapper src="images/Element_2.png" />
                <CardTitle>💙Haus🔑</CardTitle>
                <CardContent>
                  <LineWrapper>
                    🚪 If you own a Haus you can rent out a room to a 5️⃣D LUVR
                  </LineWrapper>
                  <LineWrapper>
                    🪙 Sell your home attached to your LUV NFT Estate
                  </LineWrapper>
                  <LineWrapper>🧸 Own your childhood home</LineWrapper>
                </CardContent>
              </CardWrapper>
            </GridItem>
            <GridItem>
              <CardWrapper to={`/market`}>
                <CardImageWrapper src="images/Element_3.png" />
                <CardTitle>🛏Hotel🛎</CardTitle>
                <CardContent>
                  <LineWrapper>
                    Donate to own a virtual Hotel in your city. Verified hotel
                    owners can create NFT time share rooms
                  </LineWrapper>
                  <LineWrapper>
                    🚪 Find a same day NFT auction room deal
                  </LineWrapper>
                  <LineWrapper>
                    🍷 Barter a NFT drink at the bar for a real life drink
                  </LineWrapper>
                  <LineWrapper>
                    🍤 Barter NFT food at a restaurant for real life food
                  </LineWrapper>
                </CardContent>
              </CardWrapper>
            </GridItem>
            <GridItem>
              <CardWrapper to={`/market`}>
                <CardImageWrapper src="images/Element_4.png" />
                <CardTitle>🏈Stadium⚽️</CardTitle>
                <CardContent>
                  <LineWrapper>
                    Every true sports fan wants to own the stadium of their
                    favorite team. Anything is possible in LUV NFT Estate
                  </LineWrapper>
                  <LineWrapper>
                    ⚾️ Donate to own a baseball, football or basketball stadium
                    in your city with no politics
                  </LineWrapper>
                  <LineWrapper>
                    🏉 Add your shiny 5️⃣D LUVR to your social media profile
                    picture to let other's know you’re in the game
                  </LineWrapper>
                </CardContent>
              </CardWrapper>
            </GridItem>
            <GridItem>
              <CardWrapper to={`/market`}>
                <CardImageWrapper src="images/Element_5.png" />
                <CardTitle>🗿Landmark🗼</CardTitle>
                <CardContent>
                  <LineWrapper>
                    Own a LUV NFT Estate Landmark in the Metaverse.
                  </LineWrapper>
                  <LineWrapper>
                    🗼Own the Tokyo Tower is the second-tallest building in
                    Japan, located in Minato, Tokyo
                  </LineWrapper>
                  <LineWrapper>
                    🗻Own Mount Fuji (called Fuji-san in Japan) is the largest
                    mountain in Japan
                  </LineWrapper>
                  <LineWrapper>
                    🗿Own a moai, one of the famed, giant stone statues of human
                    figures on Easter Island
                  </LineWrapper>
                </CardContent>
              </CardWrapper>
            </GridItem>
            <GridItem>
              <CardWrapper to={`/market`}>
                <CardImageWrapper src="images/Element_6.png" />
                <CardTitle>🛍️Store🛒</CardTitle>
                <CardContent>
                  <LineWrapper>
                    Boss up and own a NFT store that allows you to operate your
                    business in the LUV Metaverse
                  </LineWrapper>
                  <LineWrapper>
                    🛍️ Put your store on the Metaverse business directory
                  </LineWrapper>
                  <LineWrapper>🛒 Auction LUV NFT products</LineWrapper>
                  <LineWrapper>
                    ⌛ Rent out your LUV NFT services and products by the hour
                  </LineWrapper>
                </CardContent>
              </CardWrapper>
            </GridItem>
          </GridWrapper>
        </CardContainer>
      </SectionFour>
      <FooterWrapper>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <div>
            <div style={{ fontFamily: "Archivo Black", fontSize: "24px" }}>
              LUV NFT ESTATE
            </div>
            <div>Powered by Harmony ONE</div>
            <div> 2022 LUV Network</div>
          </div>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "16px" }}>
              <TwitterIcon fontSize="large" />
            </div>
            <div style={{ marginLeft: "16px" }}>
              <SocialIcon></SocialIcon>
            </div>
            <div style={{ marginLeft: "16px" }}>
              <TwitterIcon fontSize="large" />
            </div>
            <div style={{ marginLeft: "16px" }}>
              <TwitterIcon fontSize="large" />
            </div>
          </div> */}
        </div>
      </FooterWrapper>
    </div>
  );
}
