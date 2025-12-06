'use client'
import { useEffect, useState } from 'react'

const animatedSubtitle = [
  'La Tecnología',
  'Los Auriculares',
  'Los Joysticks',
  'Los Cables',
  'Los Parlantes',
  'Los Teclados',
  'Los Mouses',
  'Los Pendrives',
  'Las Consolas',
]

const SubtitleAnimation = () => {
  const [text, setText] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [loopIndex, setLoopIndex] = useState<number>(0)
  const [typingSpeed, setTypingSpeed] = useState<number>(100)

  useEffect(() => {
    const current: string =
      animatedSubtitle[loopIndex % animatedSubtitle.length]

    const handleTyping = () => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, prev.length - 1))
        setTypingSpeed(50)
      } else {
        setText((prev) => current.slice(0, prev.length + 1))
        setTypingSpeed(100)
      }

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopIndex((prev) => prev + 1)
      }
    }

    const timeout = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, loopIndex, typingSpeed])

  return (
    <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
      <span>Vos elegís {text}</span>
      <span className="cursor-blink border-r-2 border-black ml-1" />
    </h2>
  )
}

export default SubtitleAnimation
