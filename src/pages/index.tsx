import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useLoginContext } from '@/hooks/useLoginContext';
import useRepositories from '@/hooks/useRepositories';

import ItemBottom from '@/components/home/ItemBottom';
import Items from '@/components/home/Items';
import Loading from '@/components/loading/Loading';
import { HomeSkeleton } from '@/components/loading/skeleton';
import IndexBar from '@/components/navbar/IndexBar';
import Seo from '@/components/Seo';
import ToTop from '@/components/toTop/ToTop';

const Index: NextPage = () => {
  const { t, i18n } = useTranslation('home');
  const router = useRouter();
  const { sort_by = 'featured', tid = '' } = router.query;

  const { isLogin } = useLoginContext();
  const { repositories, isValidating, hasMore, size, sentryRef } =
    useRepositories(sort_by as string, tid as string);

  const handleItemBottom = () => {
    if (!isValidating && !hasMore) {
      return (
        <ItemBottom
          endText={isLogin ? t('bottom_text_login') : t('bottom_text_login')}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Seo title={t('title')} description={t('description')} />
      <IndexBar
        tid={tid as string}
        sort_by={sort_by as string}
        t={t}
        i18n_lang={i18n.language}
      />
      <div className='h-screen'>
        <Items repositories={repositories} i18n_lang={i18n.language} />
        <div
          className='divide-y divide-gray-100 overflow-hidden dark:divide-gray-700'
          ref={sentryRef}
        >
          {isValidating && size <= 1 && <HomeSkeleton loop={6} />}
          {(isValidating || hasMore) && size > 1 && <Loading />}
        </div>
        {handleItemBottom()}
        <div className='hidden border-none md:block'>
          <ToTop />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}

export default Index;
