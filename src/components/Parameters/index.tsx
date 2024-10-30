import React from 'react';

type ParametersProps = {
  params: { [key: string]: any };
};

const Parameters: React.FC<ParametersProps> = ({ params }) => {
  return (
    <div className='absolute p-4 right-0 bottom-0 border-t-8 border-black text-slate-50 bg-slate-900 w-full text-xs h-32 overflow-y-scroll'>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
};

export default Parameters;