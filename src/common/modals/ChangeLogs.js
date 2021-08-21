/* eslint-disable react/no-unescaped-entities */
import React, { memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faStar, faWrench } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import Modal from '../components/Modal';
import SocialButtons from '../components/SocialButtons';
// import KoFiButton from '../assets/ko-fi.png';
// import PatreonButton from '../assets/patreon.png';
import UpdateIllustration from '../assets/update_illustration.png';
import { openModal } from '../reducers/modals/actions';
import ga from '../utils/analytics';

const UpdateRow = ({ header, content }) => {
  return (
    <li>
      &bull; {header}{' '}
      <span
        css={`
          color: ${props => props.theme.palette.text.third};
        `}
      >
        {content}
      </span>
    </li>
  );
};

const data = {
  new: [
    {
      header: 'Java16に対応しました！',
      content:
        'これによりMC1.17以上でも問題なく実行できます！設定から両方のバージョンを手動設定することもできるようにしました！'
    },
    {
      header: 'インスタンスを簡単に複製できるようになりました！',
      content: 'インスタンスを右クリックして「複製する」をクリックするだけ！'
    },
    {
      header:
        'Microsoftログインに関する プライバシーポリシー、ToS、利用規定 を追加しました。',
      content:
        '法的なことに興味がある場合は、設定ページから読むことができます。'
    }
  ],
  improvements: [
    {
      header: 'ChangeLogを見やすくしました！',
      content: 'この画面です 😃。'
    },
    {
      header: 'パフォーマンスが大幅に向上しました！',
      content: ''
    },
    {
      header: '依存関係の更新を行いました。',
      content: 'セキュリティとパフォーマンスの向上のために更新しました。'
    }
  ],
  bugfixes: [
    {
      header: 'アカウントが非表示になる問題を修正しました。',
      content: '追加された数が多すぎると見えなくなる問題が発生していました。'
    },
    {
      header: '同時ダウンロード設定を修正しました。',
      content: 'FTBmodpackのダウンロード時には使用されません。'
    },
    {
      header: 'Fabric modがロードされない問題を修正しました',
      content: 'CurseForgeが構造を変更したため問題が発生していました。'
    },
    {
      header: 'CurseForgeModLoaderを正しく検出しなかったバグを修正しました。',
      content: ''
    },
    {
      header: '外部からのインスタンスのインポートを修正しました。',
      content:
        'ローカルzipとリモートURLの両方が正しく機能するようになりました。'
    }
  ]
};

const ChangeLogs = () => {
  const [version, setVersion] = useState(null);
  const [skipIObserver, setSkipIObserver] = useState(true);
  const dispatch = useDispatch();
  const { ref: intersectionObserverRef, inView: insectionObserverInView } =
    useInView({
      threshold: 0.3,
      initialInView: false,
      triggerOnce: true,
      skip: skipIObserver
    });

  useEffect(() => {
    ipcRenderer.invoke('getAppVersion').then(setVersion).catch(console.error);
    setTimeout(() => {
      setSkipIObserver(false);
    }, 300);
    ga.sendCustomEvent('changelogModalOpen');
  }, []);

  useEffect(() => {
    if (insectionObserverInView) {
      ga.sendCustomEvent('changelogModalReadAll');
    }
  }, [insectionObserverInView]);

  const openBisectModal = () => {
    dispatch(openModal('BisectHosting'));
    ga.sendCustomEvent('changelogModalOpenBisect');
  };

  return (
    <Modal
      css={`
        height: 550px;
        width: 650px;
      `}
      title={`What's new in ${version}`}
      removePadding
    >
      <Container>
        <Header>
          <img
            css={`
              border-radius: 5px;
            `}
            src={UpdateIllustration}
            alt="New Version"
          />
          <div
            css={`
              margin-top: 20px;
              color: ${props => props.theme.palette.text.third};
              span {
                color: ${props => props.theme.palette.text.primary};
                cursor: pointer;
                text-decoration: underline;
              }
            `}
          >
            FelNullが出してる{' '}
            <span
              css={`
                color: ${props => props.theme.palette.colors.green};
              `}
            >
              ModPackやLauncher
            </span>{' '}
            などの質問は{' '}
            <span
              css={`
                color: ${props => props.theme.palette.colors.green};
              `}
            >
              Discord
            </span>{' '}
            で受け付けております。「
            <span onClick={openBisectModal}>FelNullGDLauncher</span>」
          </div>
          <div
            css={`
              display: flex;
              align-items: center;
              justify-content: start;
              margin-bottom: 20px;
              margin-top: 30px;
              a:nth-child(1) {
                margin-right: 20px;
              }
              img {
                border-radius: 30px;
                height: 40px;
                cursor: pointer;
                transition: transform 0.2s ease-in-out;
                &:hover {
                  transform: scale(1.05);
                }
              }
            `}
          >
            <a href="https://discord.gg/X9BUF9A">
              <div>
                <FontAwesomeIcon icon={faDiscord} size="lg" />
              </div>
            </a>
            <a href="https://github.com/TeamFelnull/FelNullGDLauncher">
              <div>
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </div>
            </a>
          </div>
        </Header>
        <Section>
          <SectionTitle
            css={`
              color: ${props => props.theme.palette.colors.green};
            `}
          >
            <span
              css={`
                display: flex;
                align-items: center;
                padding-top: 90px;
              `}
            >
              <FontAwesomeIcon
                icon={faStar}
                css={`
                  margin-right: 10px;
                  font-size: 20px;
                `}
              />
              新機能
            </span>
          </SectionTitle>
          <div>
            <ul>
              {data.new.map(item => (
                <UpdateRow
                  key={item.header}
                  header={item.header}
                  content={item.content}
                />
              ))}
            </ul>
          </div>
        </Section>
        <Section>
          <SectionTitle
            css={`
              color: ${props => props.theme.palette.colors.yellow};
            `}
          >
            <span
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <FontAwesomeIcon
                icon={faWrench}
                css={`
                  margin-right: 10px;
                  font-size: 20px;
                `}
              />
              改善
            </span>
          </SectionTitle>
          <div>
            <ul>
              {data.improvements.map(item => (
                <UpdateRow
                  key={item.header}
                  header={item.header}
                  content={item.content}
                />
              ))}
            </ul>
          </div>
        </Section>
        <Section>
          <SectionTitle
            css={`
              color: ${props => props.theme.palette.colors.red};
            `}
          >
            <span
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <FontAwesomeIcon
                icon={faBug}
                css={`
                  margin-right: 10px;
                  font-size: 20px;
                `}
              />
              修正
            </span>
          </SectionTitle>
          <div>
            <ul ref={intersectionObserverRef}>
              {data.bugfixes.map(item => (
                <UpdateRow
                  key={item.header}
                  header={item.header}
                  content={item.content}
                />
              ))}
            </ul>
          </div>
        </Section>
      </Container>
      <div
        css={`
          position: sticky;
          bottom: 0;
          height: 60px;
          width: 100%;
          background: ${props => props.theme.palette.grey[800]};
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 0 20px;
        `}
      >
        <SocialButtons />
      </div>
    </Modal>
  );
};

export default memo(ChangeLogs);

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  color: ${props => props.theme.palette.text.primary};
  padding: 20px;
`;

const SectionTitle = styled.h2`
  width: 100%;
  margin: 0;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 22px;
`;

const Section = styled.div`
  width: 100%;
  font-size: 16px;
  p {
    margin: 20px 0 !important;
  }
  div {
    width: 100%;
    margin: 20px 0;
    border-radius: 5px;
    ul {
      padding: 0px;
      list-style-position: inside;
    }
    li {
      text-align: start;
      list-style-type: none;
      margin: 10px 0;
    }
  }
`;

const Header = styled.div`
  height: 150px;
  margin-bottom: 200px;
`;
