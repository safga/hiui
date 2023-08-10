import React, { useState } from 'react'
import Upload from '../src'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { FileList } from '@hi-ui/upload/src/FileList'
import { Popover } from '@hi-ui/popover'
import { WordColorful } from '@hi-ui/icons'

/**
 * @title 自定义文件列表渲染
 */
export const FileListRender = () => {
  const [popShow, setPopShow] = useState(false)
  return (
    <>
      <h1>FileListRender</h1>
      <div className="upload-file-list-render__wrap">
        <Upload
          type="default"
          uploadAction="https://jsonplaceholder.typicode.com/posts/"
          tips="仅支持 jpg/png 文件，且不超过 500kb"
          accept="image/png,image/jpg"
          headers={{ name: 'mi' }}
          defaultFileList={[
            {
              name: 'a.png',
              fileType: 'img', // 文件类型，可取值img, zip, word, pdf, ppt, excel, other
              uploadState: 'success', // 上传状态，可取值success, error
              url: 'https://i8.mifile.cn/a1/pms_1531116957.78852376.jpg',
            },
            {
              name: 'b.png',
              fileType: 'img',
              uploadState: 'error',
              url: 'https://i1.mifile.cn/f/i/2018/mix3/specs_black.png',
            },
          ]}
          name={'files[]'}
          onChange={(file, fileList, response) => {
            console.log('upload callback', file, fileList, response)
            // if(response&&response.status !== 200) return false // 返回 false 则该文件会从列表里删除
          }}
          fileListRender={({ fileList, onDelete, onDownload }) => {
            const file = fileList?.[0]
            const prefixCls = getPrefixCls('upload')
            return fileList.length > 1 ? (
              <Popover
                title={null}
                visible={popShow}
                placement="bottom-start"
                matchWidth={true}
                onOutsideClick={() => {
                  setPopShow(false)
                }}
                content={
                  <div className={`${prefixCls}`}>
                    <FileList
                      fileList={fileList}
                      onDelete={onDelete}
                      onDownload={onDownload}
                      prefixCls={getPrefixCls('upload')}
                    />
                  </div>
                }
              >
                <div className={`${prefixCls}`}>
                  <ul className={`${prefixCls}__list`}>
                    <li className={`${prefixCls}__item`} title={file.name} tabIndex={0}>
                      <span className={`${prefixCls}__item-icon`}>
                        <WordColorful />
                      </span>
                      <div className={`${prefixCls}__right-content`}>
                        <a
                          tabIndex={-1}
                          target="_blank"
                          rel="noreferrer"
                          href={file.url}
                          className={cx(
                            `${prefixCls}__filename`,
                            file.uploadState === 'error' && `${prefixCls}__filename--error`
                          )}
                          title={file.name}
                          onClick={(e) => {
                            if (onDownload) {
                              e.preventDefault()
                              onDownload(file)
                            }
                          }}
                        >
                          {file.name}
                        </a>
                      </div>
                      {file.uploadState === 'loading' && (
                        <div className={`${prefixCls}__upstatus`}>
                          <i
                            className={`${prefixCls}__upstatus-line`}
                            style={{ width: file.progressNumber + '%' }}
                          />
                        </div>
                      )}
                      <span onClick={() => setPopShow(true)} style={{ cursor: 'pointer' }}>
                        {fileList.length}
                      </span>
                    </li>
                  </ul>
                </div>
              </Popover>
            ) : (
              <FileList
                fileList={fileList}
                onDelete={onDelete}
                onDownload={onDownload}
                prefixCls={getPrefixCls('upload')}
              />
            )
          }}
        />
      </div>
    </>
  )
}
