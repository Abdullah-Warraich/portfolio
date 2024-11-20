import { Container, ContainerSucces } from './styles'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import emailjs from 'emailjs-com'
import validator from 'validator'

export function Form() {
  const [validEmail, setValidEmail] = useState(false)
  const [message, setMessage] = useState('')
  const [buttonText, setButtonText] = useState('Submit')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function verifyEmail(email: string) {
    setValidEmail(validator.isEmail(email))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validEmail && message) {
      setIsSubmitting(true)
      setButtonText('Submitting...')
      
      const formData = {
        email: (e.currentTarget.email as HTMLInputElement).value,
        message: (e.currentTarget.message as HTMLTextAreaElement).value
      }
      
      emailjs.send('service_rv60y0n', 'template_x85moje', formData, 'FtTOKEnRdNlLd2ZHb')
        .then((result) => {
          setButtonText('Submit')
          setIsSubmitting(false)
          toast.success('Request Added successfully. We will shortly contact you.')
        }, (error) => {
          setButtonText('Submit')
          setIsSubmitting(false)
          toast.error('Error while submitting request.')
        })
    } else {
      toast.error('Please enter a valid email and message.')
    }
  }

  return (
    <Container>
      <h2>Get in touch using the form</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={(e) => {
            verifyEmail(e.target.value)
          }}
          required
        />
        <textarea
          required
          placeholder="Send a message to get started."
          id="message"
          name="message"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <button
          type="submit"
          disabled={isSubmitting || !validEmail || !message}
        >
          {buttonText}
        </button>
      </form>
      <ToastContainer />
    </Container>
  )
}
