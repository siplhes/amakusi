import { defineStore } from 'pinia'
import { ref } from 'vue'
import { saveContactForm } from '@/firebase'

export const useContactStore = defineStore('contact', () => {
  const submitting = ref(false)
  const success = ref(false)
  const error = ref(null)

  const submitForm = async (formData) => {
    submitting.value = true
    success.value = false
    error.value = null

    const result = await saveContactForm(formData)

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
