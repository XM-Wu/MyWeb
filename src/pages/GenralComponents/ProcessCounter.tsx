import React from 'react';
import { Button, Card, Col, Progress, Row } from 'antd';
import { DeleteTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface ProcessCounterProps {
  taskName: string;
  taskNum: number;
  onChanged?: (e: { name: string, num: number } | undefined) => void;
  defaultValue?: number;
  onDelete?: (name: string) => void;
}

class ProcessCounter extends React.Component<ProcessCounterProps> {
  state = {
    completedNum: 0,
  };

  currentNum: number = 0;

  totalTaskNum: number = 0;

  constructor(props: ProcessCounterProps | Readonly<ProcessCounterProps>) {
    super(props);

    const { defaultValue, taskNum } = this.props;
    if (defaultValue && defaultValue > 0 && defaultValue <= taskNum) {
      this.state = {
        completedNum: defaultValue,
      };
      this.currentNum = defaultValue;
    }
    this.totalTaskNum = taskNum;
  }


  onIncrease = () => {
    this.currentNum += 1;
    this.setState({ completedNum: this.currentNum });
    const { onChanged, taskName } = this.props;
    if (onChanged) {
      onChanged({ name: taskName, num: this.currentNum });
    }
  };

  onDecline = () => {
    this.currentNum -= 1;
    this.setState({ completedNum: this.currentNum });
    const { onChanged, taskName } = this.props;
    if (onChanged) {
      onChanged({ name: taskName, num: this.currentNum });
    }
  };

  onDelete = () => {
    const { onDelete, taskName } = this.props;
    if (onDelete) {
      onDelete(taskName);
    }
  };

  render() {
    const { taskName } = this.props;
    const percent = Math.round((this.state.completedNum / this.totalTaskNum * 100 + Number.EPSILON) * 100) / 100;
    return (
      <Card>
        <Row gutter={[32, 0]} align="middle">
          <Col>
            <Button.Group>
              <Button onClick={this.onIncrease} icon={<PlusOutlined />}
                      disabled={!(this.state.completedNum < this.totalTaskNum)} />
              <Button onClick={this.onDecline} icon={<MinusOutlined />} disabled={this.state.completedNum <= 0} />
            </Button.Group>
          </Col>
          <Col style={{ width: 200 }}>{taskName}（{this.state.completedNum}/{this.totalTaskNum}）</Col>
          <Col span={16}>
            <Row>
              <Col span={20}><Progress percent={percent} /></Col>
              <Col offset={2} span={2}><DeleteTwoTone key="delete" twoToneColor="#ff0000" style={{ fontSize: 20 }}
                                             onClick={this.onDelete} /></Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default ProcessCounter;
