export async function request<TResponse>(
    url: URL, 
    config: RequestInit
  ): Promise<TResponse> {
  const response = await fetch(url, config);
  return await response.json();
}
  