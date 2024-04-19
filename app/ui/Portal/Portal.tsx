import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
}

function Portal({ children }: PortalProps) {
    const portalRoot = document.getElementById('portal-root') as HTMLDivElement; // Assuming you have an element with this ID in your HTML
    // portalRoot.style.position = 'fixed';
    // portalRoot.style.top = '0';
    // portalRoot.style.left = '0';
    // portalRoot.style.width = '100vw';
    // portalRoot.style.height = '100vh';
    // portalRoot.style.zIndex = '50';
    return ReactDOM.createPortal(children, document.body);
}
  
  export default Portal;