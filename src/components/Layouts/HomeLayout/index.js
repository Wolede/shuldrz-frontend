import React from 'react'
import Hero from './Hero'
import About from './About'
import Comms from './Comms'
import HeroesWall from './HeroesWall'
import JoinBoxes from './JoinBoxes'
import FAQ from './FAQ'

const HomeLayout = ({home}) => {
    const { 
        heroTitle,
        heroImage,
        qAndA,
        aboutTitle,
        aboutContent,
        featuresTitle,
        featuresContent,
        featuresImage,
        HeroesWallTitle,
        HeroesWallContent,
        faqTitle,
        faqContent, 
        guestSignupText,
        volunteerSignupText,
    } = home

    return (
        <>
            <Hero 
                heroTitle={heroTitle}
                heroImage={heroImage.url}
            />
            <About
                aboutTitle={aboutTitle}
                aboutContent={aboutContent}
            />
            <Comms
                featuresTitle={featuresTitle}
                featuresContent={featuresContent}
                featuresImage={featuresImage.url}
            />
            <HeroesWall
                heroesWallTitle={HeroesWallTitle}
                heroesWallContent={HeroesWallContent}
            />
            <FAQ 
                faqs={qAndA} 
                faqTitle={faqTitle}
                faqContent={faqContent}
            />
            <JoinBoxes
                guestSignupText={guestSignupText}
                volunteerSignupText={volunteerSignupText}
            />
        </>
    )
}

export default HomeLayout
