export function copyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(resolve).catch(reject)
    } else {
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        resolve()
      } catch (err) {
        reject(err)
      }
    }
  })
}
