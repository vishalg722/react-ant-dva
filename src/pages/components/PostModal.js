import React, { Component, useState } from 'react';
import { Row, Col, Form, Input, Button, Select, Modal,Alert } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};


function PostModal(props) {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showModelHandler = e => {
        if (e) e.stopPropagation();
        setVisible(true);
    };

    const hideModelHandler = () => {
        setVisible(false);
    };

    const okHandler = () => {
        const { onOk } = props;
        
        // props.form.validateFields((err, values) => {
        //     if (!err) {
        //         onOk(values);
        //         hideModelHandler();
        //     }
        // });
    };



    const onFinish = values => {
        console.log('Received values of form: ', values);
        const keys = Object.keys(props.record);
        if(keys.length > 0) {
            props.onOk(values);
        }
        else {
            props.onOk(values);
            form.resetFields();
        }
        setTimeout(()=> {
            hideModelHandler();
            props.dispatch({
                type: 'posts/hideMessage'
              });
        },3000)
        
    };

    const handleChange = value => {
        console.log(`selected ${value}`);
    }
    
    return (
        <>
        
        <span onClick={showModelHandler}>{props.children}</span>
        <Modal
            title= { props.modalTitle}
            visible={visible}
            onOk={okHandler}
            onCancel={hideModelHandler}
            
        >
        { props.error && <Alert type="error" message={props.error} banner />
        }
        { props.successMsg && <Alert type="success" message={props.successMsg} banner />
        }
            <Row>
                <Col span={16} push={4}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        initialValues={props.record}
                    >
                        
                        <Form.Item
                            name="title"
                            label="Post Title"
                            rules={[{ required: true, message: 'Please input your post title!' }]}
                        >
                            <Input style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="body"
                            label="Post Body"
                            rules={[{ required: true, message: 'Please input your post body!' }]}
                        >
                            <TextArea style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="Select"
                            name="userId"
                            rules={[{ required: true, message: 'Province is required' }]}
                        >
                            <Select placeholder="Select UserId" onChange={handleChange}>
                                <Option value="1">UesrID 1</Option>
                                <Option value="2">UesrID 2</Option>
                                <Option value="3">UesrID 3</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>

                </Col>


            </Row>
        </Modal>
        </>
    )

}

function mapStateToProps(state) {
    const { list, total, page,error,successMsg } = state.posts;
    return {
      loading: state.loading.models.posts,
      list,
      error,
      successMsg
    };
  }
  
  export default connect(mapStateToProps)(PostModal);
