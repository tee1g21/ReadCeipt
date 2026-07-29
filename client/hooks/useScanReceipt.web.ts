export function useScanReceipt() {
  const scanReceipt = async (
    _receiptId: string,
    _capturedImage: { uri: string; base64?: string },
  ): Promise<{ receiptId: string } | null> => {
    return null;
  };

  return { scanReceipt, isLoading: false, error: null };
}
