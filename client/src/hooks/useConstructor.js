import { useState } from 'react';

const useConstructor = function(callBack = () => {}) {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

export default useConstructor;