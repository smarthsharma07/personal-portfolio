import React, { useEffect, useRef, useState } from 'react'
import './BackgroundSystem.css'

const BackgroundSystem = () => {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 }) // Use a ref for mouse to prevent unnecessary re-renders

    // Mouse tracking for parallax using Ref to keep animation smooth
    useEffect(() => {
        const handleMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
    }, [])

    // Star Field (Data Nodes) Animation
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = window.innerWidth
        let height = window.innerHeight
        canvas.width = width
        canvas.height = height

        const stars = []
        // --- MODIFICATIONS START ---
        const numStars = 400; // Increased from 100 for higher density
        const speed = 0.8;    // Increased from 0.2 for faster movement
        // --- MODIFICATIONS END ---

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 2 + 0.5, // Depth for parallax
                size: Math.random() * 1.5,
                alpha: Math.random()
            })
        }

        let animationFrameId

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // Parallax offset using the ref
            const offsetX = (mouseRef.current.x - width / 2) * 0.02
            const offsetY = (mouseRef.current.y - height / 2) * 0.02

            ctx.fillStyle = '#ffffff'
            stars.forEach(star => {
                // Update position (Falling effect)
                star.y -= speed * star.z
                
                // Reset star to bottom when it leaves the top
                if (star.y < 0) {
                    star.y = height
                    star.x = Math.random() * width
                }

                // Draw
                ctx.globalAlpha = star.alpha * 0.5
                ctx.beginPath()
                // Apply parallax based on depth (z)
                ctx.arc(star.x + (offsetX * star.z), star.y + (offsetY * star.z), star.size, 0, Math.PI * 2)
                ctx.fill()
            })
            animationFrameId = requestAnimationFrame(render)
        }

        render()

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
        }
    }, []) // Removed [mouse] dependency to prevent star-field jittering

    return (
        <div className="background-system">
            <canvas ref={canvasRef} className="star-canvas" />

            {/* Digital Circuits Overlay */}
            <svg className="circuit-overlay" width="100%" height="100%">
                <defs>
                    <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0, 240, 255, 0)" />
                        <stop offset="50%" stopColor="rgba(0, 240, 255, 1)" />
                        <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
                    </linearGradient>
                </defs>
                <path className="circuit-path" d="M 100 0 V 100 H 200 V 300" />
                <path className="circuit-path" d="M 80% 100% V 80% H 60% V 60%" />
                <path className="circuit-path" d="M 0 50% H 10% L 15% 55% H 30%" />
                <path className="circuit-path delay-1" d="M 100% 20% H 90% L 85% 25% H 70%" />

                <circle className="circuit-node" cx="200" cy="300" r="2" />
                <circle className="circuit-node" cx="60%" cy="60%" r="2" />
            </svg>
        </div>
    )
}

export default BackgroundSystem
