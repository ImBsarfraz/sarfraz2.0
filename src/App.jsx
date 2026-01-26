import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import ParticlesBackground from './components/ParticlesBackground'
import CustomCuresor from './components/CustomCuresor'
import IntroAnimation from './components/IntroAnimations'

const App = () => {
  const [intrDone, setIntroDone] = useState(false);

  return (
    <>
      {!intrDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {
        intrDone && (
          <div className='relative gradient'>
            <CustomCuresor />
            {/* <ParticlesBackground /> */}
            <Navbar />
            <Home />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Testimonials />
            <Contact />
            <Footer />
          </div>
        )
      }
    </>
  )
}

export default App