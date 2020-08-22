import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, InputNumber, message } from 'antd';
import ImageUpLoad from '../components/ImageUpload'
import { IMovie } from '../services/CommonTypes';
import { Store } from 'antd/lib/form/interface';
interface IProps {
  onSubmit: (movie: IMovie) => void
  initValue?: IMovie
}

class MovieForm extends Component<IProps> {

  handleFinish = (result: Store) => {
    this.props.onSubmit(result as IMovie);
  }
  handleFail = (errorInfo) => {
    if (errorInfo) {
      message.error("添加失败", .5);
    }
  }
  getInitValue() {
    console.log("调用")
    if (this.props.initValue) {
      console.log(this.props.initValue)
      return {
        initialValue: this.props.initValue.name
      }
    } else {
      return { initialValue: "空" }
    }
  }
  render() {
    return (
      <Form
        style={{ width: 400 }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        onFinishFailed={this.handleFail}
        onFinish={this.handleFinish}
      >
        {/* name属性 将value设置为onChange的回调属性值 */}
        <Form.Item
          label="电影名称"
          name="name"
          rules={[{ required: true, message: '请填写电影名称' }]}
          initialValue={this.props.initValue?.name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="封面图"
          name="poster"
          valuePropName="curImgUrl"
          initialValue={this.props.initValue?.poster}
        >
          <ImageUpLoad />
        </Form.Item>
        <Form.Item
          label="类型"
          name="types"
          rules={[{ required: true, message: "请选择电影类型" }]}
          initialValue={this.props.initValue?.types}
        >
          <Checkbox.Group options={[
            { label: "喜剧", value: "喜剧" },
            { label: "惊悚", value: "惊悚" },
            { label: "悬疑", value: "悬疑" },
            { label: "灾难", value: "灾难" },
            { label: "动作", value: "动作" },
            { label: "爱情", value: "爱情" }
          ]}
          />
        </Form.Item>
        <Form.Item
          label="地区"
          name="areas"
          rules={[{ required: true, message: "请选择电影上映地区" }]}
          initialValue={this.props.initValue?.areas}
        >
          <Checkbox.Group options={[
            { label: "美国", value: "美国" },
            { label: "中国台湾", value: "中国台湾" },
            { label: "日本", value: "日本" },
            { label: "中国大陆", value: "中国大陆" },
          ]} />
        </Form.Item>

        <Form.Item
          label={"时长"}
          name="timeLong"
          rules={[{ required: true, message: "请选择电影时长" }]}
          initialValue={this.props.initValue?.timeLong}
        >
          <InputNumber
            min={40} step={5} />
        </Form.Item>
        <Form.Item
          label={"描述"}
          name={"description"}
          initialValue={this.props.initValue?.description}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 19, offset: 5 }}
        >
          <Button type={"primary"} htmlType={"submit"}>提交</Button>
        </Form.Item>
      </Form >
    )
  }
}
export default MovieForm
