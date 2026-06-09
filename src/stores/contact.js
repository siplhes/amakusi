import { defineStore } from "pinia";
import { ref } from "vue";

export const useContactStore = defineStore("contact", () => {
  const submitting = ref(false);
  const success = ref(false);
  const error = ref(null);

  const submitForm = async (formData) => {
    submitting.value = true;
    success.value = false;
    error.value = null;

    // Save to Firebase (optional — only if configured)
    try {
      const { saveContactForm } = await import("@/firebase");
      if (import.meta.env.VITE_FIREBASE_API_KEY) {
        await saveContactForm(formData);
      }
    } catch (firebaseErr) {
      console.warn("Firebase no disponible, continuando:", firebaseErr);
    }

    // Send email via StaticForms v3 (URL suffix approach)
    try {
      const apiKey = import.meta.env.VITE_STATICFORMS_API_KEY;
      const body = new URLSearchParams();
      body.append("subject", `Nuevo mensaje de contacto: ${formData.nombre}`);
      body.append("name", formData.nombre);
      body.append("email", formData.email);
      body.append("message", formData.mensaje);

      const res = await fetch(
        `https://api.staticforms.dev/submit/${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        }
      );

      const data = await res.json();
      if (!data.success) {
        error.value = data.message || "Error al enviar mensaje";
        submitting.value = false;
        return false;
      }

      success.value = true;
      submitting.value = false;
      return true;
    } catch (emailErr) {
      console.error("Error al enviar email:", emailErr);
      error.value = "Error de conexión al enviar mensaje";
      submitting.value = false;
      return false;
    }
  };

  const resetStatus = () => {
    success.value = false;
    error.value = null;
  };

  return { submitting, success, error, submitForm, resetStatus };
});
