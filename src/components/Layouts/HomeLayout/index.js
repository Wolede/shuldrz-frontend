import React from 'react'
import Hero from './Hero'
import About from './About'
import Comms from './Comms'
import HeroesWall from './HeroesWall'
import JoinBoxes from './JoinBoxes'
import FAQ from './FAQ'

const HomeLayout = () => {
    return (
        <>
            <Hero />
            <About/>
            <Comms/>
            <HeroesWall/>
            <FAQ/>
            <JoinBoxes/>
        </>
    )
}

export default HomeLayout
