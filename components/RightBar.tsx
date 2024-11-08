import React from 'react';

interface RightBarProps {
    children: React.ReactNode;
}

const RightBar : React.FC<RightBarProps> = ({children}) => {
    return (
        <div className='flex flex-col items-center py-6 px-4 w-20 gap-4'>
            {children}
        </div>
    );
};

export default RightBar;