import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, InputNumber, Row, DatePicker, Select, Statistic, Typography, Alert, Empty } from 'antd';
import { Chart, Legend, Line, Point, Slider } from 'bizcharts';
import moment from 'moment';


class SelfControlData extends React.Component {
  state = {
    data: [],
    longest: 0,
    l1Total: 0,
    l2Total: 0,
    currentTotal: 0,
  };

  // componentDidMount() {
  //   this.storage();
  //   const datStr = localStorage.getItem('selfControl_data');
  //   if (datStr != null) {
  //     const allData = JSON.parse(datStr);
  //     if (allData.length <= 0) return;
  //
  //     let index: number = 0;
  //     let day = moment('2020/8/20', 'YYYY/MM/DD');
  //     const today = moment().format('YYYY/MM/DD');
  //
  //     let longest = 0;
  //     let cnt = 0;
  //
  //     let realData = [];
  //     let dayStr = day.format('YYYY/MM/DD');
  //
  //     // 求最长与chart数据
  //     while (dayStr <= today) {
  //       if (index < allData.length && dayStr === allData[index].date && allData[index].type === 'l1') {
  //         // 记录最长天数
  //         if (cnt > longest) longest = cnt;
  //         cnt = 0;
  //
  //         realData.push(allData[index]);
  //         index += 1;
  //       } else {
  //         cnt += 1;
  //         realData.push({ date: dayStr, type: 'l1', cnt: 0 });
  //       }
  //       if (index < allData.length && dayStr === allData[index].date && allData[index].type === 'l2') {
  //         realData.push(allData[index]);
  //         index += 1;
  //       } else {
  //         realData.push({ date: dayStr, type: 'l2', cnt: 0 });
  //       }
  //
  //       day = day.add(1, 'days');
  //       dayStr = day.format('YYYY/MM/DD');
  //     }
  //
  //     if (cnt > longest) longest = cnt;
  //
  //     const total = this.countTotal(allData);
  //
  //     this.setState({
  //       data: realData,
  //       longest,
  //       l1Total: total.l1Total,
  //       l2Total: total.l2Total,
  //       currentTotal: cnt,
  //     });
  //   }
  // }

  countTotal = (data: { type: string }[]): { l1Total: number, l2Total: number } => {
    let l1Total = 0;
    let l2Total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
      if (item.type === 'l1') {
        l1Total += 1;
      } else if (item.type === 'l2') {
        l2Total += 1;
      }
    }
    return { l1Total, l2Total };
  };

  dataHandler = (realData) => {
    const cpy = [];
    const startIndex = realData.length - 60*2 > 0 ? realData.length - 60*2 : 0;
    for(let i = startIndex; i < realData.length; i += 1){
      cpy.push(realData[i]);
    }
    return cpy;
  }

  storage = () => {
    const newData = [
      { date: '2020/08/20', type: 'l1', cnt: 1 },
      { date: '2020/09/24', type: 'l1', cnt: 1 },
      { date: '2020/09/27', type: 'l1', cnt: 1 },
      { date: '2020/10/02', type: 'l1', cnt: 1 },
      { date: '2020/10/03', type: 'l1', cnt: 1 },
      { date: '2020/10/10', type: 'l2', cnt: 1 },
      { date: '2020/10/20', type: 'l1', cnt: 1 },
    ];


    localStorage.setItem('selfControl_data', JSON.stringify(newData));
  };

  onDateChange = (value: any) => {
    console.log(value.format('YYYY/MM/DD'));
  };

  render() {
    return (
      <PageContainer>
        <Empty description={"暂（lan）不（de）维护"}></Empty>
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24}>*/}
        {/*    <Alert message="此页还是demo，不要乱点" type="warning" showIcon />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24}>*/}
        {/*    <Card title="数据修改">*/}
        {/*      <Row gutter={[16, 16]}>*/}
        {/*        <Col span={4}><DatePicker onChange={this.onDateChange} style={{ width: '100%' }} /></Col>*/}
        {/*        <Col span={4}><Select style={{ width: '100%' }} placeholder="类型">*/}
        {/*          <Select.Option value="l1">l1</Select.Option>*/}
        {/*          <Select.Option value="l2">l2</Select.Option>*/}
        {/*        </Select></Col>*/}
        {/*        <Col span={2}><InputNumber style={{ width: '100%' }} min={0} placeholder="次数" /></Col>*/}
        {/*        <Col span={3}><Button type="primary" onClick={this.storage}>存储</Button></Col>*/}
        {/*      </Row>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={18}>*/}
        {/*    <Card title="折线图" style={{ height: 500 }}>*/}
        {/*      <Row gutter={[16, 16]}>*/}
        {/*        <Col span={5}>*/}
        {/*          <Select style={{ width: '100%' }} defaultValue={0}>*/}
        {/*            <Select.Option value={0}>最近60天</Select.Option>*/}
        {/*            <Select.Option value={1}>周</Select.Option>*/}
        {/*            <Select.Option value={2}>月</Select.Option>*/}
        {/*            <Select.Option value={3}>年</Select.Option>*/}
        {/*          </Select>*/}
        {/*        </Col>*/}
        {/*      </Row>*/}
        {/*      <Row gutter={[16, 16]}>*/}
        {/*        <Col span={24}>*/}
        {/*          <Chart scale={{ cnt: { min: 0 } }} padding={[30, 20, 50, 40]} autoFit height={320}*/}
        {/*                 data={this.dataHandler(this.state.data)}>*/}
        {/*            <Legend position="top" />*/}
        {/*            <Line position="date*cnt" color="type" label="cnt" />*/}
        {/*            <Point position="date*cnt" color="type" />*/}
        {/*            <Slider />*/}
        {/*          </Chart>*/}
        {/*        </Col>*/}
        {/*      </Row>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*  <Col span={6}>*/}
        {/*    <Card title="数据" style={{ height: 500 }}>*/}
        {/*      <Row gutter={[16, 16]}>*/}
        {/*        <Col span={12}><Statistic title="当前" value={this.state.currentTotal} suffix="天"*/}
        {/*                                  formatter={(value) => {*/}
        {/*                                    return (<Typography.Title>{value}</Typography.Title>);*/}
        {/*                                  }}*/}
        {/*        /></Col>*/}
        {/*      </Row>*/}

        {/*      <Row gutter={[16, 16]}>*/}
        {/*        <Col span={12}><Statistic title="总l1次数" value={this.state.l1Total} /></Col>*/}
        {/*        <Col span={12}><Statistic title='失败' value={this.state.l1Total-1} /></Col>*/}
        {/*      </Row>*/}
        {/*      <Row gutter={[16, 16]}>*/}
        {/*        <Col span={12}><Statistic title="平均天数" value={this.state.data.length / this.state.l1Total} /></Col>*/}
        {/*        <Col span={12}><Statistic title="最长天数" value={this.state.longest} /></Col>*/}
        {/*      </Row>*/}
        {/*      <Row gutter={[16, 16]}>*/}
        {/*        <Col span={12}><Statistic title="总l2次数" value={this.state.l2Total} /></Col>*/}
        {/*      </Row>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </PageContainer>
    );
  }
}

export default SelfControlData;
