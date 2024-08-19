import classNames from 'classnames';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { NoPrefetchLink } from '@/components/links/CustomLink';

type Props = {
  t: (key: string) => string;
};

const ArticleNavbar = ({ t }: Props) => {
  const router = useRouter();
  const { sort_by = 'last' } = router.query;

  const goBack = () => {
    if (window.history.length < 2) {
      router.push('/');
    } else {
      router.back();
    }
  };

  const linkClassName = (sortName: string) =>
    classNames(
      'flex items-center whitespace-nowrap rounded-lg px-2 py-1 text-xs hover:text-blue-500 dark:hover:bg-gray-700',
      {
        'text-gray-500 dark:text-gray-200': sort_by !== sortName,
        'dark:bg-gray-700 text-blue-500': sort_by === sortName,
      }
    );

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
          {t('nav.title')}
        </div>
        <div className='flex justify-end text-sm text-gray-500 dark:text-gray-400'>
          <NoPrefetchLink href='/article?sort_by=last'>
            <a className={linkClassName('last')}>{t('nav.last')}</a>
          </NoPrefetchLink>
          <NoPrefetchLink href='/article?sort_by=hot'>
            <a className={linkClassName('hot')}>{t('nav.hot')}</a>
          </NoPrefetchLink>
        </div>
      </div>
    </div>
  );
};

export default ArticleNavbar;
