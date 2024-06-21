import { Button, Checkbox, Drawer, Input, Message, Space, Table, TableColumnProps, Tooltip } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import JsonView from '@uiw/react-json-view';
import AcroIcon from '@/components/AcroIcon';
import SvgIcon from '@/components/SvgIcon';

export default function JSONFormatter() {
  const [value, setValue] = useState('');
  const [output, setOutput] = useState({});
  const [visible, setVisible] = useState(false);
  const [showLines, setShowLines] = useState(false); // 是否显示行数
  const [linesCount, setLinesCount] = useState(0); // 行数
  const [hasQuotation, setHasQuotation] = useState(true); // 是否有引号
  const columns: TableColumnProps[] = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '数据',
      dataIndex: 'value',
    },
    {
      title: '操作',
      dataIndex: 'op',
      render: (_, record) => (
        <div className={css`display: flex;gap:10px`}>
          <Button type='primary' status='success' onClick={() => checkRow(record.value)}>
            查看
          </Button>
          <Button onClick={() => removeRow(record.key)} type='primary' status='danger'>
            删除
          </Button>
        </div>
      ),
    },
  ];
  const [jsonList, setJsonList] = useState<{ key: number; value: string }[]>([])
  /** 格式化json数据 */
  function handleFormat() {
    try {
      console.log('value', value);
      if (!value) return;
      const formatted = JSON.parse(value);
      console.log('formatted', formatted);
      setOutput(formatted);
    } catch (error) {
      Message.error('Invalid JSON');
    }
  }
  /** 保存json数据到localStorage */
  function handleSave() {
    if (!value) return;
    // 检查是否已存在
    const exist = jsonList.find((item) => item.value === value);
    if (exist) {
      Message.error('数据已存在!');
      return;
    }
    const list = [...jsonList];
    list.push({ key: list.length + 1, value });
    setJsonList(list);
    localStorage.setItem('jsonList', JSON.stringify(list));
    Message.success('保存成功!')
  }
  /** 检索localStorage */
  function checkLocalStorage() {
    const list = localStorage.getItem('jsonList');
    if (list) {
      setJsonList(JSON.parse(list));
    }
  }
  function checkRow(record: string) {
    console.log('record', record);
    setValue(record);
  }
  /** 删除一列 */
  function removeRow(key: number) {
    const list = jsonList.filter((item) => item.key !== key);
    setJsonList(list);
    localStorage.setItem('jsonList', JSON.stringify(list));
  }

  function handleClear() {
    setValue('');
    setOutput({});
  }

  /** 复制结果 */
  function copyOutput() {
    console.log('output', output);
    if (!output) return;
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    Message.success('复制成功!');
  }

  /** 计算ouput有多少行 */
  function countLines() {
    const lines = JSON.stringify(output, null, 2).split('\n');
    setLinesCount(lines.length);
  }

  /** 下载为json文件 */
  function handleDownload() {
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    countLines();
  }, [output]);


  function handleQuotation(checked: boolean) {
    setHasQuotation(checked);
    // 将对象的属性名加上引号
    function addQuotesToKeys(obj: Record<string, any>) {
      return JSON.parse(JSON.stringify(obj));
    }

    // 将对象的属性名去掉引号
    function removeQuotesFromKeys(obj: Record<string, any>): Record<string, any> {
      if (Array.isArray(obj)) {
        return obj.map(item => removeQuotesFromKeys(item));
      } else if (obj !== null && typeof obj === 'object') {
        const newObj: Record<string, any> = {};
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = key; // 保留原始键名
            newObj[newKey] = removeQuotesFromKeys(obj[key]);
          }
        }
        return newObj;
      }
      return obj;
    }

    if (checked) {
      console.log('addQuotesToKeys(output)', addQuotesToKeys(output));
      setOutput(addQuotesToKeys(output));
    } else {
      console.log('removeQuotesFromKeys(output)', removeQuotesFromKeys(output));
      setOutput(removeQuotesFromKeys(output));
    }
  }

  function handleShowLines(checked: boolean) {
    setShowLines(checked);

  }

  const pageCss = {
    flex: css`display: flex; align-items: center`,
    svgTool: css`transition: all 0.3s; color: #a6accd; &:hover { color: #000; transform: scale(1.05) } })`,
  }

  return (
    <>
      <div className={css`padding: 20px;height: 100%;display: flex;flex-direction: column`}>
        <div className={css`display: flex;align-items: center;gap: 10px;padding: 10px 0`}>
          <Button type='primary' status='success' onClick={handleFormat}>格式化</Button>
          <Button status='success' onClick={handleSave}>保存</Button>
          <Button status='success' onClick={handleClear} className={css`margin-left: auto`}>清除</Button>
          <Button status='warning' onClick={() => setVisible(true)}>查看</Button>
        </div>
        <div className={css`display:flex; gap: 20px; flex: 1`}>
          <Input.TextArea
            style={{ width: 300, height: '100%' }}
            value={value}
            onChange={(e) => setValue(e.replace(/\s+/g, ''))}
            spellCheck={false}
          />
          <div className={css`flex: 1; background: #f5f5f5;position: relative`}>
            <div className={css`display: flex;align-items: center;gap: 10px; padding: 10px; border-bottom: 2px solid #dbdeda`}>
              <Tooltip content='导出为json文件' position='right' mini>
                <SvgIcon className={pageCss.svgTool} name='circle-down' size={20} onClick={handleDownload} />
              </Tooltip>
              {/* <Checkbox checked={hasQuotation} onChange={(c) => handleQuotation(c)}>引号</Checkbox> */}
              <Checkbox checked={showLines} onChange={(c) => handleShowLines(c)}>显示行号</Checkbox>
            </div>
            <div className={css`position: absolute;right:10px;top:10px`}>
              <SvgIcon
                className={pageCss.svgTool}
                name='copy'
                size={20}
                onClick={copyOutput}
              />
            </div>
            <div className={css`display: flex;padding: 1rem;`}>
              {
                showLines && (
                  <div className={css`align-self: stretch;width: 50px;display: flex;flex-direction: column;justify-content: center;align-items: center`}>
                    {Array.from({ length: linesCount }).map((_, index) => (
                      <div key={index} className={css`display: flex;align-items: center;height: 18px`}>
                        <span className={css`font-size: 13px;color: rgba(0, 0, 0, 0.3);font-stretch: 75%`}>
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              }
              <JsonView className={css`flex: 1`} value={output} />
            </div>
          </div>
        </div>
      </div>
      <Drawer
        width={800}
        height={332}
        title={<span>Json Example List</span>}
        visible={visible}
        placement='right'
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Space style={{ marginBottom: 16 }}>
          <Button type='primary' onClick={checkLocalStorage}>检索LocalStorage</Button>
          <Button type='primary' onClick={() => {localStorage.removeItem('jsonList')}}>清空</Button>
        </Space>
        <Table borderCell={true} pagePosition='bl' columns={columns} data={jsonList} />
      </Drawer>
    </>
  );
}