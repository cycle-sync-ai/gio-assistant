"use client"

import { MantineProvider } from '@mantine/core';

import 'animate.css';
import ResetCSS from '@/common/assets/css/style';
import { DrawerProvider } from '@/common/contexts/DrawerContext';
import { theme } from '@/common/theme/appCreative2';
import AnalyticsTool from '@/containers/AppCreative2/AnalyticsTool';
import {
  ContentWrapper,
  GlobalStyle,
} from '@/containers/AppCreative2/appCreative2.style';
import Banner from '@/containers/AppCreative2/Banner';
import CTA from '@/containers/AppCreative2/CTA';
import EverNeed from '@/containers/AppCreative2/EverNeed';
import FAQ from '@/containers/AppCreative2/FAQ';
import Footer from '@/containers/AppCreative2/Footer';
import Navbar from '@/containers/AppCreative2/Navbar';
import PricingPolicy from '@/containers/AppCreative2/PricingPolicy';
import Technology from '@/containers/AppCreative2/Technology';
import WalletExperience from '@/containers/AppCreative2/WalletExperience';
import WhyYouChoose from '@/containers/AppCreative2/WhyYouChoose';
import Head from 'next/head';
import React, { Fragment } from 'react';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import NoSSR from '@/common/components/NoSSR';
import { withTheme } from 'styled-components'


const Landing = () => {
  return (
    <MantineProvider defaultColorScheme="light">

      <ThemeProvider theme={theme}>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <Banner />
          <WhyYouChoose />
          <AnalyticsTool />

          <NoSSR>
            <EverNeed />
          </NoSSR>
          <WalletExperience />
          <Technology />
          <div className="app_creative_combined_section_wrapper">
            <NoSSR>
              <PricingPolicy className="pricing_policy" />
            </NoSSR>
            <div
              className="app_creative_dark_section app_creative_section"
              style={{ backgroundColor: `${theme?.colors?.dark}` }}
            >
              <FAQ className="faq_section" />
              <CTA className="cta_section" />
            </div>
          </div>
          <Footer />
        </ContentWrapper>
      </ThemeProvider>
    </MantineProvider>
  )
}

export default withTheme(Landing);