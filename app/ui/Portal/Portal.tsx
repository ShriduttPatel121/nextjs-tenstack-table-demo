import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
}

function Portal({ children }: PortalProps) {
    const portalRoot = document.getElementById('portal-root') as HTMLDivElement; // Assuming you have an element with this ID in your HTML
    return ReactDOM.createPortal(children, portalRoot);
}
  
  export default Portal;