import React, { memo, useState, useCallback } from 'react'
import anime from 'animejs'
import styled from 'styled-components'
/* animation */
import { Player } from '@lottiefiles/react-lottie-player'
/* animation data */
import TypographyMotion from '../assets/json/animation/typography.json';
/* @material-ui icons */
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import YouTubeIcon from '@material-ui/icons/YouTube'
/* components */
import Link from '../components/Link'
import MotionText from '../components/Text'
/* resources */
import '../assets/css/font.css'
import Icon from '../assets/images/jpnykw.png'
import SoundCloudIcon from '../assets/svg/soundcloud-brands.svg'
/* extend */
import '../lib/string.extend.ts'

const minX = 150
const minY = 100

/* naming */
const Elements = styled.div``

/* styling */
const Motion = styled.div`
  position: relative;
  top: ${innerHeight / 2}px;
`

const Element = styled.div`
  opacity: 0;
  cursor: pointer;
`

const Contents = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: grid;
  place-items: center;
`

const StyledImg = styled.img`
  width: 180px;
  position: relative;
  top: 0px;
  border-radius: 90px;
  opacity: 0;
  cursor: pointer;
`

const RandomElements = memo(() => {
	return (
		<Motion>
			<Elements
				className="fragments center"

				ref={() => {
					anime({
						targets: '.fragments .el',
						translateX: (el: HTMLElement) => {
							return Number(el.getAttribute('data-x')) + anime.random(-20, 30)
						},
						translateY: (el: HTMLElement) => {
							return Number(el.getAttribute('data-y')) + anime.random(-50, 50)
						},
						scale: () => {
							return 2
						},
						rotate: () => {
							return anime.random(-360, 360)
						},
						borderRadius: () => {
							return ['50%', anime.random(10, 35) + '%']
						},
						duration: () => {
							return anime.random(1400, 1800)
						},
						delay: () => {
							return anime.random(900, 1100)
						},
						opacity: (el: HTMLElement) => {
							return Number(el.getAttribute('data-opacity')) || 1
						},
					})
				}}

				style={{
					height: '100px',
					width: '100px',
				}}
			>
				<Element
					data-x="-200" data-y="-60" className="small circle el"
					style={
						{
							width: '14px',
							height: '14px',
							background: 'rgba(164, 255, 79)'
						}
					}
				/>
				<Element
					data-x="200" data-y="190" className="small circle el"
					style={
						{
							width: '12px',
							height: '12px',
							background: 'rgba(79, 255, 164)'
						}
					}
				/>
				<Element
					data-x="170" data-y="-260" className="small circle el"
					style={
						{
							width: '10px',
							height: '10px',
							background: 'rgba(255, 164, 79)'
						}
					}
				/>
			</Elements>

			<Elements
				className="star center"

				ref={() => {
					anime({
						targets: '.star .el',
						translateX: function(el: HTMLElement) {
							return Number(el.getAttribute('data-x')) + anime.random(-20, 30)
						},
						translateY: function(el: HTMLElement) {
							return Number(el.getAttribute('data-y')) + anime.random(-50, 50)
						},
						duration: function() {
							return anime.random(1800, 2600)
						},
						delay: function() {
							return anime.random(1200, 1300)
						},
						borderRadius: 100,
						opacity: 0.2,
						scale: 3,
					})
				}}
			>
				{
					Array(30).fill(null).map((_, id) => {
						const x = (minX + Math.random() * (innerWidth - minX)) * (Math.random() < .5 ? 1 : -1)
						const y = (minY + Math.random() * (innerHeight - minY)) * (Math.random() < .5 ? 1 : -1)
						const px = 1 + Math.random() * 1.5

						return (
							<Element
								key={id}
								data-x={x / 2}
								data-y={y / 2}
								className="small circle el"
								style={
									{
										opacity: '0',
										width: `${px}px`,
										height: `${px}px`,
										background: 'rgb(244, 244, 244)',
									}
								}
							/>
						)
					})
				}
			</Elements>
		</Motion>
	)
})

const AboutMe: React.FC = () => {
  const [animatedIcon, setAnimatedIcon] = useState(false)
  const icon_size = 24

  const handleClickIcon = useCallback((event: any) => {
    if (!animatedIcon) {
      setAnimatedIcon(true)
      event.target.style.animation = 'spin 800ms ease-in-out 0s 1 normal'
      setTimeout(() => {
        event.target.style.animation = ''
        setAnimatedIcon(false)
      }, 800);
    }
  }, [])

  return (
    <>
			<RandomElements />
      <Contents>
        <div
					style={{
						textAlign: 'center',
						position: 'absolute',
						transform: 'translate(-50%, -50%)',
						left: '50%',
						top: '50%',
					}}
				>
          <StyledImg
            src={Icon}
            onClick={handleClickIcon}
            ref={(ref) => {
              anime({
                targets: ref,
                opacity: 1,
                translateY: 150,
                easing: 'spring(1, 80, 10, 0)',
                delay: 800,
                duration: 400,
              })
            }}
          />

          <Player
            keepLastFrame={true}
            background="transparent"
            src={TypographyMotion}
            style={{
              width: '400px',
              height: '400px',
              pointerEvents: 'none',
            }}
            ref={(ref) => {
              setTimeout(() => {
                if (ref === null) return null;
                ref!.play()
              }, 900)
            }}
          />

          <div
            ref={(ref) => {
              anime({
                targets: ref,
                opacity: 1,
                translateY: -160,
                easing: 'spring(1, 80, 10, 0)',
                delay: 990,
                duration: 400,
              })
            }}
						style={{
							color: '#777',
						}}
          >
            <MotionText
              text="an engineer who likes cats"
              delay={1160}
              cooltime={30}
              fontSize={16}
            />
          </div>

          <div>
            <Link delay={1280} icon={<TwitterIcon style={{fontSize: `${icon_size - 6}px`}} />} text="Twitter" href="https://twitter.com/jpnykw" />
            <Link delay={1340} icon={<GitHubIcon style={{fontSize: `${icon_size - 6}px`}} />} text="GitHub" href="https://github.com/jpnykw" />
            <Link delay={1400} icon={<YouTubeIcon style={{fontSize: `${icon_size}px`}} />} text="YouTube" href="https://www.youtube.com/channel/UCmpA3l3QF0VI4nvNVADXoyg/featured" />
            <Link delay={1460} icon={<SoundCloudIcon width={`${icon_size}px`} />} text="SoundCloud" href="https://soundcloud.com/jpnykw" />
          </div>
        </div>
      </Contents>
    </>
  )
}

export default AboutMe
