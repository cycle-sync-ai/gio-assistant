import { themeGet } from '@styled-system/theme-get';
import styled from 'styled-components';
import { rgba } from 'polished';



const Section = styled.section`
    background: linear-gradient(180deg, #FEF5F9 0%,#925B9F 100%);
    position: relative;
    z-index: 0;
    overflow: hidden;
    @media (min-width: 1280px) {
      margin-bottom: 50px;
    }
`;

export const BannerContentWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-wrap: wrap;
  min-height: 700px;
  @media (min-width: 1401px) {
    height: 100vh;
    min-height: 920px;
  }
  @media (max-width: 1400px) {
    height: 90vh;
    min-height: 810px;
  }
  @media (max-width: 1024px) {
    height: auto;
    min-height: 700px;
    padding-top: 100px;
  }
  @media (max-width: 991px) {
    min-height: 640px;
    padding-top: 70px;
  }
  @media (max-width: 600px) {
    min-height: auto;
    padding-top: 130px;
    padding-bottom: 100px;
  }
`;

export const BannerContent = styled.div`
  align-self: center;
  max-width: 650px;
  @media (max-width: 1219px) {
    max-width: 500px;
  }
  @media (max-width: 768px) {
    max-width: 550px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    text-align: center;
  }
  .banner-title {
    color: #ffffff;
    font-weight: 700;
    font-size: 60px;
    line-height: 1.3;
    letter-spacing: -0.8px;
    margin-bottom: 23px;
    @media (max-width: 1563px) {
      font-size: 40px;
    }
    @media (max-width: 768px) {
      font-size: 32px;
    }
    @media (max-width: 600px) {
      // font-size: 24px;
      font-size: 26px;
      line-height: 1.8;
    }
    @media (max-width: 520px) {
    }
  }
  @media (max-width: 600px) {
    .button-group {
      img {
        max-width: 120px;
      }
    }
  }
`;

export const BannerText = styled.div`
    font-size: 20px;
    line-height: 2.22;
    color: #ffffff;
    opacity: 1;
    max-width: 534px;
    margin-bottom: 30px;
    @media (max-width: 991px) {
      margin-left: auto;
      margin-right: auto;
    }
    @media (max-width: 600px) {
      // font-size: 16px;
      font-size: 13px;
      line-height: 2;
    }
    > p {
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const Figure = styled.figure`
  margin: 0;
  align-self: flex-end;
  margin-bottom: -7px;
  width: calc(100% - 650px);
  @media (min-width: 1280px) {
    margin-left: 111px;
    margin-right: -111px;
  }
  @media (max-width: 1563px) {
    margin-left: 71px;
    margin-right: -71px;
    width: calc(100% - 770px);
  }

  @media (max-width: 1219px) {
    width: calc(100% - 500px);
  }
  @media (max-width: 991px) {
    display: none;
  }
`;

export const HighlightedText = styled.p`
  line-height: 1;
  margin-bottom: 25px;
  margin-top: 0;

  border-radius: 80px;
  padding: 3px 28px 3px 4px;
  font-size: 14px;
  font-weight: 400;
  color: ${themeGet('colors.label', '#02073E')};
  background-color: ${themeGet('colors.white', '#FFF')};
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 15px rgba(67, 99, 136, 0.04);
  display: inline-flex;
  align-items: center;

  @media only screen and (max-width: 767px) {
    margin: 0 0 30px;
    padding: 3px 15px 4px 3px;
  }
  @media (max-width: 500px) {
    padding-left: 5px;
    padding-right: 8px;
  }
  @media (max-width: 400px) {
    padding-left: 8px;
  }

  > img {
    margin-left: 9px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 12px;
  }

  strong {
    padding: 6px 8px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0;
    color: ${themeGet('colors.white', '#FFF')};
    background-color: ${themeGet('colors.primary', '#FDEF00')};
    margin-right: 10px;
    display: inline-block;
    @media only screen and (max-width: 500px) {
      margin-right: 5px;
      font-size: 9px;
    }
    @media (max-width: 400px) {
      display: none;
    }
  }
`;

export const SubscribeField = styled.div`
  border: 2px solid ${themeGet('colors.white')};
  border-radius: 5px;
  width: 325px;
  display: flex;
  align-items: center;
  padding-left: 22px;
  margin-right: 15px;
  @media only screen and (max-width: 991px) {
    padding-left: 12px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
    margin-right: 0;
  }
  .reusecore__input {
    width: 100%;
  }
  .select__control {
    border: 0px solid;
    background-color: transparent;
    box-shadow: 0 0 0;
    cursor: pointer;
    .select__value-container {
      width: 50px;
      padding: 0;
    }
    .select__placeholder,
    .select__single-value {
      font-size: 18px;
      font-weight: 700;
      color: ${themeGet('colors.white')};
    }
    .select__indicator-separator {
      display: none;
    }
    .select__indicators .select__indicator {
      padding: 0;
      .css-6q0nyr-Svg {
        fill: ${themeGet('colors.white')};
        height: 16px;
        margin-left: -10px;
      }
    }
  }
  .field-wrapper {
    input {
      font-size: 16px;
      min-height: 55px;
      padding: 0 25px 0 12px;
      border-radius: 8px;
      background-color: transparent;
      border: 0px solid;
      color: ${themeGet('colors.white')};
      font-family: 'DM Sans', sans-serif;
      ::placeholder {
        color: ${rgba('#ffffff', 0.8)};
        opacity: 1; /* Firefox */
      }
      &:focus {
        border-color: #ffffff;
      }

      @media only screen and (max-width: 1280px) {
        min-height: 50px;
      }
    }
  }
`;

export const Subscribe = styled.div`
  display: flex;
  margin-top: 40px;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
  button {
    background-color: ${themeGet('colors.white')};
    min-width: 120px;
    border-radius: 7px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 17px;
    color: #19191b;
    @media only screen and (max-width: 480px) {
      min-width: 100%;
      margin-top: 15px;
    }
    &:hover {
      color: ${themeGet('colors.primary')};
    }
  }
`;

export default Section;
