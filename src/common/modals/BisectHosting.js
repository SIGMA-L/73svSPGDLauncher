import React, { memo } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import BisectHostingLogo from '../../ui/BisectHosting';

const BisectHosting = () => {
  return (
    <Modal
      css={`
        height: 600px;
        width: 900px;
        font-size: 10px;
        line-height: 1.8;
      `}
      title="TeamFelNull Discord"
    >
      <Container>
        <BisectHostingLogo size={60} hover />
        <h2
          css={`
            margin-top: 20px;
          `}
        >
          季節ごとの特別なModサーバー{' '}
          <span
            css={`
              font-weight: 800;
            `}
          >
            『Season Mod Server』
          </span>{' '}
          <span>を立てたりして楽しく遊んでいます。</span> FelNullが出してる{' '}
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
        </h2>
        <a href="https://discord.gg/vsFrsgY">
          <Button
            type="primary"
            css={`
              margin-top: 25px;
            `}
          >
            FelNullDiscord &nbsp;
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </Button>
        </a>
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe
          src="https://e.widgetbot.io/channels/600929948529590272/608914022883917824"
          height="380"
          width="800"
        />
      </Container>
    </Modal>
  );
};

export default memo(BisectHosting);

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${props => props.theme.palette.text.primary};
`;
