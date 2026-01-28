export function logError(error, context = "") {
  const errorData = {
    message: error.message,
    stack: error.stack,
    context,
    time: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };

  //IF dev then log in the console
  if (import.meta.env.VITE_DEV) {
    console.error("Logged Error:", errorData);
  }

  //other wise send it to the server
  fetch("/api/log-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(errorData),
  }).catch(() => {});
}
