import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT } from '@/constant';
import { Input } from 'antd';
import styles from './index.scss';
//import { DatePicker } from 'antd';
import { InputNumber } from 'antd';

import { compose, withState } from 'recompose';
import { EventEditModel } from '@/interfaces/event';
import ModalButtons from '@/components/ModalButtons';
//const dateFormat = 'YYYY-MM-DD';

export interface UserFormProps extends FormComponentProps {
  saving: boolean;
  detailData?: EventEditModel;
  onClose: () => void;
  onSubmit: (data: EventEditModel) => void;
}

class UserForm extends React.PureComponent<UserFormProps> {
  public componentDidMount() {
    const { detailData } = this.props;
    if (detailData) {
      this.props.form.setFieldsValue(detailData);
    }
  }

  public handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error: Error, values: EventEditModel) => {
      if (error) {
        return;
      }
      this.props.onSubmit(values);
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" className={styles.form}>
        <Form.Item label="比赛项目名称" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('competitionEventName', {
            rules: [
              {
                required: true,
                message: '请输入比赛项目',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

       {/*<Form.Item label="开始时间" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('planStartAt', {
            rules: [
              {
                required: true,
                message: '请输入开始时间',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>*/}
        
        <Form.Item label="开始时间" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('planStartAt', {
            rules: [
              {
                required: true,
                message: '请输入开始时间',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="结束时间" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('planEndAt', {
            rules: [
              {
                required: true,
                message: '请输入结束时间',
              },
            ],
          })(<Input placeholder="请输入"/>)}
        </Form.Item>

        <Form.Item label="状态" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('status', {
            rules: [
              {
                required: false,
                message: '请输入状态',
              },
            ],
          })(<InputNumber min={1} max={3} defaultValue={1} placeholder="1:未开始2:进行中3:已结束" />)}
        </Form.Item>

        <Form.Item
          label="组别"
          style={{ width: '100%' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
        {getFieldDecorator('suiteType')(<InputNumber min={1} max={3} defaultValue={1} placeholder="1:成年组 2:青少年组 3:老年组" />)}

        </Form.Item>
        <ModalButtons
          onCancel={this.props.onClose}
          onOk={this.handleSubmit}
          loading={this.props.saving}
        />
      </Form>
    );
  }
}

export default compose<
  {},
  {
    saving: boolean;
    detailData?: EventEditModel;
    onClose: () => void;
    onSubmit: (data: EventEditModel) => void;
  }
>(withState('vehicleList', 'changeVehicleList', []))(Form.create()(UserForm));