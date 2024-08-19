import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface Props {
  middleText: string;
  endText?: string;
}

const Navbar = ({ middleText = '', endText }: Props) => {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length < 2) {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <div className='relative my-2 bg-white dark:bg-gray-800 md:rounded-lg'>
      <div className='flex h-12 items-center justify-between py-2 px-4'>
        <div className='cursor-pointer' onClick={goBack}>
          <AiOutlineArrowLeft
            className='text-gray-500 hover:text-blue-400'
            size={18}
          />
        </div>
        <div className='w-3/4 truncate text-center font-bold dark:text-gray-300'>
          {middleText}
        </div>
        {endText ? (
          <div className='justify-end text-sm text-gray-500 dark:text-gray-400'>
            {endText}
          </div>
        ) : (
          <div className='flex w-5' />
        )}
      </div>
    </div>
  );
};

export default Navbar;
