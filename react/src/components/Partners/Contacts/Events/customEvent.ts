const subscribe = (eventName: string, listener: EventListener) => {
  document.addEventListener(eventName, listener)
}

const unsubscribe = (eventName: string, listener: EventListener) => {
  document.removeEventListener(eventName, listener)
} 

const publish = (eventName: string) => {
  const event = new CustomEvent(eventName)
  document.dispatchEvent(event)
}

export { publish, subscribe, unsubscribe}