/**
 * Utilitários de segurança para a aplicação
 */

/**
 * Gera uma assinatura HMAC para autenticação de webhooks
 * 
 * @param payload - O payload a ser assinado
 * @param secret - A chave secreta para assinar o payload
 * @returns Uma string hexadecimal representando a assinatura HMAC-SHA256
 */
export async function generateHmacSignature(payload: any, secret: string): Promise<string> {
  try {
    // Converter o payload para string JSON
    const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
    
    // Converter a string e o segredo para ArrayBuffer
    const encoder = new TextEncoder();
    const payloadBuffer = encoder.encode(payloadString);
    const secretBuffer = encoder.encode(secret);
    
    // Importar a chave secreta
    const key = await crypto.subtle.importKey(
      'raw',
      secretBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    // Gerar a assinatura
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      payloadBuffer
    );
    
    // Converter a assinatura para string hexadecimal
    return arrayBufferToHex(signature);
  } catch (error) {
    console.error('Erro ao gerar assinatura HMAC:', error);
    throw new Error('Falha ao gerar assinatura de segurança');
  }
}

/**
 * Converte um ArrayBuffer para string hexadecimal
 */
function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Gera um timestamp ISO para uso em requisições autenticadas
 */
export function generateTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Gera um ID de requisição único
 */
export function generateRequestId(): string {
  return crypto.randomUUID();
}
