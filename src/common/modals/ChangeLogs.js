/* eslint-disable react/no-unescaped-entities */
import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { ipcRenderer } from 'electron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import Modal from '../components/Modal';

const ChangeLogs = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    ipcRenderer.invoke('getAppVersion').then(setVersion).catch(console.error);
  }, []);

  return (
    <Modal
      css={`
        height: 500px;
        width: 650px;
      `}
      title={`Release v${version}`}
    >
      <Container>
        <Section>
          <SectionTitle
            css={`
              color: ${props => props.theme.palette.colors.green};
            `}
          >
            <span>新機能</span>
          </SectionTitle>
          <div>
            <ul>
              <li>ModPackブラウザのUIを新しくモデルチェンジしました</li>
              <li>
                複数のModの依存関係のModのインストールをできないようにしました
              </li>
              <li>TwitchModpackのUXを向上させました</li>
              <li>インスタンス名が４５文字まで対応できるようにしました</li>
              <li>インスタンスのタブにResource Packsが追加されました</li>
              <li>新UIの導入</li>
            </ul>
          </div>
        </Section>
        <Section>
          <SectionTitle
            css={`
              color: ${props => props.theme.palette.colors.red};
            `}
          >
            <span>修正</span>
          </SectionTitle>
          <div>
            <ul>
              <li>UIの修正をしました</li>
              <li>データ削除の確認漏れを修正</li>
              <li>Minecraft公式ニュースの表示を修正</li>
              <li>セキュリティ修正</li>
            </ul>
          </div>
        </Section>
        <Section>
          <SectionTitle
            css={`
              color: ${props => props.theme.palette.colors.lavander};
            `}
          >
            <span>Join Discord</span>
          </SectionTitle>
          <p>
            FelNullが出してる{' '}
            <span
              css={`
                color: ${props => props.theme.palette.colors.green};
              `}
            >
              ModPack
            </span>{' '}
            などの質問は{' '}
            <span
              css={`
                color: ${props => props.theme.palette.colors.green};
              `}
            >
              Discord
            </span>{' '}
            でのみ受け付けております。
          </p>
          <Button
            css={`
              width: 200px;
              height: 40px;
              font-size: 20px;
              padding: 4px !important;
              margin-top: 3px;
              margin-bottom: 10px;
            `}
            type="primary"
            href="https://discord.gg/vsFrsgY"
          >
            <FontAwesomeIcon icon={faDiscord} />
            &nbsp; Discord
          </Button>
        </Section>
        <Section>
          <SectionTitle
            css={`
              color: ${props => props.theme.palette.colors.jungleGreen};
            `}
          >
            <span>GDLauncher License</span>
          </SectionTitle>
          <p>
            This project is licensed under the GNU GPL V3.0 - see the GitHub
            LICENSE file for details. A simple way to keep in terms of the
            license is by forking this repository and leaving it open source
            under the same license.
            FelNullGDLauncherはgorilla-devs/GDLauncherをベースに作成されています。
          </p>
          <Button
            css={`
              width: 200px;
              height: 40px;
              font-size: 20px;
              padding: 4px !important;
              margin-top: 3px;
              margin-bottom: 10px;
            `}
            type="primary"
            href="https://github.com/TeamFelnull/FelNullGDLauncher/blob/master/LICENSE"
          >
            <FontAwesomeIcon icon={faGithub} />
            &nbsp; LICENSE
          </Button>
        </Section>
      </Container>
    </Modal>
  );
};

export default memo(ChangeLogs);

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  overflow-y: auto;
  color: ${props => props.theme.palette.text.primary};
`;

const SectionTitle = styled.h2`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid;
  line-height: 0.1em;
  margin: 10px 0 20px;

  span {
    background: ${props => props.theme.palette.secondary.main};
    padding: 0 10px;
  }
`;

const Section = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 40px 0;
    border-radius: 5px;

    p {
      margin: 20px 0;
    }

    li {
      text-align: start;
    }
  }
`;
