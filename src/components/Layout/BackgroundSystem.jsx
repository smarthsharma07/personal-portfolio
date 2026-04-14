import React, { useEffect, useRef } from 'react'
import './BackgroundSystem.css'

const BackgroundSystem = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let w, h
        let stars = []
        let shootingStars = []
        let raf

        const resize = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
        }

        // Star layers: far (slow, dim), mid, near (fast, bright)
        const createStars = () => {
            stars = []
            const layers = [
                { count: 200, speed: 0.08, sizeRange: [0.3, 0.8], opacity: 0.3 },
                { count: 120, speed: 0.15, sizeRange: [0.5, 1.2], opacity: 0.5 },
                { count: 60, speed: 0.25, sizeRange: [1.0, 2.0], opacity: 0.8 },
            ]
            layers.forEach(layer => {
                for (let i = 0; i < layer.count; i++) {
                    stars.push({
                        x: Math.random() * w,
                        y: Math.random() * h,
                        size: layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
                        speed: layer.speed,
                        baseOpacity: layer.opacity,
                        twinkleSpeed: 0.005 + Math.random() * 0.02,
                        twinkleOffset: Math.random() * Math.PI * 2,
                    })
                }
            })
        }

        const spawnShootingStar = () => {
            if (shootingStars.length >= 2) return
            const startX = Math.random() * w * 0.8
            const startY = Math.random() * h * 0.3
            shootingStars.push({
                x: startX,
                y: startY,
                vx: 4 + Math.random() * 4,
                vy: 2 + Math.random() * 3,
                life: 0,
                maxLife: 40 + Math.random() * 30,
                trail: [],
            })
        }

        let time = 0
        const animate = () => {
            time++
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
            ctx.fillRect(0, 0, w, h)

            // Stars
            stars.forEach(s => {
                const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7
                const opacity = s.baseOpacity * twinkle
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
                ctx.fill()

                // Subtle cross on bright stars
                if (s.size > 1.5 && twinkle > 0.85) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
                    ctx.lineWidth = 0.5
                    const len = s.size * 3
                    ctx.beginPath()
                    ctx.moveTo(s.x - len, s.y)
                    ctx.lineTo(s.x + len, s.y)
                    ctx.stroke()
                    ctx.beginPath()
                    ctx.moveTo(s.x, s.y - len)
                    ctx.lineTo(s.x, s.y + len)
                    ctx.stroke()
                }

                // Slow drift
                s.y += s.speed
                if (s.y > h + 5) {
                    s.y = -5
                    s.x = Math.random() * w
                }
            })

            // Shooting stars
            shootingStars.forEach((ss, idx) => {
                ss.life++
                ss.x += ss.vx
                ss.y += ss.vy
                ss.trail.push({ x: ss.x, y: ss.y })
                if (ss.trail.length > 20) ss.trail.shift()

                // Draw trail
                for (let i = 0; i < ss.trail.length; i++) {
                    const alpha = (i / ss.trail.length) * (1 - ss.life / ss.maxLife) * 0.8
                    const size = (i / ss.trail.length) * 2
                    ctx.beginPath()
                    ctx.arc(ss.trail[i].x, ss.trail[i].y, size, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
                    ctx.fill()
                }

                if (ss.life > ss.maxLife || ss.x > w || ss.y > h) {
                    shootingStars.splice(idx, 1)
                }
            })

            // Random shooting star spawn
            if (Math.random() < 0.003) spawnShootingStar()

            raf = requestAnimationFrame(animate)
        }

        resize()
        createStars()
        animate()

        window.addEventListener('resize', () => {
            resize()
            createStars()
        })

        return () => {
            cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef} className="starfield-canvas" />
            <div className="grid-schema" />
        </>
    )
}

export default BackgroundSystem
