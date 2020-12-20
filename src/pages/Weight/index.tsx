import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, DatePicker, Empty, InputNumber, notification, Row } from 'antd';
import React from 'react';
import { Chart, Legend, Line, Point, Slider } from 'bizcharts';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import moment from 'moment';

interface WeightProps {
  dispatch: Dispatch<any>;
}

class Weight extends React.Component<WeightProps> {
  state = {};

  dateSelect: string | undefined;

  weightInput: number | undefined;

  // componentDidMount() {
  //   this.getWeightData();
  // }

  updateWeightData = (): void => {
    if (this.dateSelect && this.weightInput) {
      const { dispatch } = this.props;
      dispatch({
        type: 'WeightDataModel/updateWeightData',
        payload: {
          token: localStorage.getItem("token"),
          date: this.dateSelect,
          weight: this.weightInput
        }
      }).then(()=>{
          this.getWeightData()
      });
    } else {
      notification.error({
        message: '存储失败',
        description:
          '请检查日期或体重是否填写',
        duration: 2,
      });
    }
  };

  deleteWeight = (): void => {
    if(this.dateSelect){
      const { dispatch } = this.props;
      dispatch({
        type: 'WeightDataModel/deleteWeight',
        payload: {
          token: localStorage.getItem("token"),
          date: this.dateSelect,
        }
      }).then(this.getWeightData);
    } else {
      notification.error({
        message: '删除失败',
        description:
          '请检查日期是否填写',
        duration: 2,
      });
    }
  };

  onDateChange = (value: any) => {
    this.dateSelect = value.format('YYYY-MM-DD');

  };

  onWeightInputChange = (value: any) => {
    this.weightInput = value;
  };

  getWeightData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'WeightDataModel/fetchWeightData',
      payload: localStorage.getItem("token"),
    });
  };

  disabledDate = (current:any) => {
    return current && current > moment().endOf('day');
  }

  render() {
    // @ts-ignore
    const { WeightDataModel } = this.props;
    return (
      <PageContainer>
        <Empty description={"暂（lan）不（de）维护"}></Empty>
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24}>*/}
        {/*    <Card title="数据修改">*/}
        {/*      <Row gutter={[8, 8]}>*/}
        {/*        <Col span={4}><DatePicker onChange={this.onDateChange} style={{ width: '100%' }} inputReadOnly*/}
        {/*                                  disabledDate={this.disabledDate}*/}
        {/*        /></Col>*/}
        {/*        <Col span={3}><InputNumber style={{ width: '100%' }} min={0} max={200} precision={1} placeholder="体重 / kg"*/}
        {/*                                   onChange={this.onWeightInputChange}*/}
        {/*        /></Col>*/}
        {/*        <Col span={2}><Button type="primary" onClick={this.updateWeightData}*/}
        {/*                              style={{ width: '100%' }}>存储</Button></Col>*/}
        {/*        <Col span={2}><Button type="primary" onClick={this.deleteWeight} danger*/}
        {/*                              style={{ width: '100%' }}>删除</Button></Col>*/}
        {/*      </Row>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24}>*/}
        {/*    <Card title="折线图" style={{ height: 500 }}>*/}
        {/*      <Chart scale={{ weight: { min: 60 }, date: {range: [0.01, 1]} }} padding={[30, 20, 50, 40]} autoFit height={320}*/}
        {/*             data={WeightDataModel.weightData}>*/}
        {/*        <Legend position="top" />*/}
        {/*        <Line shape="smooth" position="date*weight" label="weight" />*/}
        {/*        <Point position="date*weight" />*/}
        {/*        <Slider />*/}
        {/*      </Chart>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}

        {/*</Row>*/}
      </PageContainer>
    );
  }
}

export default connect(
  ({
     WeightDataModel,
     // loading,
   }) => ({
    WeightDataModel,
    // loading: loading.effects['WeightDataModel/fetch'],
  }),
)(Weight);
