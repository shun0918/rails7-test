import { useState } from 'react';

const useCopy = <T>(originValue: T) => {
  const [copiedValue, setCopiedValue] = useState<T>(originValue);
  return [copiedValue, setCopiedValue];
};

export default useCopy;
