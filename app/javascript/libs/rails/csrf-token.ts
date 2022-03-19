const csrfToken = () => document.getElementsByName('csrf-token')?.item(0)?.getAttribute('content');
export default csrfToken;
