/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import path from 'path';
import { Checkbox, TextField, Cascader, Button, Input, Select } from 'antd';
import Modal from '../components/Modal';
import { transparentize } from 'polished';
import { getAddonDescription, getAddonFiles, getAddon } from '../api';
import CloseButton from '../components/CloseButton';
import { closeModal } from '../reducers/modals/actions';
import { installMod, updateInstanceConfig } from '../reducers/actions';
import { remove } from 'fs-extra';
import { _getInstancesPath, _getInstance } from '../utils/selectors';
import { FABRIC, FORGE, CURSEFORGE_URL } from '../utils/constants';
import {
  filterFabricFilesByVersion,
  filterForgeFilesByVersion,
  getPatchedInstanceType
} from '../../app/desktop/utils';

const ModOverview = ({
  projectID,
  fileID,
  gameVersion,
  instanceName,
  fileName
}) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(null);
  const [addon, setAddon] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ fileID, fileName });
  const [installedData, setInstalledData] = useState({ fileID, fileName });
  const [loading, setLoading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const instancesPath = useSelector(_getInstancesPath);
  const instance = useSelector(state => _getInstance(state)(instanceName));

  useEffect(() => {
    setLoadingFiles(true);
    getAddon(projectID).then(data => setAddon(data.data));
    getAddonDescription(projectID).then(data => {
      // Replace the beginning of all relative URLs with the Curseforge URL
      const modifiedData = data.data.replace(/href="(?!http)/g, `href="${CURSEFORGE_URL}`)

      setDescription(modifiedData)
    });
    getAddonFiles(projectID).then(data => {
      const isFabric =
        getPatchedInstanceType(instance) === FABRIC && projectID !== 361988;
      const isForge =
        getPatchedInstanceType(instance) === FORGE || projectID === 361988;
      let filteredFiles = [];
      if (isFabric) {
        filteredFiles = filterFabricFilesByVersion(data.data, gameVersion);
      } else if (isForge) {
        filteredFiles = filterForgeFilesByVersion(data.data, gameVersion);
      }
      setFiles(filteredFiles);
      setLoadingFiles(false);
    });
  }, []);

  const getPlaceholderText = () => {
    if (loadingFiles) {
      return 'Loading Files';
    } else if (files.length === 0 && !loadingFiles) {
      return 'このModは利用できません';
    } else {
      return 'Modバージョンを選択...';
    }
  };

  const getReleaseType = id => {
    switch (id) {
      case 1:
        return (
          <span
            css={`
              color: ${props => props.theme.palette.colors.green};
            `}
          >
            [Stable]
          </span>
        );
      case 2:
        return (
          <span
            css={`
              color: ${props => props.theme.palette.colors.yellow};
            `}
          >
            [Beta]
          </span>
        );
      case 3:
      default:
        return (
          <span
            css={`
              color: ${props => props.theme.palette.colors.red};
            `}
          >
            [Alpha]
          </span>
        );
    }
  };

  const handleChange = value => setSelectedItem(JSON.parse(value));

  const primaryImage = (addon?.attachments || []).find(v => v.isDefault);
  return (
    <Modal
      css={`
        height: 85%;
        width: 85%;
        max-width: 1500px;
      `}
      header={false}
    >
      <>
        <StyledCloseButton>
          <CloseButton onClick={() => dispatch(closeModal())} />
        </StyledCloseButton>
        <Container>
          <Parallax bg={primaryImage?.url}>
            <ParallaxContent>{addon?.name}</ParallaxContent>
          </Parallax>
          <Content>{ReactHtmlParser(description)}</Content>
        </Container>
        <Footer>
          {installedData.fileID &&
            files.length !== 0 &&
            !files.find(v => v.id === installedData.fileID) && (
              <div
                css={`
                  color: ${props => props.theme.palette.colors.yellow};
                  font-weight: 700;
                `}
              >
                このmodのバージョンはすでにTwitchから削除されているため、LegacyModPackの一部としてのみ取得できます。
              </div>
            )}
          <StyledSelect
            placeholder={getPlaceholderText()}
            loading={loadingFiles}
            disabled={loadingFiles}
            value={
              (files.length !== 0 &&
                files.find(v => v.id === installedData.fileID) &&
                JSON.stringify(selectedItem)) ||
              undefined
            }
            onChange={handleChange}
            listItemHeight={50}
            listHeight={400}
          >
            {(files || []).map(file => (
              <Select.Option
                title={file.displayName}
                key={file.id}
                value={JSON.stringify({
                  fileID: file.id,
                  fileName: file.fileName
                })}
              >
                <div
                  css={`
                    display: flex;
                    height: 50px;
                  `}
                >
                  <div
                    css={`
                      flex: 7;
                      display: flex;
                      align-items: center;
                    `}
                  >
                    {file.displayName}
                  </div>
                  <div
                    css={`
                      flex: 2;
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    `}
                  >
                    <div>{gameVersion}</div>
                    <div>{getReleaseType(file.releaseType)}</div>
                  </div>
                  <div
                    css={`
                      flex: 3;
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <div>
                      {new Date(file.fileDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </Select.Option>
            ))}
          </StyledSelect>
          <Button
            type="primary"
            disabled={
              !selectedItem.fileID ||
              installedData.fileID === selectedItem.fileID
            }
            loading={loading}
            onClick={async () => {
              setLoading(true);
              if (installedData.fileID) {
                await dispatch(
                  updateInstanceConfig(instanceName, prev => ({
                    ...prev,
                    mods: prev.mods.filter(
                      v => v.fileID !== installedData.fileID
                    )
                  }))
                );
                await remove(
                  path.join(
                    instancesPath,
                    instanceName,
                    'mods',
                    installedData.fileName
                  )
                );
              }
              await dispatch(
                installMod(
                  projectID,
                  selectedItem.fileID,
                  instanceName,
                  gameVersion,
                  !installedData.fileID
                )
              );
              setInstalledData(selectedItem);
              setLoading(false);
            }}
          >
            {installedData.fileID ? 'Switch Version' : 'Download'}
          </Button>
        </Footer>
      </>
    </Modal>
  );
};

export default React.memo(ModOverview);

const StyledSelect = styled(Select)`
  width: 650px;
  height: 50px;
  .ant-select-selection-placeholder {
    height: 50px !important;
    line-height: 50px !important;
  }
  .ant-select-selector {
    height: 50px !important;
    cursor: pointer !important;
  }
  .ant-select-selection-item {
    flex: 1;
    cursor: pointer;
    & > div {
      & > div:nth-child(2) {
        & > div:last-child {
          height: 10px;
          line-height: 5px;
        }
      }
    }
  }
`;

const StyledCloseButton = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1;
`;

const Container = styled.div`
  perspective: 1px;
  transform-style: preserve-3d;
  height: calc(100% - 70px);
  width; 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Parallax = styled.div`
  display: flex;
  flex: 1 0 auto;
  position: relative;
  height: 100%;
  width: 100%;
  transform: translateZ(-1px) scale(2);
  z-index: -1;
  background: url('${props => props.bg}');
  background-repeat: no-repeat;
  background-size: cover;
`;

const ParallaxContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 60px;
  color: ${props => props.theme.palette.text.secondary};
  font-weight: 700;
  padding: 0 30px;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  min-height: 100%;
  height: auto;
  display: block;
  padding: 30px 30px 90px 30px;
  font-size: 18px;
  position: relative;
  p {
    text-align: center;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  pre {
    background: ${props => transparentize(0.2, props.theme.palette.grey[900])};
  }
  z-index: 1;
  backdrop-filter: blur(20px);
  background: ${props => transparentize(0.4, props.theme.palette.grey[900])};
`;

const Footer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 0;
  left: 0;
  height: 70px;
  width: 100%;
  background: ${props => props.theme.palette.grey[700]};
  && > * {
    margin: 0 10px;
  }
`;
