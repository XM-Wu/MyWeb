import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Carousel, Alert, Row, Col, Collapse } from 'antd';
import SpButton from '@/pages/GenralComponents/SpButton';
import { CaretRightOutlined } from '@ant-design/icons';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const { Panel } = Collapse;
export default (): React.ReactNode => (
  <PageContainer>
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card hoverable>
          <Carousel autoplay>
            <div>
              <Typography.Title style={contentStyle}>不要熬夜（23:00前睡）</Typography.Title>
            </div>
            <div>
              <Typography.Title style={contentStyle}>少吃辣，少吃油，少吃火锅烧烤</Typography.Title>
            </div>
            <div>
              <Typography.Title style={contentStyle}>一周3-5次30min以上的运动</Typography.Title>
            </div>
            <div>
              <Typography.Title style={contentStyle}>坐直，站直</Typography.Title>
            </div>
            {/*<div>*/}
            {/*  <Typography.Title style={contentStyle}>用鼻子呼吸</Typography.Title>*/}
            {/*</div>*/}
          </Carousel>
        </Card>
      </Col>
    </Row>
    {/*<Row gutter={[8, 16]}>*/}
    {/*  <Col span={24}>*/}
    {/*    <Alert message="警告" type="error" showIcon closable*/}
    {/*           description="互联网并非法外之地，请遵守中华人民共和国法律法规，切勿发布任何分裂国家，激化民族矛盾的言论，极端政治人士请绕道。 若不同意，请马上关闭页面。" />*/}
    {/*  </Col>*/}
    {/*</Row>*/}
    <Row gutter={[8, 16]}><Col span={24}>
      <Card title={"快捷导航"} hoverable>

        <Collapse
          bordered
          defaultActiveKey={['1', '2']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          ghost
        >
          <Panel header="复旦" key="1">
            <SpButton value={"学邮"} type={1} url={'mail.fudan.edu.cn'}/>
            <SpButton value={"elearning"} type={2} url={'elearning.fudan.edu.cn'}/>
            <SpButton value={"ehall"} type={3} url={'ehall.fudan.edu.cn'}/>
            <SpButton value={"教务"} type={2} url={'jwfw.fudan.edu.cn'}/>
            <SpButton value={"选课"} type={1} url={'xk.fudan.edu.cn'}/>
          </Panel>
          <Panel header="打工人儿" key="2">
            <SpButton value={'github'} type={3} url={'github.com/'} />
            <SpButton value={'百度'} type={2} url={'www.baidu.com'} />
            <SpButton value={'LeetCode'} type={1} url={'leetcode-cn.com/'} />
            <SpButton value={'QQ邮箱'} type={1} url={'mail.qq.com'} />
            <SpButton value={'Antd'} type={3} url={'ant.design/index-cn'} />
            {/*<SpButton value={'知网'} type={2} url={'www.cnki.net/'} />*/}
          </Panel>
          <Panel header="耗子尾汁" key="3">
            <SpButton value={'哔哩哔哩'} type={1} url={'www.bilibili.com/'} />
          </Panel>
        </Collapse>
      </Card>
    </Col></Row>


  </PageContainer>
);
