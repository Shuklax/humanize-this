export function url(url: string): string {
  try {
    if (typeof url !== 'string') {
      throw new Error('Input must be a string');
    }

    if (!url.trim()) {
      throw new Error('URL cannot be empty');
    }

    // Add protocol if missing
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;

    const u = new URL(urlWithProtocol);
    const cleanPath = u.pathname.replace(/^\//, "").replace(/\//g, " › ");
    return `${u.hostname} › ${cleanPath}`;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Invalid URL')) {
        throw new Error('Invalid URL format');
      }
      throw new Error(`URL formatting failed: ${error.message}`);
    }
    throw new Error('URL formatting failed: Unknown error');
  }
}