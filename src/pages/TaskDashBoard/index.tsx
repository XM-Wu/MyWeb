import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Tabs,
  Tag,
  Typography,
  Popover,
  Row,
  Col,
  Calendar
} from 'antd';
import ProcessCounter from '@/pages/GenralComponents/ProcessCounter';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FormInstance } from 'antd/lib/form';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import QuestionCircleFilled from '@ant-design/icons';

interface TaskDashBoardProps {
  dispatch: Dispatch<any>;
}

interface TaskDashBoardState {
  dailyData: { name: string, num: number, complete: number }[];
  visible: boolean;
}

class TaskDashBoard extends React.Component<TaskDashBoardProps> {
  state: TaskDashBoardState = {
    dailyData: [],
    visible: false,
  };

  localData: { name: string, num: number, complete: number }[] = [];

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'TaskModel/fetchData',
      payload: localStorage.getItem('token'),
    }).then(() => {
      const { TaskModel } = this.props;
      const { tasks } = TaskModel;

      const localDataStr = localStorage.getItem('dailyTask');

      if (localDataStr) this.localData = JSON.parse(localDataStr);

      // 删除数据库不存在的项目
      for (let i = 0; i < this.localData.length; i += 1) {
        if (!this.contains(tasks, this.localData[i].name)) {
          this.localData.splice(i, 1);
          i -= 1;
        }
      }
      // 添加本地不存在的项目
      for (let i = 0; i < tasks.length; i += 1) {
        if (!this.contains(this.localData, tasks[i].name)) {
          this.localData.push({ name: tasks[i].name, num: tasks[i].num, complete: 0 });
        }
      }

      if (moment().format('YYYY-MM-DD') !== localStorage.getItem('taskDate'))
        this.localData.map((item) => {
          const it = item;
          it.complete = 0;
          return it;
        });

      this.setState({
        dailyData: this.localData,
      });

      this.store();
    });
  };

  contains = (arr: any[], name: string): boolean => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].name === name) return true;
    }
    return false;
  };

  getIndex = (arr: any[], name: string): number => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].name === name) return i;
    }
    return -1;
  };

  onChanged = (e: any) => {
    const idx = this.getIndex(this.localData, e.name);
    this.localData[idx].complete = e.num;
    this.store();
  };

  onDeleteTask = (name: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'TaskModel/delete',
      payload: {
        token: localStorage.getItem('token'),
        name,
      },
    }).then(this.loadData);
  };

  onAddTask = () => {
    this.setVisible(true);
  };

  setVisible = (v: boolean) => {
    this.setState({ visible: v });
  };

  store = () => {
    localStorage.setItem('dailyTask', JSON.stringify(this.localData));
    localStorage.setItem('taskDate', moment().format('YYYY-MM-DD'));
  };

  formRef = React.createRef<FormInstance>();

  onFinish = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'TaskModel/add',
      payload: {
        token: localStorage.getItem('token'),
        name: values.name,
        num: values.num,
      },
    }).then(() => {
        const { TaskModel } = this.props;
        if (TaskModel.taskExist) {
          notification.error({
            message: '错误',
            description: '同名任务已存在',
          });
          dispatch({ type: 'TaskModel/reset' });
        } else
          this.loadData();
      },
    );
    this.setVisible(false);
    this.onReset();
  };

  onReset = () => {
    // @ts-ignore
    this.formRef.current.resetFields();
  };


  render() {
    const { TabPane } = Tabs;
    const title = <Tag color="magenta">new page!</Tag>;
    const tasks = [];
    const { dailyData } = this.state;
    for (let i = 0; i < dailyData.length; i += 1) {
      tasks.push(
        <ProcessCounter key={i} taskName={dailyData[i].name} taskNum={dailyData[i].num}
                        defaultValue={dailyData[i].complete}
                        onChanged={this.onChanged} onDelete={this.onDeleteTask}
        />,
      );
    }

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    return <PageContainer>
      <Row gutter={[8,16]}>
        <Col span={18}>
          <Card title={title}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<Popover content="每日清零" trigger='hover'>日常<QuestionCircleFilled /></Popover>} key="1">

                {tasks}

                <Button type="dashed" style={{ width: '100%', height: 100, marginTop: '20px' }} onClick={this.onAddTask}>
                  <PlusOutlined /> 新增任务
                </Button>
              </TabPane>
              <TabPane tab="周常" key="2">
                <Typography.Text>以后会做的 (◔◡◔)</Typography.Text>
              </TabPane>
              <TabPane tab="不重复" key="3">
                <Typography.Text>会做的，大概 (￣3￣)</Typography.Text>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span={6}>
          <Calendar fullscreen={false} />
        </Col>
      </Row>


      <Modal
        footer={null}
        title="新增每日"
        centered
        visible={this.state.visible}
        onCancel={() => this.setVisible(false)}
        width={800}
      >
        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
          <Form.Item name="name" label="任务名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="num" label="次数" rules={[{ required: true }]}>
            <InputNumber min={1} step={1} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Divider type="vertical" />
            <Button htmlType="button" onClick={this.onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>;
  }
}

export default connect(
  ({
     TaskModel,
     // loading,
   }) => ({
    TaskModel,
    // loading: loading.effects['WeightDataModel/fetch'],
  }),
)(TaskDashBoard);
