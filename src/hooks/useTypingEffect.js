import { useState, useEffect } from "react"

const useTypingText = (text, speed = 100, loop = true) => {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1))
      if (index < text.length) {
        setIndex((prev) => prev + 1)
      } else if (loop) {
        setIndex(0)
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [index, text, speed, loop])

  return displayedText
}

export default useTypingText
