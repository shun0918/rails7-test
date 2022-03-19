export const useParams = (): URLSearchParams =>
  new URLSearchParams(new URL(window.location.href).search);
