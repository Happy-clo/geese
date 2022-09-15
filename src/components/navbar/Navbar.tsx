import { useRouter } from 'next/router';
import * as React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface Props {
  middleText: string;
  endText?: string;
}

const Navbar = ({ middleText = '', endText }: Props) => {
  const router = useRouter();
  return (
    <div className='relative my-2 overflow-hidden bg-white dark:bg-gray-800'>
      <div className='flex h-12 items-center justify-between py-2 px-4'>
        <div className='cursor-pointer' onClick={router.back}>
          <AiOutlineArrowLeft className='text-blue-400' size={20} />
        </div>
        <div className='text-center font-bold'>{middleText}</div>
        {endText ? (
          <div className='justify-end text-sm text-gray-500'>{endText}</div>
        ) : (
          <div className='flex w-5'></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
