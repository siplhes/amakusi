import { defineStore } from 'pinia'
import { ref } from 'vue'
import emailjs from '@emailjs/browser'
import { saveContactForm } from '@/firebase'

export const useContactStore = defineStore('contact', () => {
  const submitting = ref(false)
  const success = ref(false)
  const error = ref(null)

  const submitForm = async (formData) => {
    submitting.value = true
    success.value = false
    error.value = null

    // 1. Save to Firebase (persistent backup)
    const result = await saveContactForm(formData)

    // 2. Send email via EmailJS
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.nombre,
          from_email: formData.email,
          message: formData.mensaje,
          to_email: 'contacto@fundacionamakusi.cl',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
    } catch (emailErr) {
      console.error('Error al enviar email:', emailErr)
      // Don't block success — Firebase save already worked
    }

    if (result.success) {
      success.value = true
    } else {
      error.value = result.error
    }

    submitting.value = false
    return result.success
  }

  const resetStatus = () => {
    success.value = false
    error.value = null
  }

  return { submitting, success, error, submitForm, resetStatus }
})
