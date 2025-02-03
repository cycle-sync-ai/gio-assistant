import bannerImage from '@/common/assets/image/appCreativeTwo/banner_image.png';
import arrowIcon from '@/common/assets/image/appCreativeTwo/icons/arrow.png';
import Box from '@/common/components/Box';
import Heading from '@/common/components/Heading';
import Image from '@/common/components/Image';
import NextImage from '@/common/components/NextImage';
import Container from '@/common/components/UI/Container';
import Input from '@/common/components/Input';
import Button from '@/common/components/Button';
import Select from '@/common/components/Select';
import { bannerData } from '@/common/data/AppCreative2';
import Link from 'next/link';
import { useRef, useState } from 'react';

import React from 'react';
import Section, {
  BannerContent, BannerContentWrapper, BannerText, Figure,
  HighlightedText,
  Subscribe,
  SubscribeField,
} from './banner.style';
import { availableStore } from '@/common/data/AppCreative2';

import { addPhoneNumberIntoWaitlist } from './actions'
import { sendMessage } from '@/utils/twilio/sendMessage';

const Banner = () => {
  const { title, text, button, news, newsLabel } = bannerData;
  const { numberPrefix } = availableStore;
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isAddWaitList, setIsAddWaitList] = useState(false);

  return (
    <Section id="home">
      <Container width="1400px">
        <BannerContentWrapper>
          <BannerContent>
            <HighlightedText>
              <strong>{news}</strong>
              {newsLabel}
              <Image src={arrowIcon?.src} alt={newsLabel} />
            </HighlightedText>
            <Heading
              className="animate__animated animate__fadeInUp banner-title"
              content={title}
            />
            <BannerText>
              <div className="animate__animated animate__fadeInUp">
                {text}
              </div>
            </BannerText>
            {
              !isAddWaitList ?
                <Subscribe>
                  <SubscribeField>
                    <Select
                      options={numberPrefix}
                      placeholder="+1"
                      className="phone_search_select"
                      aria-label="select options"
                    />
                    <Input
                      inputType="text"
                      placeholder="Phone Number"
                      iconPosition="left"
                      aria-label="number"
                      value={phoneNumber}
                      onChange={(value) => {
                        setPhoneNumber(value);
                      }}
                    />
                  </SubscribeField>
                  <Button title="Join Waitlist" type="button" onClick={
                    (async () => {
                      setIsAddWaitList(await addPhoneNumberIntoWaitlist(phoneNumber));
                      sendMessage('Thank you for joining our waitlist', phoneNumber);
                    })
                  } />
                </Subscribe>
                :
                <BannerText>Thank you for joining our waitlist</BannerText>
            }

          </BannerContent>
          <Figure className="animate__animated animate__fadeInUp animate__fast">
            <NextImage src={bannerImage} alt="dashboard" />
          </Figure>
        </BannerContentWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
